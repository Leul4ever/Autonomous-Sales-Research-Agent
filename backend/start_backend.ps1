# Startup script for AI GTM Engine Backend
# This script ensures the backend runs on port 8000 and uses the local venv

Write-Host "Starting AI GTM Engine Backend..." -ForegroundColor Cyan

# Check for venv
if (Test-Path "venv\Scripts\Activate.ps1") {
    Write-Host "Activating virtual environment..." -ForegroundColor Gray
    . venv\Scripts\Activate.ps1
} else {
    Write-Host "Warning: Virtual environment (venv) not found. Attempting to run with system python..." -ForegroundColor Yellow
}

# Run FastAPI with uvicorn
uvicorn main:app --reload --port 8000
