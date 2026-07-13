@echo off
REM MO Social Assets - auto sync to GitHub
REM FIXED 2026-07-11: commit local drops BEFORE pulling, so a dirty tree can never
REM block the rebase again. sync_log.txt is now gitignored so it stops dirtying the tree.

cd /d "C:\Users\alman\OneDrive\Documents\GitHub\mo-social-assets"

REM 0. Self-heal a leftover rebase husk (2026-07-13). We always commit before pulling,
REM so any .git\rebase-merge sitting here is a stale husk that would make pull --rebase
REM refuse and silently halt the sync. Clear it so the sync can never stick on this again.
git rebase --abort 2>nul
if exist ".git\rebase-merge" rmdir /s /q ".git\rebase-merge"
if exist ".git\rebase-apply" rmdir /s /q ".git\rebase-apply"
REM Clear a stale index.lock too (runs sequentially, so any lock here is a leftover).
if exist ".git\index.lock" del /f /q ".git\index.lock"

REM 1. Stage everything dropped in the folder and commit it (only if there is something new).
git add -A
git diff --cached --quiet
if %errorlevel% neq 0 git commit -m "Auto sync %date% %time%" --quiet

REM 2. Bring in remote changes on a clean tree. --autostash is a safety net for any stray edit.
git pull --rebase --autostash --quiet
if %errorlevel% neq 0 goto :halted

REM 3. Publish.
git push origin main --quiet
echo %date% %time% - synced >> sync_log.txt
exit /b 0

:halted
echo %date% %time% - HALTED: rebase/conflict, run fix_repo_once.bat >> sync_log.txt
exit /b 1
