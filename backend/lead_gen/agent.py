import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.prompts import ChatPromptTemplate
import requests

load_dotenv()

class LeadResearchAgent:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0)
        self.search = DuckDuckGoSearchRun()
        self.hunter_api_key = os.getenv("HUNTER_API_KEY")

    def find_emails(self, domain: str):
        """Finds public emails for a domain using Hunter.io"""
        if not self.hunter_api_key:
            return "Hunter API Key not configured."
        
        url = f"https://api.hunter.io/v2/domain-search?domain={domain}&api_key={self.hunter_api_key}"
        try:
            response = requests.get(url)
            data = response.json()
            if "data" in data and "emails" in data["data"]:
                return [e["value"] for e in data["data"]["emails"][:3]]
            return "No emails found."
        except Exception as e:
            return f"Error finding emails: {str(e)}"

    async def research_company(self, company_name: str, target_role: str):
        # 1. Search for company news and context
        search_query = f"recent news and focus of {company_name} for {target_role} outreach"
        try:
            context = self.search.run(search_query)
        except Exception:
            context = "Recent initiatives and general business growth."

        # 2. Get domain
        domain_prompt = f"What is the official website domain of {company_name}? Return only the domain (e.g. apple.com)."
        domain_response = self.llm.invoke(domain_prompt)
        domain = domain_response.content.strip()

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
        
        chain = prompt | self.llm
        email_draft_response = chain.invoke({
            "context": context,
            "company": company_name,
            "role": target_role,
            "emails": emails
        })
        
        email_draft = email_draft_response.content

        return {
            "company": company_name,
            "domain": domain,
            "context_summary": context[:500] + "...",
            "found_emails": emails,
            "email_draft": email_draft
        }
