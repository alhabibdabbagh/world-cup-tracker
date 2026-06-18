# World Cup Tracker - Product Specification

## 1. Product Purpose

World Cup Tracker is a free, public web application designed to display comprehensive World Cup match information in a clean, responsive interface. Users can view match details, team information, stadium locations, match status, scores, and event data (goals, cards, substitutions) without requiring an account, payment, or API key.

## 2. Scope

### In Scope
- Display World Cup matches with all associated metadata
- Show team information (name, country code, flag emoji)
- Display match date/time in user's local timezone
- Show stadium information (name, city, country)
- Display match status (Scheduled, Live, Finished, Postponed, Cancelled)
- Show final or current scores
- Display match events (goals, yellow cards, red cards, substitutions) if available
- Filter matches by status (All, Scheduled, Live, Finished)
- Responsive mobile-first design
- Clean, accessible user interface
- Zero cost, zero external dependencies (for MVP)

### Not in Scope (MVP)
- Real-time live updates without page refresh (would require polling/WebSocket)
- User accounts or authentication
- Push notifications
- Advanced analytics or statistics
- Match predictions or odds
- Live commentary or play-by-play narrative
- Video highlights or embedded media
- Social features (comments, sharing)
- Multi-language support (English only for MVP)

## 3. Non-Goals

- This is NOT a fantasy football app
- This is NOT a betting platform
- This is NOT a streaming service
- This is NOT a news aggregation service
- This is NOT a player statistics database

## 4. Target Users

- Casual World Cup fans who want quick match information
- Sports enthusiasts checking standings and scores
- Developers who want a free, open-source reference project
- Anyone needing publicly available World Cup data without API hassle

## 5. Pages/Screens

### Main Screen (Landing/Dashboard)
- Header with tournament info
- Filter bar (All | Scheduled | Live | Finished)
- Match list/grid showing all filtered matches
- Footer with attribution and data source info

### Match Card (Component, not separate page)
- Team information with flags
- Match date/time
- Current or final score
- Stadium and location
- Match status badge
- Expandable events section

## 6. Data Fields

### Match Object
```javascript
{
  id: string (unique identifier),
  stage: string (e.g., "Group Stage", "Round of 16", "Quarter-Final"),
  group: string | null (e.g., "A", "B", null for knockout),
  homeTeam: {
    name: string,
    code: string (3-char ISO code),
    flag: string (emoji flag)
  },
  awayTeam: {
    name: string,
    code: string,
    flag: string
  },
  kickoff: ISO8601 datetime,
  status: "SCHEDULED" | "LIVE" | "FINISHED" | "POSTPONED" | "CANCELLED",
  minute: number | null (current minute if LIVE, 90+ if finished with ET),
  stadium: {
    name: string,
    city: string,
    country: string
  },
  score: {
    home: number | null,
    away: number | null
  },
  events: Event[] (empty array if no events)
}
```

### Event Object
```javascript
{
  id: string (unique identifier),
  minute: number (1-120),
  type: "GOAL" | "YELLOW_CARD" | "RED_CARD" | "SUBSTITUTION",
  team: string (3-char team code),
  player: string (player name),
  description: string (optional, e.g., "Penalty", "Own goal", "Header"),
  secondaryPlayer: string (optional, for substitutions)
}
```

## 7. Match Status Model

### Status Values
- **SCHEDULED**: Match has not started yet
- **LIVE**: Match is currently in progress
- **FINISHED**: Match has concluded (including after extra time/penalties)
- **POSTPONED**: Match was postponed but may be rescheduled
- **CANCELLED**: Match was cancelled

### Status Display
- SCHEDULED: Blue badge "Scheduled"
- LIVE: Red animated badge "🔴 LIVE"
- FINISHED: Green badge "Finished"
- POSTPONED/CANCELLED: Grey badge with status text

## 8. Event Model

### Event Types
1. **GOAL**: Player scored a goal
   - Fields: minute, player, team, description (e.g., "Penalty", "Own goal", "Header")
2. **YELLOW_CARD**: Player received a yellow card
   - Fields: minute, player, team
3. **RED_CARD**: Player received a red card
   - Fields: minute, player, team
4. **SUBSTITUTION**: Player substitution
   - Fields: minute, team, player (off), secondaryPlayer (on)

### Event Display
- Expandable section on match card
- Shows minute and event type with icon
- Displays player name and team code
- Optional description field
- Clean empty state if no events available: "No detailed event data available"

## 9. Data Source Strategy

### MVP Strategy: Local Static JSON
- Data bundled with application in `src/data/matches.json`
- Includes World Cup 2022 fixtures and results (for demo/reference)
- Also includes sample scheduled matches for 2026 World Cup
- No external API required
- App works completely offline after initial load

### Why Static Data?
1. **100% Free Forever** - No rate limits, no API costs, no hidden charges
2. **Privacy** - No tracking, no data collection, no third-party requests
3. **Reliability** - Data doesn't depend on external service availability
4. **Performance** - Instant loading, no network latency
5. **Offline** - Works without internet connection (after npm install)

### Optional Post-MVP Enhancement
- Users could optionally integrate `football-data.org` free tier
- Would require user to provide their own API key (not embedded)
- Data service abstraction layer allows easy swap without UI changes
- Would enable live scores and real-time updates

### Future Data Source (If Needed)
- Consider `football-data.org` free tier (10 req/min, no CORS issues)
- Implement optional polling with user's own API key
- Add refresh button for manual live updates
- Fallback to local data if API unavailable

## 10. Free-Only Constraints

### Guaranteed Free
✅ React (MIT license)
✅ Vite (MIT license)
✅ Vercel Free tier
✅ GitHub (public repo)
✅ Static JSON data
✅ Plain CSS (no framework)

### Not Used (Avoided Paid/Hidden Costs)
❌ No API requiring API key in source code
❌ No paid libraries or SDKs
❌ No backend server or serverless functions
❌ No database (static data only)
❌ No external services with hidden costs
❌ No premium tiers for production use

## 11. Risks

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Data freshness | MEDIUM | Document that MVP uses static data; include last-updated timestamp |
| No live updates | MEDIUM | Clearly explain in README that live data requires future API integration |
| Static data limits | LOW | Sufficient for MVP; can expand dataset as needed |
| External API later | MEDIUM | Design data service abstraction to allow future swaps |
| Browser compatibility | LOW | Use modern CSS and JavaScript; test on major browsers |

## 12. MVP Acceptance Criteria

The MVP is complete when:

### Functionality
- ✅ All matches from data source display correctly
- ✅ Filter buttons (All/Scheduled/Live/Finished) work correctly
- ✅ Match cards show: teams, score, stadium, date, status
- ✅ Events section renders if events exist, empty state if not
- ✅ Status badges display with correct styling for each status
- ✅ Responsive design works on mobile (iPhone 12), tablet (iPad), desktop

### Data & API
- ✅ No external API required to run
- ✅ All data loads from bundled JSON file
- ✅ No API keys in source code
- ✅ Data service layer is clean and testable

### Code Quality
- ✅ No broken imports
- ✅ No missing files
- ✅ Clean, readable component structure
- ✅ No console errors or warnings
- ✅ Code follows consistent style

### Deployment
- ✅ `npm install` completes successfully
- ✅ `npm run dev` starts local server
- ✅ `npm run build` creates dist/ folder
- ✅ Deploys to Vercel without configuration
- ✅ App works on deployed URL

### Documentation
- ✅ `spec.md` complete and accurate
- ✅ `skille.md` complete with setup and conventions
- ✅ `README.md` explains how to run, limitations, what's free
- ✅ Comments in code where necessary

### Testing
- ✅ Manual testing on mobile (responsive)
- ✅ Manual testing on desktop
- ✅ Filter functionality verified
- ✅ All match statuses render correctly
- ✅ Events display correctly
- ✅ Empty states work

## 13. Future Improvements (Post-MVP)

### Phase 2: Live Score Integration
- Optional football-data.org API integration
- User provides their own API key (secure, not embedded)
- Polling mechanism for live score updates
- Refresh button for manual updates
- Fallback to local data if API fails

### Phase 3: Enhanced Features
- Team search/filter by name
- Stadium search by location
- Group stage standings table
- Match statistics and possession
- Head-to-head history
- Player statistics

### Phase 4: User Experience
- Multi-language support
- Dark/light theme toggle (currently dark only)
- Match notifications (requires backend)
- Favorites/bookmarks (browser localStorage)
- Export/share match info
- Calendar view

### Phase 5: Advanced Features
- Player profiles
- Historical data (previous World Cups)
- Analytics dashboard
- Advanced statistics and heatmaps
- Video highlight integration

## 14. What Is Guaranteed

✅ **Guaranteed To Have**
- Clean, responsive UI
- All team/match information
- Score display
- Stadium and location info
- Event data (goals, cards) if included
- Filter functionality
- Mobile-friendly design
- 100% free, no hidden costs
- Works without internet (after npm install)
- Source code on GitHub (public, MIT license)

## 15. What Is NOT Guaranteed (Due to Free Data Limitations)

❌ **NOT Guaranteed (MVP)**
- Real-time live score updates (would require polling or WebSocket)
- Instant goal/card notifications as they happen
- Live minute-by-minute updates without refresh
- Streaming of video highlights
- Advanced player statistics
- Historical odds or predictions
- Push notifications
- Continuous server uptime guarantees

---

## Summary

**World Cup Tracker** is a free, open-source web application that provides a clean interface to view World Cup match information. The MVP uses static, bundled JSON data to ensure 100% free operation with zero external dependencies. The data service layer enables future enhancement with live APIs without major refactoring. The application is designed mobile-first, responsive, and accessible, meeting all stated requirements without compromising on simplicity or cost.

**Key Promise to Users:** "Free forever, no tracking, no ads, no hidden costs."