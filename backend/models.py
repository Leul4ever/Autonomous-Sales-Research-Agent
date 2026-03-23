from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from datetime import datetime
from database import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, index=True)
    target_role = Column(String)
    domain = Column(String)
    context_summary = Column(Text)
    found_emails = Column(JSON) # Store list of strings
    email_draft = Column(Text)
    status = Column(String, default="researched") # researched, sent, etc.
    created_at = Column(DateTime, default=datetime.utcnow)

class Content(Base):
    __tablename__ = "contents"

    id = Column(Integer, primary_key=True, index=True)
    content_type = Column(String) # "social_posts" or "video_script"
    topic = Column(String, index=True)
    target_audience = Column(String, nullable=True) # for social posts
    tone = Column(String, nullable=True) # for video script
    generated_content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class CallLog(Base):
    __tablename__ = "call_logs"

    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, index=True)
    status = Column(String)
    transcript = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
