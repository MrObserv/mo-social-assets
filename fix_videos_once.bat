@echo off
REM ONE-TIME FIX (2026-07-14): the repo got clogged with source VIDEO files that
REM GitHub refuses (it rejects anything over 100MB - you have 597MB and 415MB files),
REM so every push jammed. This removes the videos from git (they STAY on your disk in
REM their folders), collapses the 6 stuck commits into one clean image-only commit,
REM and pushes. Double-click it once. GitHub Desktop must be CLOSED.

cd /d "C:\Users\alman\OneDrive\Documents\GitHub\mo-social-assets"

echo [1/6] Clearing any stale lock / stuck rebase...
if exist ".git\index.lock" del /f /q ".git\index.lock"
git rebase --abort 2>nul
if exist ".git\rebase-merge" rmdir /s /q ".git\rebase-merge"

echo [2/6] Telling git to ignore source video/audio for good...
findstr /c:"*.mp4" .gitignore >nul 2>&1
if errorlevel 1 (
  echo.>> .gitignore
  echo # Source footage and audio - keep on disk, never push. 2026-07-14>> .gitignore
  echo *.mp4>> .gitignore
  echo *.mov>> .gitignore
  echo *.avi>> .gitignore
  echo *.mkv>> .gitignore
  echo *.wav>> .gitignore
  echo *.aif>> .gitignore
  echo *.aiff>> .gitignore
)

echo [3/6] Rewinding the 6 stuck commits (keeps ALL your files on disk)...
git reset --soft origin/main

echo [4/6] Untracking the videos/audio (they STAY on disk, just leave git)...
git rm --cached -r --ignore-unmatch "*.mp4" "*.mov" "*.avi" "*.mkv" "*.wav" "*.aif" "*.aiff" >nul 2>&1

echo [5/6] Committing one clean, image-only snapshot...
git add -A
git commit -m "Clean repo: web images only, stop tracking source video/audio (2026-07-14)" --quiet

echo [6/6] Pushing to GitHub...
git push origin main
if errorlevel 1 goto :problem

echo.
echo === DONE. Pushed clean. Your videos are still in their folders - they just no ===
echo === longer go to GitHub. From now on only images get pushed, so it stays fast. ===
pause
exit /b 0

:problem
echo.
echo === Push still failed. Copy everything above and send it to me. ===
pause
exit /b 1
