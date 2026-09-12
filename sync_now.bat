@echo off
REM Double-click THIS when you want to run the sync and WATCH it.
REM It runs auto_sync.bat and then keeps the window open so you can read what synced.
REM (The scheduled task still runs auto_sync.bat on its own, silently, in the background.)
REM
REM 2026-09-11: this wrapper now CHECKS the result instead of assuming it.
REM   It previously discarded auto_sync.bat's exit code entirely, so a halted sync
REM   still exited 0 and printed nothing alarming.
REM   What that cost: on 2026-09-11 a commit succeeded, git gc then stalled on folders
REM   OneDrive was holding open, the push never ran, and the window scrolled past with
REM   the new filename shown as "uploaded". The assets were NOT on GitHub and it looked
REM   exactly like a clean run.
REM   Note also: "git push returned 0" is NOT evidence. Push returns 0 when it pushes
REM   nothing. The only proof is that the remote ref matches local afterwards.

cd /d "%~dp0"

call "%~dp0auto_sync.bat"
set "SYNC_RC=%errorlevel%"

echo.
echo ============================================================
echo   VERIFYING THE PUSH ACTUALLY LANDED
echo ============================================================

git fetch origin main --quiet 2>nul
for /f %%c in ('git rev-list --count origin/main..HEAD 2^>nul') do set "UNPUSHED=%%c"

if not defined UNPUSHED (
    echo   [WARN] Could not count unpushed commits, so this run is UNVERIFIED.
    echo          Treat it as NOT pushed until proven otherwise.
    set "SYNC_RC=1"
    goto :verdict
)

if "%UNPUSHED%"=="0" (
    echo   OK - local and origin/main agree. Nothing is waiting to go out.
) else (
    echo   *** NOT PUSHED: %UNPUSHED% commit^(s^) are still local only. ***
    echo.
    git log origin/main..HEAD --oneline
    echo.
    echo   Your work is COMMITTED and SAFE. It simply has not reached GitHub,
    echo   so any raw.githubusercontent URL for these files will still 404.
    echo   Run this again. If it fails twice, send the messages above.
    set "SYNC_RC=1"
)

:verdict
echo.
if not "%SYNC_RC%"=="0" (
    echo ============================================================
    echo   SYNC FAILED, exit code %SYNC_RC%.
    echo   Do NOT assume the assets are live.
    echo ============================================================
    echo %date% %time% - FAILED rc=%SYNC_RC%, unpushed=%UNPUSHED% >> sync_log.txt
) else (
    echo === Sync verified: committed AND pushed. ===
    echo %date% %time% - verified, 0 unpushed >> sync_log.txt
)

echo.
pause
exit /b %SYNC_RC%
