import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

class ContentEngine:
    def __init__(self):
        model_name = os.getenv("GOOGLE_MODEL", "gemini-1.5-flash")
        self.llm = ChatGoogleGenerativeAI(model=model_name, temperature=0.7)

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

    async def generate_social_posts(self, topic: str, target_audience: str):
        prompt = ChatPromptTemplate.from_template("""
        You are a world-class social media strategist. 
        Topic: {topic}
        Target Audience: {target_audience}

        Generate 3 high-impact social media posts:
        1. LinkedIn (Professional, thought-leadership, includes 3-5 hashtags)
        2. Twitter (Punchy, viral-style, <280 chars)
        3. Instagram (Visual-first, engaging caption, emojis)

        Format the output clearly for each platform using this exact style:
        ### 1. LinkedIn: [Title]
        **Focus:** *[Focus Area]*
        **Post Copy:** [The content]
        **Visual Suggestion:** *[Description]*
        
        Repeat for all 3.
        """)
        
        try:
            formatted_prompt = prompt.format(topic=topic, target_audience=target_audience)
            response = await self.llm.ainvoke(formatted_prompt)
            return self._get_text_content(response.content)
        except Exception as e:
            print(f"Error generating social posts: {e}")
            return f"Error: {str(e)}"

    async def generate_video_script(self, topic: str, tone: str = "energetic"):
        prompt = ChatPromptTemplate.from_template("""
        You are a professional scriptwriter for short-form video (TikTok/Reels/Shorts).
        Topic: {topic}
        Tone: {tone}

        Create a structured 60-second video script:
        - [0-5s] Hook: Stop the scroll immediately.
        - [5-20s] Problem: Identify the pain point.
        - [20-50s] Solution/Value: Explain the core topic clearly.
        - [50-60s] CTA: Direct call to action.

        Include visual cues in [brackets].
        """)
        
        try:
            formatted_prompt = prompt.format(topic=topic, tone=tone)
            response = await self.llm.ainvoke(formatted_prompt)
            return self._get_text_content(response.content)
        except Exception as e:
            print(f"Error generating video script: {e}")
            return f"Error: {str(e)}"
