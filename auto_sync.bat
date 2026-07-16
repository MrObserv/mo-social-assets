@echo off
REM MO Social Assets - auto sync to GitHub
REM FIXED 2026-07-11: commit local drops BEFORE pulling, so a dirty tree can never
REM block the rebase again. sync_log.txt is now gitignored so it stops dirtying the tree.
REM 2026-07-13: now prints to screen exactly which files are syncing.

cd /d "C:\Users\alman\OneDrive\Documents\GitHub\mo-social-assets"

REM 0. Self-heal a leftover rebase husk (2026-07-13). We always commit before pulling,
REM so any .git\rebase-merge sitting here is a stale husk that would make pull --rebase
REM refuse and silently halt the sync. Clear it so the sync can never stick on this again.
git rebase --abort 2>nul
if exist ".git\rebase-merge" rmdir /s /q ".git\rebase-merge"
if exist ".git\rebase-apply" rmdir /s /q ".git\rebase-apply"
REM Clear a stale index.lock too (runs sequentially, so any lock here is a leftover).
if exist ".git\index.lock" del /f /q ".git\index.lock"

echo ============================================================
echo   MO Social Assets - sync  %date% %time%
echo ============================================================
echo.

REM 1. Stage everything dropped in the folder and show what it is.
git add -A
git diff --cached --quiet
if %errorlevel%==0 (
    echo No new local files to upload.
) else (
    echo Uploading these files ^(A=added  M=changed  D=deleted^):
    echo ------------------------------------------------------------
    git diff --cached --name-status
    echo ------------------------------------------------------------
    git commit -m "Auto sync %date% %time%" --quiet
)
echo.

REM 2. Bring in any remote changes on a clean tree.
echo Checking GitHub for remote changes...
git pull --rebase --autostash
if %errorlevel% neq 0 goto :halted
echo.

REM 3. Publish.
echo Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 goto :halted
echo.
echo === Sync complete. ===
echo %date% %time% - synced >> sync_log.txt
exit /b 0

:halted
echo.
echo === SYNC HALTED: rebase/conflict. Run fix_repo_once.bat, or send me the messages above. ===
echo %date% %time% - HALTED: rebase/conflict, run fix_repo_once.bat >> sync_log.txt
exit /b 1
