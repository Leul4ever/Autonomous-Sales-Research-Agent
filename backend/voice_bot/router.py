import os
import requests
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from .assistant_config import RILEY_ASSISTANT_CONFIG

router = APIRouter(prefix="/api/voice", tags=["Voice Bot"])

VAPI_API_KEY = os.getenv("VAPI_PRIVATE_KEY")
VAPI_URL = "https://api.vapi.ai"

class CallRequest(BaseModel):
    phone_number: str

@router.post("/call")
async def trigger_call(request: CallRequest):
    """Triggers an outbound call via Vapi"""
    if not VAPI_API_KEY:
        raise HTTPException(status_code=500, detail="Vapi Key not configured")

    headers = {
        "Authorization": f"Bearer {VAPI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "assistant": RILEY_ASSISTANT_CONFIG,
        "phoneNumberId": os.getenv("VAPI_PHONE_NUMBER_ID"), # Optional: use Vapi number
        "customer": {
            "number": request.phone_number
        }
    }

    response = requests.post(f"{VAPI_URL}/call/phone", json=payload, headers=headers)
    
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.text)
        
    return response.json()

@router.post("/webhook")
async def vapi_webhook(request: Request):
    """Handles webhooks from Vapi (call status, transcripts, etc.)"""
    data = await request.json()
    # Log the event or update the database with call results
    print(f"Vapi Webhook received: {data.get('type')}")
    return {"status": "success"}
