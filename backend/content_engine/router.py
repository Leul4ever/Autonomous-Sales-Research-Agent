from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .engine import ContentEngine
from database import get_db
from models import Content
router = APIRouter(prefix="/api/content", tags=["Content Engine"])
engine = ContentEngine()

class ContentRequest(BaseModel):
    topic: str
    target_audience: str = "Sales and Marketing Professionals"
    tone: str = "professional"

@router.post("/social-posts")
async def generate_posts(request: ContentRequest, db: Session = Depends(get_db)):
    try:
        content = await engine.generate_social_posts(request.topic, request.target_audience)
        
        # Save to database
        db_content = Content(
            content_type="social_posts",
            topic=request.topic,
            target_audience=request.target_audience,
            tone=request.tone,
            generated_content=content
        )
        db.add(db_content)
        db.commit()
        
        return {"content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/video-script")
async def generate_script(request: ContentRequest, db: Session = Depends(get_db)):
    try:
        content = await engine.generate_video_script(request.topic, request.tone)
        
        # Save to database
        db_content = Content(
            content_type="video_script",
            topic=request.topic,
            target_audience=request.target_audience,
            tone=request.tone,
            generated_content=content
        )
        db.add(db_content)
        db.commit()
        
        return {"content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
