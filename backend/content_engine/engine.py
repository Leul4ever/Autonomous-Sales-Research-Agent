import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

class ContentEngine:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7)

    async def generate_social_posts(self, topic: str, target_audience: str):
        prompt = ChatPromptTemplate.from_template("""
        You are a world-class social media strategist. 
        Topic: {topic}
        Target Audience: {target_audience}

        Generate 3 high-impact social media posts:
        1. LinkedIn (Professional, thought-leadership, includes 3-5 hashtags)
        2. Twitter (Punchy, viral-style, <280 chars)
        3. Instagram (Visual-first, engaging caption, emojis)

        Format the output clearly for each platform.
        """)
        
        response = self.llm.invoke(prompt.format(topic=topic, target_audience=target_audience))
        return response.content

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
        
        response = self.llm.invoke(prompt.format(topic=topic, tone=tone))
        return response.content
