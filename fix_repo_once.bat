@echo off
REM ONE-TIME recovery for mo-social-assets (2026-07-11).
REM Unsticks the paused rebase, stops tracking the log file, and resyncs with GitHub.
REM Double-click it once. When it says Done with no errors, you can delete this file.

cd /d "C:\Users\alman\OneDrive\Documents\GitHub\mo-social-assets"

echo [1/5] Clearing any stuck/aborted rebase...
git rebase --abort 2>nul
REM 2026-07-13: also force-remove an EMPTY leftover rebase husk. git rebase --abort
REM cannot clear it (no state to abort), so pull --rebase kept refusing = stuck sync.
if exist ".git\rebase-merge" rmdir /s /q ".git\rebase-merge"
if exist ".git\rebase-apply" rmdir /s /q ".git\rebase-apply"
REM 2026-07-13: also clear a stale index.lock left by the interrupted git. The script
REM runs git sequentially, so if we are here no git is live = the lock is stale and safe
REM to remove; leaving it made the [3/5] commit fail and the sync only LOOK done.
if exist ".git\index.lock" del /f /q ".git\index.lock"

echo [2/5] Ignoring the log + editor files so they stop dirtying the tree...
> .gitignore echo sync_log.txt
>> .gitignore echo .claude/
git rm --cached sync_log.txt --quiet 2>nul

echo [3/5] Committing everything currently dropped in the folder...
git add -A
git diff --cached --quiet
if %errorlevel% neq 0 git commit -m "Recovery sync %date% %time%" --quiet

echo [4/5] Pulling remote changes (rebase, autostash)...
git pull --rebase --autostash
if %errorlevel% neq 0 goto :problem

echo [5/5] Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 goto :problem

REM 2026-07-13: real check — if anything is still uncommitted (e.g. a commit that failed
REM on a lock), do NOT claim success. findstr returns 0 when the tree is dirty.
git status --porcelain | findstr /r "." >nul
if %errorlevel% equ 0 goto :notdone

echo.
echo === Done. You are synced. You can delete this file. ===
pause
exit /b 0

:notdone
echo.
echo === NOT fully synced: files are still uncommitted (likely a lock). Just run this file again; if it repeats, copy the messages above and send them to me. ===
pause
exit /b 1

:problem
echo.
echo === Something needs a hand. Copy the messages above and send them to me. ===
pause
exit /b 1
