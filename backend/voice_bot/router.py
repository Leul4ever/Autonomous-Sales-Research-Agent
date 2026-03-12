import os
import requests
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from .assistant_config import RILEY_ASSISTANT_CONFIG

router = APIRouter(prefix="/api/voice", tags=["Voice Bot"])

VAPI_URL = "https://api.vapi.ai"

class CallRequest(BaseModel):
    phone_number: str

@router.post("/call")
async def trigger_call(request: CallRequest):
    """Triggers an outbound call via Vapi"""
    
    # Load dynamically to pick up any .env changes without requiring a full server restart
    from dotenv import load_dotenv
    import os
    load_dotenv(override=True)
    
    vapi_api_key = os.getenv("VAPI_PRIVATE_KEY")
    vapi_phone_id = os.getenv("VAPI_PHONE_NUMBER_ID")

    if not vapi_api_key:
        raise HTTPException(status_code=500, detail="VAPI_PRIVATE_KEY not configured in .env")

    if not vapi_phone_id or vapi_phone_id == "your_phone_number_id_here":
        raise HTTPException(status_code=500, detail="VAPI_PHONE_NUMBER_ID not configured in .env")

    headers = {
        "Authorization": f"Bearer {vapi_api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "phoneNumberId": vapi_phone_id,
        "assistant": RILEY_ASSISTANT_CONFIG,
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
