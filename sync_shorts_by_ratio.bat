@echo off
setlocal enabledelayedexpansion
REM 9:16-ONLY video hosting (2026-07-14). Pushes a video to GitHub ONLY if it is
REM vertical (9:16, height > width) AND under 100MB. Every 16:9 landscape source
REM recording is skipped, no matter its name or size. Re-run any time to sync new
REM shorts. Needs ffmpeg (ffprobe) installed + on PATH. GitHub Desktop CLOSED.

cd /d "C:\Users\alman\OneDrive\Documents\GitHub\mo-social-assets"

where ffprobe >nul 2>&1
if errorlevel 1 (
  echo.
  echo ffprobe was not found. Install ffmpeg once, add it to PATH, then re-run:
  echo   https://www.gyan.dev/ffmpeg/builds/  ^(the "release full" build^)
  echo.
  pause & exit /b 1
)

echo [1/6] Clearing any stale lock / stuck rebase...
if exist ".git\index.lock" del /f /q ".git\index.lock"
if exist ".git\rebase-merge" rmdir /s /q ".git\rebase-merge"

echo [2/6] .gitignore ignores ALL video by default (only 9:16 gets force-added back)...
> .gitignore echo sync_log.txt
>> .gitignore echo .claude/
>> .gitignore echo *.mp4
>> .gitignore echo *.mov
>> .gitignore echo *.mkv
>> .gitignore echo *.avi
>> .gitignore echo *.wav
>> .gitignore echo *.aif
>> .gitignore echo *.aiff

echo [3/6] Untracking every video first, for a clean start...
git rm -r --cached --quiet "*.mp4" "*.mov" "*.mkv" "*.avi" >nul 2>&1

echo [4/6] Force-adding ONLY 9:16 vertical videos under 100MB (by dimensions)...
for /r %%f in (*.mp4 *.mov) do (
  for /f "tokens=1,2 delims=," %%a in ('ffprobe -v error -select_streams v:0 -show_entries stream^=width^,height -of csv^=p^=0 "%%f" 2^>nul') do (
    if %%b GTR %%a if %%~zf LSS 100000000 (
      git add -f "%%f" >nul 2>&1
      echo    + %%~nxf
    )
  )
)

echo [5/6] Adding all non-video assets + committing...
git add -A
git commit -m "Host 9:16 vertical shorts only; 16:9 source excluded by dimensions (2026-07-14)" --quiet

echo [6/6] Pushing to GitHub...
git push origin main
if errorlevel 1 goto :problem

echo.
echo === DONE. Only 9:16 vertical shorts are on GitHub. 16:9 source stays local. ===
echo === Run this file again whenever you add new shorts. ===
pause
exit /b 0

:problem
echo.
echo === Push failed. Copy everything above and send it to me. ===
pause
exit /b 1
