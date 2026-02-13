from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Profanity filter
BAD_WORDS = ['fuck', 'shit', 'bitch', 'asshole', 'bastard', 'damn', 'hell', 'crap']

def filter_profanity(text: str) -> bool:
    """Returns True if text contains profanity"""
    text_lower = text.lower()
    return any(word in text_lower for word in BAD_WORDS)

# Models
class CampusIdentity(BaseModel):
    year: str
    hostel: str
    department: str

class CoupleResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    session_id: str
    campus_identity: CampusIdentity
    mode: Literal['couple'] = 'couple'
    
    # Phase 1 - Nostalgia
    survived: List[str]
    story_began: str
    texts_first: str
    real_memory: str
    
    # Phase 2 - Perception (answered separately)
    partner_stress: str
    partner_appreciated: str
    partner_needs: str
    take_for_granted: str
    hidden_admiration: str
    
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SingleResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    session_id: str
    campus_identity: CampusIdentity
    mode: Literal['single'] = 'single'
    
    # Self-awareness questions
    stress_most: str
    feel_appreciated: str
    need_more: str
    relationship_goal: str
    ideal_partner_trait: str
    
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GenerateInsightsRequest(BaseModel):
    session_id: str
    mode: Literal['couple', 'single']

class CoupleInsight(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    session_id: str
    perception_score: int
    relationship_type: str
    got_right: List[str]
    misread: List[str]
    insights: List[str]
    semester_needs: str
    hidden_admiration_reveal: str
    alumni_letter_2035: str
    sentence_to_say: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SingleInsight(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    session_id: str
    self_awareness_score: int
    relationship_readiness: str
    emotional_pattern: str
    ideal_partner_traits: List[str]
    meet_cute_story: str
    future_message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Confession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    text: str
    campus_identity: CampusIdentity
    approved: bool = False
    flagged: bool = False
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ConfessionCreate(BaseModel):
    text: str
    campus_identity: CampusIdentity

class ConfessionModerate(BaseModel):
    approved: bool

class LeaderboardStats(BaseModel):
    batch_stats: List[dict]
    hostel_stats: List[dict]
    department_stats: List[dict]
    total_participants: int

# API Routes
@api_router.get("/")
async def root():
    return {"message": "IIT(ISM) Love Lab API"}

@api_router.post("/responses/couple")
async def submit_couple_response(response: CoupleResponse):
    doc = response.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.responses.insert_one(doc)
    return {"success": True, "session_id": response.session_id}

@api_router.post("/responses/single")
async def submit_single_response(response: SingleResponse):
    doc = response.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.responses.insert_one(doc)
    return {"success": True, "session_id": response.session_id}

@api_router.post("/generate-insights")
async def generate_insights(request: GenerateInsightsRequest):
    # Get response from DB
    response_doc = await db.responses.find_one(
        {"session_id": request.session_id, "mode": request.mode},
        {"_id": 0}
    )
    
    if not response_doc:
        raise HTTPException(status_code=404, detail="Response not found")
    
    # Initialize Claude
    api_key = os.environ['EMERGENT_LLM_KEY']
    chat = LlmChat(
        api_key=api_key,
        session_id=request.session_id,
        system_message="You are an emotionally intelligent relationship analyst for IIT(ISM) students. Be warm, witty, campus-aware, and insightful without being cheesy."
    ).with_model("anthropic", "claude-sonnet-4-5-20250929")
    
    if request.mode == 'couple':
        prompt = f"""
Analyze this IIT(ISM) couple's responses and generate emotional insights:

Campus Identity: {response_doc['campus_identity']['batch']}, {response_doc['campus_identity']['hostel']}, {response_doc['campus_identity']['department']}

Survived: {response_doc['survived']}
Story Began: {response_doc['story_began']}
Texts First: {response_doc['texts_first']}
Memory: {response_doc['real_memory']}

Perception Check:
- Partner Stress: {response_doc['partner_stress']}
- Appreciated When: {response_doc['partner_appreciated']}
- Partner Needs: {response_doc['partner_needs']}
- Take For Granted: {response_doc['take_for_granted']}
- Hidden Admiration: {response_doc['hidden_admiration']}

Generate a JSON response with:
1. perception_score (0-100): How well they understand each other
2. relationship_type: Creative campus-coded type (e.g., "Library Loyalists", "Mess Survivors")
3. got_right: Array of 2 things they understood correctly
4. misread: Array of 2 things they misunderstood
5. insights: Array of 3 actionable relationship insights
6. semester_needs: One sentence on what their relationship needs this semester
7. hidden_admiration_reveal: Reveal their admiration in 2nd person
8. alumni_letter_2035: Short cinematic message from future (3-4 sentences)
9. sentence_to_say: One sentence they should say to each other today

Be intelligent, warm, slightly witty, and campus-aware. Keep it authentic, not cheesy.
"""
        
        message = UserMessage(text=prompt)
        ai_response = await chat.send_message(message)
        
        # Parse AI response (simplified - in production use structured output)
        import json
        try:
            # Try to extract JSON from response
            json_match = re.search(r'\{[\s\S]*\}', ai_response)
            if json_match:
                parsed = json.loads(json_match.group())
            else:
                # Fallback structure
                parsed = {
                    "perception_score": 75,
                    "relationship_type": "Campus Survivors",
                    "got_right": ["Understanding pressure", "Supporting growth"],
                    "misread": ["Need for space", "Stress signals"],
                    "insights": ["Communication during tough times", "Quality over quantity", "Celebrating small wins"],
                    "semester_needs": "More intentional quality time between assignments.",
                    "hidden_admiration_reveal": response_doc['hidden_admiration'],
                    "alumni_letter_2035": "You made it through. The late nights, the pressure, the uncertainty - you chose each other every time. That choice made all the difference.",
                    "sentence_to_say": "I see everything you're doing, and I'm grateful."
                }
            
            insight = CoupleInsight(
                session_id=request.session_id,
                perception_score=parsed['perception_score'],
                relationship_type=parsed['relationship_type'],
                got_right=parsed['got_right'],
                misread=parsed['misread'],
                insights=parsed['insights'],
                semester_needs=parsed['semester_needs'],
                hidden_admiration_reveal=parsed['hidden_admiration_reveal'],
                alumni_letter_2035=parsed['alumni_letter_2035'],
                sentence_to_say=parsed['sentence_to_say']
            )
            
            # Save to DB
            doc = insight.model_dump()
            doc['timestamp'] = doc['timestamp'].isoformat()
            await db.insights.insert_one(doc)
            
            return insight.model_dump(exclude={'timestamp'})
            
        except Exception as e:
            logging.error(f"AI parsing error: {e}")
            raise HTTPException(status_code=500, detail="Failed to generate insights")
    
    else:  # single mode
        prompt = f"""
Analyze this IIT(ISM) student's self-awareness responses:

Campus Identity: {response_doc['campus_identity']['batch']}, {response_doc['campus_identity']['hostel']}, {response_doc['campus_identity']['department']}

Stress Most: {response_doc['stress_most']}
Feel Appreciated: {response_doc['feel_appreciated']}
Need More: {response_doc['need_more']}
Relationship Goal: {response_doc['relationship_goal']}
Ideal Partner Trait: {response_doc['ideal_partner_trait']}

Generate a JSON response with:
1. self_awareness_score (0-100)
2. relationship_readiness: One insightful sentence
3. emotional_pattern: Key emotional pattern identified
4. ideal_partner_traits: Array of 3 traits that would complement them
5. meet_cute_story: Short 3-sentence fictional meet-cute at IIT(ISM)
6. future_message: Encouraging message from their future IIT partner (2-3 sentences)

Be warm, encouraging, and campus-aware.
"""
        
        message = UserMessage(text=prompt)
        ai_response = await chat.send_message(message)
        
        import json
        try:
            json_match = re.search(r'\{[\s\S]*\}', ai_response)
            if json_match:
                parsed = json.loads(json_match.group())
            else:
                parsed = {
                    "self_awareness_score": 70,
                    "relationship_readiness": "You know what you need - now it's about finding someone who gets it.",
                    "emotional_pattern": "Values depth over surface connection",
                    "ideal_partner_traits": ["Emotionally intelligent", "Ambitious but balanced", "Campus-aware humor"],
                    "meet_cute_story": "You're both waiting for the same book at the library. They crack a joke about the wait time. You laugh. Suddenly, three hours have passed and you're still talking.",
                    "future_message": "I see you now, figuring things out. Thanks for not settling. Thanks for knowing yourself first. It made finding you so much easier."
                }
            
            insight = SingleInsight(
                session_id=request.session_id,
                self_awareness_score=parsed['self_awareness_score'],
                relationship_readiness=parsed['relationship_readiness'],
                emotional_pattern=parsed['emotional_pattern'],
                ideal_partner_traits=parsed['ideal_partner_traits'],
                meet_cute_story=parsed['meet_cute_story'],
                future_message=parsed['future_message']
            )
            
            # Save to DB
            doc = insight.model_dump()
            doc['timestamp'] = doc['timestamp'].isoformat()
            await db.insights.insert_one(doc)
            
            return insight.model_dump(exclude={'timestamp'})
            
        except Exception as e:
            logging.error(f"AI parsing error: {e}")
            raise HTTPException(status_code=500, detail="Failed to generate insights")

@api_router.get("/leaderboards")
async def get_leaderboards():
    # Aggregate stats by batch
    batch_pipeline = [
        {"$group": {
            "_id": "$campus_identity.batch",
            "count": {"$sum": 1},
            "avg_score": {"$avg": "$perception_score"}
        }},
        {"$sort": {"avg_score": -1}}
    ]
    batch_stats = await db.insights.aggregate(batch_pipeline).to_list(None)
    
    # Aggregate by hostel
    hostel_pipeline = [
        {"$group": {
            "_id": "$campus_identity.hostel",
            "count": {"$sum": 1}
        }},
        {"$sort": {"count": -1}}
    ]
    
    # Get hostel participation from responses
    hostel_responses = await db.responses.aggregate([
        {"$group": {
            "_id": "$campus_identity.hostel",
            "count": {"$sum": 1}
        }},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]).to_list(None)
    
    # Aggregate by department
    dept_responses = await db.responses.aggregate([
        {"$group": {
            "_id": "$campus_identity.department",
            "count": {"$sum": 1}
        }},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]).to_list(None)
    
    total = await db.responses.count_documents({})
    
    return {
        "batch_stats": batch_stats,
        "hostel_stats": hostel_responses,
        "department_stats": dept_responses,
        "total_participants": total
    }

@api_router.get("/wordcloud")
async def get_wordcloud():
    # Get all real_memory fields
    memories = await db.responses.find(
        {"real_memory": {"$exists": True}},
        {"real_memory": 1, "_id": 0}
    ).to_list(1000)
    
    # Simple word frequency
    from collections import Counter
    all_words = []
    for mem in memories:
        if 'real_memory' in mem:
            words = mem['real_memory'].lower().split()
            # Filter common words
            filtered = [w for w in words if len(w) > 3 and w not in ['that', 'this', 'with', 'from', 'were', 'have', 'been']]
            all_words.extend(filtered)
    
    word_freq = Counter(all_words).most_common(30)
    return {"words": [{'text': w[0], 'count': w[1]} for w in word_freq]}

@api_router.post("/confessions")
async def submit_confession(confession: ConfessionCreate):
    # Check profanity
    if filter_profanity(confession.text):
        raise HTTPException(status_code=400, detail="Inappropriate content detected")
    
    conf_obj = Confession(
        text=confession.text,
        campus_identity=confession.campus_identity,
        approved=True  # Auto-approve if passes filter
    )
    
    doc = conf_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.confessions.insert_one(doc)
    
    return {"success": True, "id": conf_obj.id}

@api_router.get("/confessions")
async def get_confessions(limit: int = 50):
    confessions = await db.confessions.find(
        {"approved": True},
        {"_id": 0}
    ).sort("timestamp", -1).limit(limit).to_list(limit)
    
    return {"confessions": confessions}

@api_router.patch("/confessions/{confession_id}")
async def moderate_confession(confession_id: str, moderation: ConfessionModerate):
    result = await db.confessions.update_one(
        {"id": confession_id},
        {"$set": {"approved": moderation.approved}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Confession not found")
    
    return {"success": True}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()