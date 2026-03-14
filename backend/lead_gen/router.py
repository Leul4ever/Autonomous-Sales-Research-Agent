from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .agent import LeadResearchAgent
from database import get_db
from models import Lead
router = APIRouter(prefix="/api/lead-gen", tags=["Lead Generation"])
agent = LeadResearchAgent()

class LeadGenRequest(BaseModel):
    company_name: str
    target_role: str

@router.post("/")
async def run_lead_gen(request: LeadGenRequest, db: Session = Depends(get_db)):
    try:
        result = await agent.research_company(request.company_name, request.target_role)
        
        # Save to database
        db_lead = Lead(
            company_name=result.get("company", request.company_name),
            target_role=request.target_role,
            domain=result.get("domain", ""),
            context_summary=result.get("context_summary", ""),
            found_emails=result.get("found_emails", []),
            email_draft=result.get("email_draft", "")
        )
        db.add(db_lead)
        db.commit()
        db.refresh(db_lead)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
