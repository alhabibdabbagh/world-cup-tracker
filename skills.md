# World Cup Tracker - Skills Documentation

## Overview
This document contains detailed instructions and skills for maintaining and extending the World Cup Tracker application.

## Project Structure

### Directory Layout
```
world-cup-tracker/
├── src/
│   ├── components/          # React components
│   ├── data/               # Data service and static data
│   ├── styles/             # Global styles
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
└── skills.md              # This file
```

### Key Files
- **src/App.jsx** - Main application component with tournament selection and match filtering
- **src/components/Calculator.jsx** - Interactive calculator widget (now fixed)
- **src/components/Header.jsx** - Header component with tournament info and calculator
- **src/components/MatchCard.jsx** - Individual match display card
- **src/data/dataService.js** - Service for fetching and processing match data
- **src/styles/main.css** - Global CSS styling

## Bug Fixes

### Fixed: Calculator Import Error
**Issue:** Header.jsx was importing from `./Calculator` but the file contained CSS code instead of a React component.

**Root Cause:** The actual Calculator component was in `Calculator_new.jsx` while the old CSS was mistakenly in `Calculator.jsx`.

**Solution:** 
- Replaced the CSS content in `Calculator.jsx` with the actual React component code
- The component is now properly exported and can be imported in Header.jsx

## Development Skills

### 1. Adding New Tournament Data
**Skill:** Extend tournament information
- Edit `src/data/matches.json` to add new tournament data
- Update `src/data/dataService.js` `getAvailableTournaments()` if needed
- Follow the existing JSON structure for match objects

### 2. Customizing Match Display
**Skill:** Modify match card appearance
- Edit `src/components/MatchCard.jsx` to change what information is displayed
- Update CSS classes in `src/styles/main.css` for styling changes
- Use the match object properties: `id`, `status`, `home_team`, `away_team`, `kickoff`, `stadium`, etc.

### 3. Implementing API Integration
**Skill:** Connect to live API data
- Modify `src/data/dataService.js` `getMatches()` function
- Currently uses `football-data.org` API with fallback to static data
- API key should be protected in environment variables
- The data refresh interval is set to 60 seconds (`REFRESH_INTERVAL_MS` in App.jsx)

### 4. Styling Updates
**Skill:** Maintain consistent design
- Primary color: `#00bfa5` (teal/cyan)
- Secondary color: `#0f0f0f` (dark background)
- Use CSS custom properties for maintainability
- Responsive breakpoints: 768px (tablet), 480px (mobile)

### 5. State Management
**Skill:** Understand React state flow
- **App.jsx** manages global state: tournaments, matches, filters, loading states
- **Calculator.jsx** manages calculator internal state
- Use `useState` for component state
- Use `useEffect` for side effects (data fetching, intervals)
- Use `useMemo` for expensive calculations (filtering, sorting)

## Component API Reference

### Header Component
```jsx
<Header
  tournamentInfo={object}        // Tournament name, year, country
  tournaments={array}             // Available tournaments
  selectedTournamentYear={number} // Currently selected year
  onTournamentChange={function}   // Callback for tournament selection
  dataSource={string}             // 'api' or 'static'
  apiError={string}              // Error message if API fails
  lastUpdated={Date}             // Last data refresh time
  isRefreshing={boolean}         // Loading indicator
/>
```

### MatchCard Component
```jsx
<MatchCard
  match={object}  // Match object with all match details
/>
```

Match object structure:
```javascript
{
  id: string,
  home_team: { name: string, code: string, flag: string },
  away_team: { name: string, code: string, flag: string },
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED',
  kickoff: ISO8601 datetime,
  home_score: number,
  away_score: number,
  stadium: { name: string, city: string, country: string },
  stage: string,
  events: array
}
```

### Calculator Component
```jsx
<Calculator />
```
Self-contained calculator with:
- Basic arithmetic operations (+, -, ×, ÷)
- Decimal support
- Clear functionality
- No props or external dependencies

## Debugging Guide

### Common Issues

**Issue:** Calculator doesn't appear in header
- Check that `src/components/Calculator.jsx` contains valid React code
- Verify the import statement in `Header.jsx` is correct
- Check browser console for module errors

**Issue:** Matches not displaying
- Verify `src/data/matches.json` contains valid data
- Check if API is accessible (might be blocked by CORS)
- Inspect Network tab in browser DevTools
- Check if data filtering is too restrictive

**Issue:** Tournament selection not working
- Check that `onTournamentChange` handler in App.jsx is properly connected
- Verify tournament data has correct `year` property
- Check useState for selectedTournamentYear initialization

## Performance Considerations

1. **Data Refresh Rate:** Currently 60 seconds - adjust `REFRESH_INTERVAL_MS` in App.jsx if needed
2. **Memoization:** Critical calculations use `useMemo` to prevent unnecessary re-renders
3. **CSS:** Minimized animations for better performance on low-end devices
4. **Image Loading:** Flag images should use lazy loading for large tournament lists

## Testing Recommendations

1. Test calculator functionality with edge cases (division by zero, large numbers)
2. Verify match filtering works across all status types
3. Test tournament switching preserves correct match data
4. Verify responsive design on multiple screen sizes
5. Test data refresh without losing user interaction state

## Future Enhancement Ideas

- [ ] Add match predictions/statistics
- [ ] Implement user favorites feature
- [ ] Add live score notifications
- [ ] Create tournament comparison view
- [ ] Add match replay/highlight links
- [ ] Implement offline mode with service workers
- [ ] Add dark/light theme toggle
- [ ] Create mobile app version

## Maintenance Checklist

- [ ] Update match data when new tournaments start
- [ ] Monitor API service status and update fallback data
- [ ] Review and update dependencies quarterly
- [ ] Check for security vulnerabilities
- [ ] Performance audit on mobile devices
- [ ] Verify accessibility (WCAG 2.1 AA compliance)

---

**Last Updated:** 2024
**Maintained by:** Development Team