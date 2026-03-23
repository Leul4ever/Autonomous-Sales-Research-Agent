import os
print(f"!!! CRITICAL DEBUG: main.py starting from {__file__}")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from lead_gen.router import router as lead_gen_router
from voice_bot.router import router as voice_bot_router
from content_engine.router import router as content_engine_router
from settings_router import router as settings_router
from database import engine, Base
import models

# Create all database tables (does nothing if they already exist)
try:
    print(f"!!! DB INIT: Connecting to database...")
    Base.metadata.create_all(bind=engine)
    print("!!! DB INIT: Success!")
except Exception as e:
    print(f"!!! DB INIT ERROR: Could not initialize database: {e}")
    # In production, we might want to continue and let routes handle the error
    # or fail early if the DB is strictly required. 
    # For now, we log it and continue so the app can at least serve the health check.

app = FastAPI(title="AI GTM Engine Backend")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production: specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lead_gen_router)
app.include_router(voice_bot_router)
app.include_router(content_engine_router)
app.include_router(settings_router)

@app.get("/api/health")
async def health():
    return {"status": "healthy", "service": "AI GTM Backend"}

@app.get("/")
async def root():
    return {"status": "online", "engine": "AI GTM Backend"}
