import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import set_key, load_dotenv

router = APIRouter(prefix="/api/settings", tags=["Settings"])

ENV_FILE_PATH = os.path.join(os.path.dirname(__file__), ".env")

class SettingsUpdateRequest(BaseModel):
    VAPI_PRIVATE_KEY: str | None = None
    VAPI_PHONE_NUMBER_ID: str | None = None
    HUNTER_API_KEY: str | None = None
    GEMINI_API_KEY: str | None = None
    DATABASE_URL: str | None = None

@router.get("/")
async def get_settings():
    """Retrieve non-sensitive parts of settings / check if they exist."""
    load_dotenv(override=True)
    return {
        "vapi_private_key_set": bool(os.getenv("VAPI_PRIVATE_KEY")),
        "vapi_phone_id": os.getenv("VAPI_PHONE_NUMBER_ID", ""),
        "hunter_api_key_set": bool(os.getenv("HUNTER_API_KEY")),
        "gemini_api_key_set": bool(os.getenv("GEMINI_API_KEY")),
        "database_url_set": bool(os.getenv("DATABASE_URL")),
    }

@router.post("/")
async def update_settings(request: SettingsUpdateRequest):
    """Update settings in the local .env file."""
    updates = request.model_dump(exclude_unset=True)
    
    if not os.path.exists(ENV_FILE_PATH):
        open(ENV_FILE_PATH, 'a').close()
        
    for key, value in updates.items():
        if value is not None:
            # Set in .env file for persistence
            set_key(ENV_FILE_PATH, key, value)
            # Update the current process environment variables
            os.environ[key] = value

    return {"status": "success", "message": "Settings updated successfully"}
