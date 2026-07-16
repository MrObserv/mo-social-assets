@echo off
REM FIX (2026-07-14 pm): the earlier video fix ignored ALL .mp4 files, which wrongly
REM swept out the small Buffer SHORTS too (they are all well under 100MB and DO need
REM to be on GitHub). This narrows the ignore to ONLY the huge raw Riverside footage
REM (riverside_* files), re-tracks the shorts, and pushes them. GitHub Desktop CLOSED.

cd /d "C:\Users\alman\OneDrive\Documents\GitHub\mo-social-assets"

echo [1/5] Clearing any stale lock / stuck rebase...
if exist ".git\index.lock" del /f /q ".git\index.lock"
if exist ".git\rebase-merge" rmdir /s /q ".git\rebase-merge"

echo [2/5] Fixing .gitignore: ignore ONLY the raw Riverside footage, keep the shorts...
> .gitignore echo sync_log.txt
>> .gitignore echo .claude/
>> .gitignore echo.
>> .gitignore echo # Raw source footage only - Riverside exports (some 400-600MB; GitHub rejects over 100MB).
>> .gitignore echo # Everything else, including the final clip shorts Buffer needs, is tracked and pushed.
>> .gitignore echo riverside_*

echo [3/5] Re-adding the shorts (the riverside_* raws stay out)...
git add -A

echo [4/5] Committing...
git commit -m "Re-track Buffer shorts; ignore only raw Riverside footage (2026-07-14)" --quiet

echo [5/5] Pushing to GitHub...
git push origin main
if errorlevel 1 goto :problem

echo.
echo === DONE. The shorts are pushed. Buffer should be able to fetch them now. ===
echo === If a short STILL 404s, it is the SPACE in "Shortform 9-16 viid" - tell me. ===
pause
exit /b 0

:problem
echo.
echo === Push failed. Copy everything above and send it to me. ===
pause
exit /b 1
