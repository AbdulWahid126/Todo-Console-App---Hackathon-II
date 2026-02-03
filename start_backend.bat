@echo off
echo Installing backend dependencies if needed...
cd /d "d:\Q4 Hackathon\Hachathon-2 Full Stake TODO App\backend"
pip install -r requirements.txt

echo.
echo Starting backend server on port 8080...
echo Press Ctrl+C to stop the server
echo.
uvicorn main:app --reload --port 8080