from .prompts import RILEY_PROMPT

# Vapi Assistant Configuration Template
RILEY_ASSISTANT_CONFIG = {
    "name": "Riley",
    "model": {
        "provider": "openai",
        "model": "gpt-4",
        "temperature": 0.7,
        "systemPrompt": RILEY_PROMPT
    },
    "voice": {
        "provider": "playht",
        "voiceId": "susan", # High quality female voice
        "speed": 1.0
    },
    "firstMessage": "Thank you for calling Wellness Partners. This is Riley, your scheduling assistant. How may I help you today?",
    "endCallFunctionEnabled": True,
    "transcription": {
        "provider": "deepgram",
        "language": "en-US"
    },
    "fillerWordsEnabled": True,
    "backchannelingEnabled": True
}
