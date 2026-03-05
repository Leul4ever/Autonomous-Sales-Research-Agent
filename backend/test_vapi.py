import os
import requests
from dotenv import load_dotenv
from voice_bot.assistant_config import RILEY_ASSISTANT_CONFIG

load_dotenv()

VAPI_API_KEY = os.getenv("VAPI_PRIVATE_KEY")
VAPI_URL = "https://api.vapi.ai"

headers = {
    "Authorization": f"Bearer {VAPI_API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "assistant": RILEY_ASSISTANT_CONFIG,
    "customer": {
        "number": "+251943366036"
    }
}

response = requests.post(f"{VAPI_URL}/call/phone", json=payload, headers=headers)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
