# World Cup Tracker - Technical Skills & Setup Guide

## 1. Technologies Used

### Frontend Framework
- **React 18** - Component-based UI framework
- **Vite** - Modern build tool and dev server
- **JavaScript (ES6+)** - Programming language

### Styling
- **Plain CSS** - No CSS framework dependencies
- **CSS Grid** - Responsive layout system
- **CSS Flexbox** - Component alignment
- **CSS Media Queries** - Mobile-first responsive design

### Data Management
- **Static JSON** - Bundled fixture data
- **Custom Data Service** - Abstraction layer for data source

### Deployment
- **Vercel** - Free hosting platform
- **GitHub** - Version control and repository

## 2. Why These Technologies

### React 18
- ✅ Industry standard, widely used
- ✅ Component-based architecture (reusable, maintainable)
- ✅ Excellent ecosystem and community
- ✅ Fast rendering with virtual DOM
- ✅ Hooks API for state management
- ✅ Easy to learn and test

**Alternative Considered:** Vue.js
- Vue is great, but React is more universally known

### Vite
- ✅ Ultra-fast development server (2s vs 30s with CRA)
- ✅ Native ES modules support
- ✅ Zero-config for React
- ✅ Optimized production build
- ✅ Hot module replacement
- ✅ Minimal learning curve

**Alternative Considered:** Create React App
- CRA is slower, heavier, more opinionated

### Plain CSS
- ✅ Zero dependencies, minimal bundle size
- ✅ Full control over styling
- ✅ No build step overhead
- ✅ Modern CSS features (Grid, Flexbox) are sufficient
- ✅ Easy to customize and maintain
- ✅ Excellent performance

**Alternative Considered:** Tailwind CSS
- Tailwind is great but overkill for MVP
- Adds ~50KB to bundle
- Plain CSS is cleaner for this scope

### Static JSON Data
- ✅ 100% free (no API costs)
- ✅ Works offline
- ✅ No rate limits
- ✅ Instant load times
- ✅ Simple to understand and modify
- ✅ Easy to test

**Alternative Considered:** External API
- Would introduce API rate limits
- Requires authentication or CORS
- Adds network latency
- Dependency on external service
- Potential hidden costs

### Vercel
- ✅ Zero-config deployment
- ✅ Automatic builds on git push
- ✅ Free tier is sufficient
- ✅ Fast CDN and global distribution
- ✅ One-click GitHub integration
- ✅ Instant preview deployments

**Alternative Considered:** GitHub Pages
- GitHub Pages is simpler but requires manual build
- Vercel has better DX for React projects

## 3. Project Setup Commands

### One-Time Setup (After `npm init -y`)

```bash
# Install runtime dependencies
npm install react react-dom

# Install dev dependencies
npm install -D vite @vitejs/plugin-react
```

### Verify Installation

```bash
npm list
```

Expected output:
```
world-cup-tracker@1.0.0
├── react@18.2.0
├── react-dom@18.2.0
├── vite@5.0.8 (dev)
└── @vitejs/plugin-react@4.2.1 (dev)
```

## 4. Development Commands

### Start Development Server

```bash
npm run dev
```

Output:
```
VITE v5.0.8  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

Opens browser at `http://localhost:5173` with hot module replacement.

### Development Features
- **Hot Reload** - Changes save instantly
- **Console Errors** - Display in browser overlay
- **Source Maps** - For easy debugging

## 5. Build Commands

### Production Build

```bash
npm run build
```

Output:
```
vite v5.0.8 building for production...
✓ 42 modules transformed.
dist/index.html                   0.45 kB │ gzip:   0.30 kB
dist/assets/index-a1b2c3d4.css    2.50 kB │ gzip:   1.20 kB
dist/assets/index-e5f6g7h8.js    15.30 kB │ gzip:   6.50 kB
```

Creates optimized `dist/` folder ready for deployment.

### Preview Production Build

```bash
npm run preview
```

Test production build locally before deploying.

## 6. Deployment Commands

### Deploy to Vercel

#### Option 1: Via GitHub (Recommended)

```bash
# Push to GitHub main branch
git push origin main

# Vercel auto-deploys within 1-2 minutes
# Check deployment at: https://project-name.vercel.app
```

#### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project directory
vercel

# Follow prompts:
# 1. Link to existing project or create new
# 2. Select source directory: .
# 3. Build command: npm run build
# 4. Output directory: dist

# Get live URL in terminal output
```

#### Option 3: Vercel Dashboard

1. Go to vercel.com
2. Sign in with GitHub
3. Import git repository
4. Vercel auto-detects Next.js/Vite config
5. Click "Deploy"

### Environment Variables (If Needed Future)

Create `.env.local` in project root:

```
VITE_API_KEY=your_key_here
```

Access in code:
```javascript
const apiKey = import.meta.env.VITE_API_KEY
```

**Current Status:** No env vars needed for MVP

## 7. Folder Structure

```
world-cup-tracker/
│
├── src/
│   ├── components/              (React components)
│   │   ├── Header.jsx          (Tournament info header)
│   │   ├── FilterBar.jsx        (Status filter buttons)
│   │   ├── MatchCard.jsx        (Individual match display)
│   │   ├── EventList.jsx        (Goals, cards, events)
│   │   ├── StatusBadge.jsx      (Status indicator)
│   │   └── LoadingState.jsx     (Loading spinner)
│   │
│   ├── data/                    (Data management)
│   │   ├── matches.json         (Static World Cup fixtures)
│   │   └── dataService.js       (Data abstraction layer)
│   │
│   ├── styles/
│   │   └── main.css             (All styling - no CSS-in-JS)
│   │
│   ├── App.jsx                  (Root component)
│   └── main.jsx                 (Entry point)
│
├── public/
│   └── index.html               (HTML template)
│
├── .github/
│   └── workflows/               (CI/CD config - optional)
│
├── dist/                        (Build output - generated)
├── node_modules/                (Dependencies - generated)
│
├── .gitignore                   (Git ignore patterns)
├── package.json                 (Dependencies & scripts)
├── vite.config.js              (Vite configuration)
├── spec.md                      (Product specification)
├── skille.md                    (This file)
├── README.md                    (User guide)
└── LICENSE                      (MIT license)
```

### Folder Purposes

- **src/components/** - Reusable React components
  - Each component in own file
  - Props clearly documented
  - No internal state when possible (prefer prop drilling)

- **src/data/** - Data management layer
  - `matches.json` - Single source of truth
  - `dataService.js` - Abstraction for data fetching
  - Easy to swap with API later

- **src/styles/** - Global styling
  - Single CSS file for simplicity
  - Mobile-first approach
  - CSS variables for consistency

- **public/** - Static assets
  - Only `index.html` in MVP
  - Could add favicons, images here

## 8. Coding Conventions

### File Naming
- **Components:** PascalCase (e.g., `MatchCard.jsx`)
- **Non-components:** camelCase (e.g., `dataService.js`, `main.jsx`)
- **Data files:** camelCase (e.g., `matches.json`)
- **Styles:** kebab-case classes (e.g., `.match-card`)

### Component Structure

```javascript
// 1. Imports at top
import { useState } from 'react'

// 2. Component function (PascalCase)
function ComponentName({ prop1, prop2 }) {
  // 3. State and logic
  const [state, setState] = useState(false)

  // 4. Handlers
  const handleClick = () => {
    setState(!state)
  }

  // 5. Render JSX
  return (
    <div className="component-name">
      {/* Content */}
    </div>
  )
}

// 6. Export default
export default ComponentName
```

### CSS Class Naming (BEM-ish)
```css
/* Block */
.match-card { }

/* Element */
.match-card-header { }

/* Modifier */
.match-card.expanded { }
.status-badge.live { }
```

### Data Service Usage

```javascript
// ✅ Good - abstraction layer
import dataService from './data/dataService'
const matches = dataService.getAllMatches()
const filtered = dataService.getMatchesByStatus('FINISHED')

// ❌ Bad - tight coupling
import matches from './data/matches.json'
const filtered = matches.filter(...)
```

### Comments
- Comment WHY, not WHAT
- Keep comments up-to-date with code
- Use JSDoc for complex functions

```javascript
// ❌ Bad - obvious from code
const status = match.status // Get the status

// ✅ Good - explains intent
// Filter out cancelled matches due to API restrictions
const active = matches.filter(m => m.status !== 'CANCELLED')
```

## 9. Data Update Process

### Current MVP (Static Data)
1. Edit `src/data/matches.json` directly
2. Add/modify match objects
3. Rebuild: `npm run build`
4. Test locally: `npm run dev`
5. Commit: `git add . && git commit -m "Update match data"`
6. Push: `git push origin main` (Vercel auto-deploys)

### Future: API Integration

When ready to add live API:

1. Create `src/services/football-api.js`:
```javascript
// Optional football-data.org integration
const fetchLiveMatches = async (apiKey) => {
  const response = await fetch('https://api.football-data.org/...')
  return response.json()
}
```

2. Update `src/data/dataService.js`:
```javascript
// Add optional method for API data
getMatchesFromAPI(apiKey) {
  return footballApi.fetchLiveMatches(apiKey)
}
```

3. Update `src/App.jsx` to use API if key provided:
```javascript
// Optional: Add API key input
// Fallback to local data if API unavailable
```

### How to Replace Data Source Later

The data service abstraction makes swapping easy:

**Current:**
```javascript
// dataService.js - reads from matches.json
import matchesData from './matches.json'
getAllMatches() { return matchesData.matches }
```

**Future (if adding API):**
```javascript
// dataService.js - switches to API
async getAllMatches() {
  try {
    return await fetchFromFootballDataAPI()
  } catch {
    return loadLocalMatches() // Fallback
  }
}
```

**UI doesn't change** - only data source changes behind abstraction!

## 10. Maintenance Notes

### Regular Maintenance
- Update dependencies every month: `npm update`
- Check for security vulnerabilities: `npm audit`
- Monitor Vercel deployment logs
- Keep spec.md and README.md in sync

### Common Issues

**Issue:** `npm run dev` fails
```bash
# Solution: Clear cache
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Issue:** Build fails
```bash
# Solution: Check for syntax errors
npm run build --verbose

# Or check for missing imports
npm run dev
```

**Issue:** Styling not applied
```bash
# Ensure CSS is imported in main.jsx
import './styles/main.css'

# Check CSS class names match HTML
// Check browser DevTools Elements panel
```

### Performance Optimization (Future)

Currently fast because:
- ✅ No external API calls
- ✅ Static data (no database queries)
- ✅ Vite optimizes bundle
- ✅ Plain CSS is lightweight
- ✅ Minimal React components

If needed to optimize further:
- Code splitting (Vite auto-does this)
- Image optimization (if adding images)
- CSS minification (Vite auto-does this)
- Lazy loading components (if app grows)

## 11. Git/GitHub Workflow

### Initial Setup

```bash
# Initialize git (one-time in project root)
cd world-cup-tracker
git init
git branch -M main

# Create .gitignore (already included)
# Create first commit
git add .
git commit -m "Initial commit: project scaffolding"

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/username/world-cup-tracker.git
git push -u origin main
```

### Feature Branches

For larger features, use branches:

```bash
# Create feature branch
git checkout -b feature/live-api-integration

# Make changes, commit regularly
git add .
git commit -m "Add football-data.org API service"

# Push feature branch
git push origin feature/live-api-integration

# Create Pull Request on GitHub
# After review, merge to main
# Vercel auto-deploys
```

### Commit Message Format

```
type: short description

Optional longer explanation of why this change was made.

Types:
- feat: New feature
- fix: Bug fix
- refactor: Code reorganization (no behavior change)
- docs: Documentation update
- chore: Dependency update, build config, etc.

Examples:
feat: Add event expansion toggle
fix: Correct responsive layout on mobile
refactor: Extract status badge component
docs: Update README with deployment steps
chore: Upgrade Vite to 5.0.0
```

### Useful Git Commands

```bash
# View commit history
git log --oneline

# View changes not staged
git diff

# View changes staged for commit
git diff --cached

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- src/App.jsx

# See branch status
git status

# List all branches
git branch -a
```

## 12. Environment Variables (Not Needed for MVP)

If future API integration requires key:

Create `.env.local` (never commit this):
```
VITE_FOOTBALL_API_KEY=your_actual_key_here
```

Use in code:
```javascript
const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY
```

Document in `.env.example` (commit this):
```
VITE_FOOTBALL_API_KEY=your_api_key_here_replace_with_real_key
```

Users copy and customize `.env.example` → `.env.local`

## 13. Testing (Optional for MVP)

If adding tests later:

```bash
# Install Vitest (simple testing framework)
npm install -D vitest jsdom @testing-library/react

# Create src/__tests__/MatchCard.test.jsx

# Run tests
npm run test
```

## 14. Accessibility (WCAG 2.1 AA)

Current implementation includes:
- ✅ Semantic HTML (header, footer, divs with roles)
- ✅ Good color contrast (WCAG AA)
- ✅ Keyboard navigation (buttons, filters)
- ✅ Focus indicators (visible on tab)
- ✅ Alt text patterns (emoji for icons)

Future improvements:
- Add ARIA labels if needed
- Test with screen readers
- Ensure mobile keyboard friendly
- Test on browsers and devices

## 15. Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Uses modern CSS and JavaScript (ES6+):
- CSS Grid ✅
- CSS Flexbox ✅
- Fetch API ✅
- ES6 modules ✅

## Summary

**World Cup Tracker** is built with modern, free tools (React, Vite, Plain CSS) optimized for fast development and deployment. The architecture is clean, with data abstraction enabling future API integration without major refactoring. The project is ready for contribution, maintenance, and scaling.

Key files to know:
- `src/App.jsx` - Root component, filter logic
- `src/data/dataService.js` - Data layer (easy to swap)
- `src/styles/main.css` - All styling
- `src/components/` - Reusable components

For questions, refer to `spec.md` (product) or `README.md` (user guide).