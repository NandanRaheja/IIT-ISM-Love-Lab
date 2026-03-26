from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ==================== MODELS ====================

class AgentRequest(BaseModel):
    niche: str
    platform: str = "YouTube"
    goal: str = "grow"
    content_type: str = "short-form video"

class AgentResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    trends: List[str]
    content_ideas: List[str]
    hooks: List[str]
    script: str
    strategy: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class WaitlistEntry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    content_type: str
    platform: Optional[str] = None
    goal: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class WaitlistCreate(BaseModel):
    name: str
    email: str
    content_type: str
    platform: Optional[str] = None
    goal: str

# ==================== AI AGENT ENDPOINT ====================

@api_router.post("/agents/generate", response_model=AgentResponse)
async def generate_content(request: AgentRequest):
    """
    Single GPT-5.2 API call that simulates a multi-agent workflow.
    Returns trends, ideas, hooks, script, and strategy all at once.
    """
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not api_key:
            raise HTTPException(status_code=500, detail="LLM API key not configured")
        
        # Initialize chat with GPT-5.2
        chat = LlmChat(
            api_key=api_key,
            session_id=f"deployr-agent-{uuid.uuid4()}",
            system_message="""You are DeployrAI, a multi-agent content creation system. 
You simulate 5 specialized agents working together:
1. Trend Scout Agent - finds viral trends
2. Idea Generator Agent - creates content ideas
3. Hook Master Agent - writes attention-grabbing hooks
4. Script Writer Agent - creates full scripts
5. Strategy Agent - builds monetization/growth strategy

Always respond in valid JSON format with these exact keys:
{
  "trends": ["trend1", "trend2", "trend3"],
  "content_ideas": ["idea1", "idea2", "idea3"],
  "hooks": ["hook1", "hook2", "hook3"],
  "script": "full script text here",
  "strategy": "growth and monetization strategy here"
}"""
        ).with_model("openai", "gpt-5.2")
        
        # Create the prompt
        prompt = f"""Generate content for a creator with the following details:
- Niche: {request.niche}
- Platform: {request.platform}
- Goal: {request.goal}
- Content Type: {request.content_type}

Execute all 5 agents and return their outputs in JSON format:
1. Find 3 current viral trends in this niche
2. Generate 3 unique content ideas based on these trends
3. Write 3 attention-grabbing hooks for the best idea
4. Create a complete short-form script (30-60 seconds)
5. Provide a growth and monetization strategy

Return ONLY valid JSON, no markdown."""

        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        # Parse the JSON response
        import json
        try:
            # Clean up response if needed
            response_text = response.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.startswith("```"):
                response_text = response_text[3:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            data = json.loads(response_text.strip())
            
            return AgentResponse(
                trends=data.get("trends", []),
                content_ideas=data.get("content_ideas", []),
                hooks=data.get("hooks", []),
                script=data.get("script", ""),
                strategy=data.get("strategy", "")
            )
        except json.JSONDecodeError:
            # If JSON parsing fails, create structured response from text
            return AgentResponse(
                trends=["Trend analysis in progress"],
                content_ideas=["Content ideation in progress"],
                hooks=["Hook generation in progress"],
                script=response[:500] if response else "Script generation in progress",
                strategy="Strategy formulation in progress"
            )
            
    except ImportError:
        raise HTTPException(status_code=500, detail="LLM integration not installed")
    except Exception as e:
        logging.error(f"Agent generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Agent error: {str(e)}")

# ==================== WAITLIST ENDPOINT ====================

@api_router.post("/waitlist", response_model=WaitlistEntry)
async def join_waitlist(entry: WaitlistCreate):
    """Add a creator to the early access waitlist"""
    waitlist_entry = WaitlistEntry(**entry.model_dump())
    doc = waitlist_entry.model_dump()
    await db.waitlist.insert_one(doc)
    return waitlist_entry

@api_router.get("/waitlist/count")
async def get_waitlist_count():
    """Get current waitlist count for social proof"""
    count = await db.waitlist.count_documents({})
    return {"count": count, "spots_remaining": max(0, 100 - count)}

# ==================== HEALTH CHECK ====================

@api_router.get("/")
async def root():
    return {"message": "DeployrAI API is running", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "DeployrAI"}

# Include the router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
