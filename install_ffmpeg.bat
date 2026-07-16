@echo off
REM One-click FFmpeg installer for Windows. Installs ffmpeg (which includes ffprobe)
REM and puts it on your PATH, so sync_shorts_by_ratio.bat can find it.
REM Just double-click this. If Windows asks for permission, allow it.

echo =====================================================
echo   Installing FFmpeg (this includes ffprobe)
echo =====================================================
echo.

where ffprobe >nul 2>&1
if %errorlevel%==0 (
  echo FFmpeg is ALREADY installed and on your PATH. Nothing to do.
  where ffprobe
  echo.
  echo You can go straight to running sync_shorts_by_ratio.bat.
  pause
  exit /b 0
)

where winget >nul 2>&1
if %errorlevel%==0 (
  echo Found winget - installing the official FFmpeg package...
  echo.
  winget install --id Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements
  goto :done
)

echo winget not available - downloading FFmpeg directly instead...
echo.
set "DEST=%LOCALAPPDATA%\ffmpeg"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; $u='https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip'; $z=Join-Path $env:TEMP 'ffmpeg.zip'; Write-Host 'Downloading...'; Invoke-WebRequest -Uri $u -OutFile $z; if(Test-Path '%DEST%'){Remove-Item '%DEST%' -Recurse -Force}; Write-Host 'Extracting...'; Expand-Archive -Path $z -DestinationPath '%DEST%' -Force; $bin=(Get-ChildItem -Path '%DEST%' -Recurse -Filter 'ffprobe.exe' | Select-Object -First 1).DirectoryName; $cur=[Environment]::GetEnvironmentVariable('Path','User'); if($cur -notlike ('*'+$bin+'*')){[Environment]::SetEnvironmentVariable('Path', ($cur.TrimEnd(';')+';'+$bin), 'User')}; Write-Host ('FFmpeg installed to: '+$bin)"

:done
echo.
echo =====================================================
echo   Done installing.
echo   IMPORTANT: close this window, open a NEW one, then
echo   run sync_shorts_by_ratio.bat (PATH needs a refresh).
echo =====================================================
echo.
echo Quick check (may say 'not found' until you reopen a window):
where ffprobe 2>nul
pause
