@echo off
setlocal enabledelayedexpansion
REM MO Social Assets - auto sync to GitHub
REM 2026-07-18: routine sync is now DIMENSION-AWARE. Every run it force-adds only NEW
REM   vertical 9:16 clips under 100MB and pushes them; 16:9 source videos stay ignored.
REM   No manual script needed for shorts any more. Only untracked videos are probed, so
REM   this stays fast and never removes/re-adds tracked files (no history churn).
REM   Requires ffprobe (install_ffmpeg.bat) on PATH; if missing, videos are skipped
REM   gracefully and the rest of the sync still runs.
REM 2026-07-11: commit local drops BEFORE pulling, so a dirty tree can never block rebase.
REM 2026-07-13: self-heals a leftover rebase husk / stale index.lock.

cd /d "C:\Users\alman\OneDrive\Documents\GitHub\mo-social-assets"

REM 0. Self-heal a leftover rebase husk + stale index.lock. We always commit before
REM    pulling, so any .git\rebase-merge here is a stale husk that would stall the sync.
git rebase --abort 2>nul
if exist ".git\rebase-merge" rmdir /s /q ".git\rebase-merge"
if exist ".git\rebase-apply" rmdir /s /q ".git\rebase-apply"
if exist ".git\index.lock" del /f /q ".git\index.lock"

echo ============================================================
echo   MO Social Assets - sync  %date% %time%
echo ============================================================
echo.

REM 1. Dimension-aware video handling.
REM    .gitignore blocks all video by default, so 16:9 source files never get pushed.
REM    Here we force-add only NEW vertical (9:16) videos under 100MB. Already-tracked
REM    videos are skipped without probing, so this loop stays cheap every cycle.
where ffprobe >nul 2>&1
if errorlevel 1 (
    echo [WARN] ffprobe not found on PATH - skipping the 9:16 short check.
    echo        Run install_ffmpeg.bat if new shorts are not uploading.
) else (
    echo Scanning for new vertical 9:16 shorts to publish...
    for /r %%f in (*.mp4 *.mov *.m4v) do (
        git ls-files --error-unmatch "%%f" >nul 2>&1
        if errorlevel 1 (
            REM untracked video - classify by dimension
            set "_w="
            set "_h="
            for /f "tokens=1,2 delims=," %%a in ('ffprobe -v error -select_streams v:0 -show_entries stream^=width^,height -of csv^=p^=0 "%%f" 2^>nul') do (
                set "_w=%%a"
                set "_h=%%b"
            )
            if defined _h (
                if !_h! GTR !_w! (
                    if %%~zf LSS 100000000 (
                        echo   + 9:16 short: %%~nxf
                        git add -f "%%f"
                    ) else (
                        echo   - skipped ^(9:16 but over 100MB^): %%~nxf
                    )
                ) else (
                    echo   - skipped ^(16:9 source^): %%~nxf
                )
            )
        )
    )
)
echo.

REM 2. Stage all non-video changes (docs, images, thumbnails, etc.).
git add -A

REM 3. Commit only if something is actually staged.
git diff --cached --quiet
if %errorlevel%==0 (
    echo No new files to upload.
) else (
    echo Uploading these files ^(A=added  M=changed  D=deleted^):
    echo ------------------------------------------------------------
    git diff --cached --name-status
    echo ------------------------------------------------------------
    git commit -m "Auto sync %date% %time%" --quiet
)
echo.

REM 4. Bring in any remote changes on a clean tree.
echo Checking GitHub for remote changes...
git pull --rebase --autostash
if %errorlevel% neq 0 goto :halted
echo.

REM 5. Publish.
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
