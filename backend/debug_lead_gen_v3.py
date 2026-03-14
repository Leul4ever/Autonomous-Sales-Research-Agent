import asyncio
import traceback
from lead_gen.agent import LeadResearchAgent

async def test_real_agent():
    print("--- Real Agent Diagnostic Start ---")
    agent = LeadResearchAgent()
    
    try:
        print("Running research_company for 'Tesla'...")
        result = await agent.research_company("Tesla", "Marketing Manager")
        print("\nResearch Success!")
        print(f"Company: {result['company']}")
        print(f"Domain: {result['domain']}")
        print(f"Emails: {result['found_emails']}")
        print(f"Email Draft (first 100 chars): {result['email_draft'][:100]}...")
        
    except Exception as e:
        print("\nResearch FAILED!")
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_real_agent())
