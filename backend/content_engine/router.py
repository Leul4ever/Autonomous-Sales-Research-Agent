from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .engine import ContentEngine

router = APIRouter(prefix="/api/content", tags=["Content Engine"])
engine = ContentEngine()

class ContentRequest(BaseModel):
    topic: str
    target_audience: str = "Sales and Marketing Professionals"
    tone: str = "professional"

@router.post("/social-posts")
async def generate_posts(request: ContentRequest):
    try:
        content = await engine.generate_social_posts(request.topic, request.target_audience)
        return {"content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/video-script")
async def generate_script(request: ContentRequest):
    try:
        content = await engine.generate_video_script(request.topic, request.tone)
        return {"content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
