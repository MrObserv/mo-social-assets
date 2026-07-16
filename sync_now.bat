@echo off
REM Double-click THIS when you want to run the sync and WATCH it.
REM It runs auto_sync.bat and then keeps the window open so you can read what synced.
REM (The scheduled task still runs auto_sync.bat on its own, silently, in the background.)

call "%~dp0auto_sync.bat"
echo.
pause
