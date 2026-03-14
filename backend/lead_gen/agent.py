import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.prompts import ChatPromptTemplate
import requests

load_dotenv()

class LeadResearchAgent:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(model="gemini-flash-latest", temperature=0)
        self.search = DuckDuckGoSearchRun()
        self.hunter_api_key = os.getenv("HUNTER_API_KEY")

    def _get_text_content(self, response_content):
        """Helper to extract text from various LLM response formats"""
        if isinstance(response_content, str):
            return response_content.strip()
        if isinstance(response_content, list):
            # Handle list of content blocks
            text_blocks = [
                item.get("text", "") if isinstance(item, dict) else str(item)
                for item in response_content
                if (isinstance(item, dict) and item.get("type") == "text") or not isinstance(item, dict)
            ]
            return " ".join(text_blocks).strip()
        return str(response_content).strip()

    def find_emails(self, domain: str):
        """Finds public emails for a domain using Hunter.io"""
        if not self.hunter_api_key:
            print("Hunter API Key not configured.")
            return []
        
        url = f"https://api.hunter.io/v2/domain-search?domain={domain}&api_key={self.hunter_api_key}"
        try:
            response = requests.get(url)
            data = response.json()
            if "data" in data and "emails" in data["data"]:
                return [e["value"] for e in data["data"]["emails"][:3]]
            return []
        except Exception as e:
            print(f"Error finding emails: {str(e)}")
            return []

    async def research_company(self, company_name: str, target_role: str):
        # 1. Search for company news and context
        search_query = f"recent news and focus of {company_name} for {target_role} outreach"
        try:
            # Run search in a thread to not block the event loop if possible, 
            # though DDGS is usually fast enough for a prototype.
            context = self.search.run(search_query)
        except Exception as e:
            print(f"Search failed: {e}")
            context = f"Leading company in its sector focusing on {target_role} initiatives."

        # 2. Get domain
        domain_prompt = f"What is the official website domain of {company_name}? Return only the domain (e.g. apple.com)."
        try:
            domain_response = await self.llm.ainvoke(domain_prompt)
            domain = self._get_text_content(domain_response.content)
        except Exception as e:
            print(f"Domain retrieval error: {e}")
            domain = f"{company_name.lower().replace(' ', '')}.com"
        
        # 3. Find emails if possible
        emails = self.find_emails(domain)

        # 4. Generate Personalized Cold Email
        prompt = ChatPromptTemplate.from_template("""
        You are a world-class sales strategist.
        Research Context: {context}
        Target Company: {company}
        Target Role: {role}
        Available Emails: {emails}

        Write a highly personalized, professional cold email to a {role} at {company}.
        - Mention a specific recent initiative or news found in the context.
        - Position our 'AI GTM Engine' as a solution for scaling their Sales & Marketing.
        - Keep it under 150 words.
        - Add a strong call to action.
        """)
        
        try:
            chain = prompt | self.llm
            email_draft_response = await chain.ainvoke({
                "context": context,
                "company": company_name,
                "role": target_role,
                "emails": emails
            })
            email_draft = self._get_text_content(email_draft_response.content)
        except Exception as e:
            print(f"Email generation error: {e}")
            email_draft = f"Hi,\n\nI was researching {company_name} and noticed your work as {target_role}. I'd love to discuss how our AI GTM Engine can help you scale."

        return {
            "company": company_name,
            "domain": domain,
            "context_summary": context[:500] if context else "",
            "found_emails": emails,
            "email_draft": email_draft
        }
