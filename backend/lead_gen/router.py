from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .agent import LeadResearchAgent

router = APIRouter(prefix="/api/lead-gen", tags=["Lead Generation"])
agent = LeadResearchAgent()

class LeadGenRequest(BaseModel):
    company_name: str
    target_role: str

@router.post("/")
async def run_lead_gen(request: LeadGenRequest):
    try:
        result = await agent.research_company(request.company_name, request.target_role)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
