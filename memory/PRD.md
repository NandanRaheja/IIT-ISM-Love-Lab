# IIT(ISM) Love Lab - Product Requirements Document

## Original Problem Statement
Create a hyper-personalized, anonymous, emotionally intelligent Valentine's experience exclusively for IIT(ISM) students, called "IIT(ISM) Love Lab".

## Core Principles
- Anonymous (no login required)
- Mobile-first design
- Smooth animations
- Elegant campus-coded aesthetic

## Game Flow
1. **Mode Selection**: Couple or Single
2. **Campus Identity**: Collect course, year, and hostel through creative, themed selectors
3. **Film Poster Generator**: Dynamic, Bollywood-style poster based on campus identity
4. **Questionnaires**: Separate flows for Singles and Couples with emotionally intelligent questions

## AI Engine (Claude Sonnet 4.5)
- **For Couples**: Generates Perception Alignment Score, relationship insights, cinematic alumni letter
- **For Singles**: Generates self-awareness summary, relationship pattern insights, encouragement

## Viral Mechanics
- Leaderboards (batch, hostel)
- Live word cloud
- Anonymous confession wall
- Countdown timer
- **Partner Link Sharing** (NEW)

## Shareable Content
- Cinematic film poster
- Final elegant result card for social sharing
- Partner compatibility link

---

## Implementation Status

### Completed ✅
- [x] Full-stack setup (React + FastAPI + MongoDB)
- [x] Landing page with mode selection (Single/Couple)
- [x] Campus Identity page with creative selectors
- [x] Dynamic Bollywood-style Film Poster Generator
- [x] Questionnaires for both modes with animations
- [x] Multi-select survival question
- [x] Admin page UI for confession moderation
- [x] Backend endpoints for submissions and confessions
- [x] **Partner Link Feature** - Feb 13, 2026
  - Partner A creates shareable link after questionnaire
  - Partner B joins via link and answers same questions
  - System compares answers and shows compatibility score
  - Shows matches and mismatches in detail

### In Progress / Blocked 🔴
- [ ] **P0**: "Failed to load insights" bug on submission (CRITICAL BLOCKER)
  - AI insight generation failing after questionnaire submission
  - Backend `/api/submissions` endpoint issue

### Upcoming Tasks 🟡
- [ ] **P1**: Leaderboards implementation
- [ ] **P1**: Public Confession Wall page
- [ ] **P1**: Live Word Cloud
- [ ] **P1**: Final shareable Result Card (distinct from poster)

### Backlog / Future 🟢
- [ ] **P2**: Analytics & aggregation backend logic
- [ ] **P3**: Final "Ending Screen" with closing message

---

## Technical Stack
- **Frontend**: React, React Router, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, Pydantic
- **Database**: MongoDB
- **AI**: Claude Sonnet 4.5 (Emergent LLM Key)

## Key Files
- `/app/backend/server.py` - All API logic, Pydantic models, AI prompts, Partner Link endpoints
- `/app/frontend/src/pages/CoupleQuestionnaire.js` - Couple questionnaire flow with partner link creation
- `/app/frontend/src/pages/PartnerLink.js` - Partner link share/join/results page
- `/app/frontend/src/pages/PosterGenerator.js` - Film poster display
- `/app/frontend/src/pages/Results.js` - Results display
- `/app/frontend/src/App.js` - Route definitions

## API Endpoints
- `POST /api/responses/couple` - Submit couple questionnaire
- `POST /api/responses/single` - Submit single questionnaire
- `POST /api/generate-insights` - Generate AI insights (currently failing)
- `POST /api/partner-link/create` - Create shareable partner link
- `GET /api/partner-link/{id}` - Check link status
- `POST /api/partner-link/join` - Partner B submits answers
- `GET /api/partner-link/{id}/results` - Get match results

---

## Changelog
- **Feb 13, 2026**: Implemented Partner Link sharing feature
  - Backend: 4 new endpoints for partner session management
  - Frontend: New PartnerLink page with share/join/results views
  - Modified CoupleQuestionnaire to create partner links on submit
  - Modified CampusIdentity to handle partner join flow
- **Feb 13, 2026**: Removed Download, WhatsApp, Instagram buttons from poster/results pages
