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
    use_airtop: bool = False  # Flag to use Airtop agents

class AgentResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    trends: List[str]
    content_ideas: List[str]
    hooks: List[str]
    script: str
    strategy: str
    source: str = "openai"  # "airtop" or "openai"
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AirtopAgentRequest(BaseModel):
    """Request model specifically for Airtop agent workflows"""
    niche: str
    platform: str = "YouTube"
    goal: str = "grow"
    content_type: str = "short-form video"
    agent_type: str = "full_pipeline"  # Options: trend_scout, script_writer, strategy, full_pipeline
    target_url: Optional[str] = None  # Optional URL for web research

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

class NewsletterSubscribe(BaseModel):
    email: str
    interest: Optional[str] = None

# ==================== AIRTOP AGENT SERVICE ====================

async def run_airtop_agent(request: AirtopAgentRequest) -> dict:
    """
    Execute Airtop AI agent workflow.
    All API calls are made server-side only.
    API key is loaded from environment variable - NEVER exposed to client.
    """
    airtop_api_key = os.environ.get('AIRTOP_API_KEY')
    
    if not airtop_api_key:
        raise HTTPException(
            status_code=500, 
            detail="Airtop API key not configured. Set AIRTOP_API_KEY in environment."
        )
    
    try:
        from airtop import Airtop
        
        # Initialize Airtop client with API key from environment
        airtop_client = Airtop(api_key=airtop_api_key)
        
        # Create browser session
        session_response = airtop_client.sessions.create()
        session_id = session_response.data.id
        
        try:
            # Define prompts based on agent type
            prompts = {
                "trend_scout": f"""
                    Research current viral trends for {request.niche} content on {request.platform}.
                    Find:
                    - Top 3 trending topics in this niche
                    - Viral content formats working right now
                    - Engagement patterns and best posting times
                    Return as JSON with keys: trends (array), formats (array), insights (string)
                """,
                "script_writer": f"""
                    Create a viral {request.content_type} script for {request.niche} on {request.platform}.
                    Goal: {request.goal}
                    Include:
                    - Attention-grabbing hook (first 3 seconds)
                    - Main content body with retention techniques
                    - Strong call-to-action
                    Return as JSON with keys: hook (string), body (string), cta (string), full_script (string)
                """,
                "strategy": f"""
                    Create a content strategy for {request.niche} creator on {request.platform}.
                    Goal: {request.goal}
                    Include:
                    - Content pillars (3-5 topics)
                    - Posting schedule recommendation
                    - Monetization opportunities
                    - Growth tactics
                    Return as JSON with keys: pillars (array), schedule (string), monetization (array), tactics (array)
                """,
                "full_pipeline": f"""
                    Execute full content creation pipeline for {request.niche} on {request.platform}.
                    Goal: {request.goal}
                    Content type: {request.content_type}
                    
                    Provide:
                    1. trends: Array of 3 current viral trends in this niche
                    2. content_ideas: Array of 3 content ideas based on trends
                    3. hooks: Array of 3 attention-grabbing hooks
                    4. script: Complete script for the best idea (hook + body + CTA)
                    5. strategy: Growth and monetization strategy summary
                    
                    Return as JSON with these exact keys.
                """
            }
            
            prompt = prompts.get(request.agent_type, prompts["full_pipeline"])
            
            # Research URLs - use Google search for better results
            search_query = f"{request.niche} {request.platform} viral trends 2026"
            target_url = request.target_url or f"https://www.google.com/search?q={search_query.replace(' ', '+')}"
            
            # Create window and navigate
            window_response = airtop_client.windows.create(
                session_id=session_id,
                url=target_url
            )
            window_id = window_response.data.window_id
            
            # Execute AI agent with prompt using prompt_content
            result = airtop_client.windows.prompt_content(
                session_id=session_id,
                window_id=window_id,
                prompt=prompt
            )
            
            # Parse and return results
            import json
            try:
                # Try to parse as JSON
                content = result.data.model_response if hasattr(result.data, 'model_response') else str(result.data)
                if isinstance(content, str):
                    # Clean up potential JSON in string
                    content = content.strip()
                    if content.startswith("```json"):
                        content = content[7:]
                    if content.startswith("```"):
                        content = content[3:]
                    if content.endswith("```"):
                        content = content[:-3]
                    parsed_data = json.loads(content.strip())
                else:
                    parsed_data = content
                    
                return {
                    "success": True,
                    "data": parsed_data,
                    "session_id": session_id,
                    "source": "airtop"
                }
            except json.JSONDecodeError:
                return {
                    "success": True,
                    "data": {"raw_response": str(result.data)},
                    "session_id": session_id,
                    "source": "airtop"
                }
            
        finally:
            # Always cleanup session
            try:
                airtop_client.sessions.terminate(session_id)
            except Exception as cleanup_error:
                logging.warning(f"Session cleanup error: {cleanup_error}")
                
    except ImportError:
        raise HTTPException(
            status_code=500,
            detail="Airtop SDK not installed. Run: pip install airtop"
        )
    except Exception as e:
        logging.error(f"Airtop agent error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Airtop agent error: {str(e)}")

# ==================== OPENAI FALLBACK SERVICE ====================

async def run_openai_agent(request: AgentRequest) -> AgentResponse:
    """
    Fallback to OpenAI/Emergent LLM when Airtop is not available.
    API key loaded from environment - NEVER exposed to client.
    """
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        # Try Emergent LLM key first, then OpenAI key
        api_key = os.environ.get('EMERGENT_LLM_KEY') or os.environ.get('OPENAI_API_KEY')
        
        if not api_key:
            raise HTTPException(
                status_code=500, 
                detail="No LLM API key configured. Set EMERGENT_LLM_KEY or OPENAI_API_KEY."
            )
        
        chat = LlmChat(
            api_key=api_key,
            session_id=f"deployr-agent-{uuid.uuid4()}",
            system_message="""You are DeployrAI, a multi-agent content creation system. 
Always respond in valid JSON format with these exact keys:
{
  "trends": ["trend1", "trend2", "trend3"],
  "content_ideas": ["idea1", "idea2", "idea3"],
  "hooks": ["hook1", "hook2", "hook3"],
  "script": "full script text here",
  "strategy": "growth and monetization strategy here"
}"""
        ).with_model("openai", "gpt-5.2")
        
        prompt = f"""Generate content for a creator:
- Niche: {request.niche}
- Platform: {request.platform}
- Goal: {request.goal}
- Content Type: {request.content_type}

Return ONLY valid JSON with: trends, content_ideas, hooks, script, strategy."""

        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        import json
        response_text = response.strip()
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
        
        data = json.loads(response_text.strip())
        
        return AgentResponse(
            trends=data.get("trends", []),
            content_ideas=data.get("content_ideas", []),
            hooks=data.get("hooks", []),
            script=data.get("script", ""),
            strategy=data.get("strategy", ""),
            source="openai"
        )
        
    except Exception as e:
        logging.warning(f"OpenAI fallback error: {str(e)}")
        # Return mock data as last resort
        return AgentResponse(
            trends=[
                f"AI-generated {request.niche} content is trending",
                f"Behind-the-scenes {request.niche} content performs well",
                f"Short tutorials in {request.niche} getting high engagement"
            ],
            content_ideas=[
                f"Day in the life of a {request.niche} creator",
                f"Tutorial: How I use AI for {request.niche}",
                f"AI vs Human {request.niche} content challenge"
            ],
            hooks=[
                f"What if AI could create your entire {request.niche} video?",
                f"I let AI run my {request.niche} content for a week...",
                f"The secret tool top {request.niche} creators are using"
            ],
            script=f"""Hook: "What if I told you AI could 10x your {request.niche} content output?"

Body: Today I'm showing you how I use AI agents to create, plan, and monetize my {request.niche} content on {request.platform}.

CTA: Follow for more AI {request.niche} tips!""",
            strategy=f"Post 5x per week on {request.platform}, focus on {request.content_type}. Monetize through brand deals and digital products.",
            source="fallback"
        )

# ==================== API ENDPOINTS ====================

@api_router.post("/agents/generate", response_model=AgentResponse)
async def generate_content(request: AgentRequest):
    """
    Generate content using AI agents.
    Uses Airtop if use_airtop=True and API key is configured.
    Falls back to OpenAI/Emergent LLM otherwise.
    
    All API calls are made server-side. No keys exposed to client.
    """
    if request.use_airtop and os.environ.get('AIRTOP_API_KEY'):
        try:
            airtop_request = AirtopAgentRequest(
                niche=request.niche,
                platform=request.platform,
                goal=request.goal,
                content_type=request.content_type,
                agent_type="full_pipeline"
            )
            result = await run_airtop_agent(airtop_request)
            
            if result.get("success") and result.get("data"):
                data = result["data"]
                return AgentResponse(
                    trends=data.get("trends", []),
                    content_ideas=data.get("content_ideas", []),
                    hooks=data.get("hooks", []),
                    script=data.get("script", ""),
                    strategy=data.get("strategy", ""),
                    source="airtop"
                )
        except Exception as e:
            logging.warning(f"Airtop failed, falling back to OpenAI: {str(e)}")
    
    # Fallback to OpenAI
    return await run_openai_agent(request)

@api_router.post("/agents/airtop", response_model=dict)
async def run_airtop_workflow(request: AirtopAgentRequest):
    """
    Dedicated Airtop agent endpoint for advanced workflows.
    Requires AIRTOP_API_KEY environment variable.
    
    Agent types:
    - trend_scout: Research viral trends
    - script_writer: Generate scripts
    - strategy: Create content strategy
    - full_pipeline: Complete workflow
    """
    return await run_airtop_agent(request)

@api_router.get("/agents/status")
async def get_agent_status():
    """
    Check which AI services are configured and available.
    Does NOT expose actual API keys.
    """
    return {
        "airtop_configured": bool(os.environ.get('AIRTOP_API_KEY')),
        "openai_configured": bool(os.environ.get('OPENAI_API_KEY')),
        "emergent_configured": bool(os.environ.get('EMERGENT_LLM_KEY')),
        "recommended": "airtop" if os.environ.get('AIRTOP_API_KEY') else "openai"
    }

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

# ==================== NEWSLETTER ENDPOINT ====================

@api_router.post("/newsletter")
async def subscribe_newsletter(data: NewsletterSubscribe):
    """Subscribe to newsletter"""
    doc = {
        "id": str(uuid.uuid4()),
        "email": data.email,
        "interest": data.interest,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    await db.newsletter.insert_one(doc)
    return {"success": True, "message": "Subscribed successfully"}

# ==================== HEALTH CHECK ====================

@api_router.get("/")
async def root():
    return {"message": "DeployrAI API is running", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "service": "DeployrAI",
        "agents": {
            "airtop": "configured" if os.environ.get('AIRTOP_API_KEY') else "not configured",
            "openai": "configured" if os.environ.get('EMERGENT_LLM_KEY') or os.environ.get('OPENAI_API_KEY') else "not configured"
        }
    }

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
