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

## Shareable Content
- Cinematic film poster
- Final elegant result card for social sharing

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
- [x] **Download functionality** (poster & results) - Feb 13, 2026
- [x] **WhatsApp sharing** - Feb 13, 2026
- [x] **Instagram sharing** - Feb 13, 2026

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
- **Frontend**: React, React Router, Tailwind CSS, Framer Motion, html2canvas
- **Backend**: FastAPI, Pydantic
- **Database**: MongoDB
- **AI**: Claude Sonnet 4.5 (Emergent LLM Key)

## Key Files
- `/app/backend/server.py` - All API logic, Pydantic models, AI prompts
- `/app/frontend/src/pages/Questionnaire.js` - Questionnaire flow
- `/app/frontend/src/pages/PosterGenerator.js` - Film poster + sharing
- `/app/frontend/src/pages/Results.js` - Results display + sharing
- `/app/frontend/src/questions.js` - Question definitions

## API Endpoints
- `POST /api/submissions` - Submit questionnaire (currently failing)
- `GET /api/confessions` - Fetch confessions
- `PUT /api/confessions/{id}/approve` - Approve confession

---

## Changelog
- **Feb 13, 2026**: Implemented Download, WhatsApp, Instagram sharing on PosterGenerator and Results pages
