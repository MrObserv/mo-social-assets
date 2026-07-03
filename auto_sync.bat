@echo off
REM MO Social Assets - auto sync to GitHub
REM Pulls any remote changes, then commits + pushes anything new dropped in this folder.
REM Safe to run repeatedly - does nothing if there's nothing to sync.

cd /d "C:\Users\alman\OneDrive\Documents\GitHub\mo-social-assets"

git pull --rebase --quiet

git add -A

git diff --cached --quiet
if %errorlevel%==0 (
    exit /b 0
)

git commit -m "Auto sync %date% %time%" --quiet
git push origin main --quiet

echo %date% %time% - synced >> sync_log.txt
