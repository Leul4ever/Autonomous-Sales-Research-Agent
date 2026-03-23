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

class LeadUpdate(BaseModel):
    email_draft: str | None = None
    status: str | None = None

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

        return {
            **result,
            "id": db_lead.id,
            "status": db_lead.status,
            "email_draft": db_lead.email_draft
        }
    except Exception as e:
        import traceback
        print(f"！！！ ERROR IN LEAD GEN: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{lead_id}")
async def update_lead(lead_id: int, update: LeadUpdate, db: Session = Depends(get_db)):
    db_lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not db_lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    if update.email_draft is not None:
        db_lead.email_draft = update.email_draft
    if update.status is not None:
        db_lead.status = update.status
        
    db.commit()
    db.refresh(db_lead)
    return {"status": "success", "lead_id": db_lead.id, "new_status": db_lead.status}
