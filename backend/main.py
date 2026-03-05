from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from lead_gen.router import router as lead_gen_router
from voice_bot.router import router as voice_bot_router

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

@app.get("/")
async def root():
    return {"status": "online", "engine": "AI GTM Backend"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
