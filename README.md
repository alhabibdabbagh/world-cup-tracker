# ⚽ World Cup Tracker

A **free, open-source** web application for tracking World Cup match information. No API keys. No tracking. No costs. Ever.

[Live Demo](https://world-cup-tracker.vercel.app) • [GitHub](https://github.com/username/world-cup-tracker)

## Features

✅ **Free Forever** - Zero cost, zero hidden fees  
✅ **No API Key Required** - Works completely offline  
✅ **Mobile Responsive** - Beautiful on any device  
✅ **Match Information** - Teams, scores, stadiums, dates  
✅ **Event Tracking** - Goals, yellow/red cards  
✅ **Filter by Status** - Scheduled, Live, Finished  
✅ **Open Source** - MIT license, all code on GitHub  
✅ **Privacy First** - No tracking, no cookies, no data collection  

## Quick Start

### Prerequisites
- **Node.js** 16+ ([Download](https://nodejs.org))
- **npm** 7+ (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/username/world-cup-tracker.git
cd world-cup-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
# Create optimized build
npm run build

# Test production build locally
npm run preview
```

Output goes to `dist/` folder (ready for deployment).

## What's Included

- ⚽ **World Cup 2022** - Complete fixture data with results
- 📅 **2026 World Cup** - Sample scheduled matches
- 🏟️ **Stadium Information** - Name, city, country
- 📊 **Event Data** - Goals, cards, substitutions (where available)
- 📱 **Responsive Design** - Mobile-first, all screen sizes
- 🎨 **Clean UI** - Modern, accessible interface

## Important Notes

### ✅ What This App DOES

- Show World Cup match information
- Display teams, dates, stadiums, locations
- Show final and current scores
- Display event data (goals, cards) when available
- Filter matches by status
- Work completely offline (after npm install)
- Provide zero-cost access to match data

### ❌ What This App DOES NOT

- Provide **real-time live updates** without page refresh
  - *Future version could add polling for live scores*
- Require any API key or authentication
- Collect personal data or track users
- Show video highlights or streaming
- Provide advanced statistics or predictions
- Require a backend server or database

### 📊 Data Source

**Current:** Static JSON bundled with the application
- ✅ 100% free
- ✅ No API rate limits
- ✅ Works offline
- ✅ No external dependencies

**Future Option:** Can be extended with optional API integration (user would provide their own API key)

## Project Structure

```
world-cup-tracker/
├── src/
│   ├── components/          React components
│   ├── data/               Static JSON data
│   ├── styles/             CSS styling
│   ├── App.jsx            Root component
│   └── main.jsx           Entry point
├── public/                 Static assets
├── spec.md                Product specification
├── skille.md              Technical guide
└── README.md              This file
```

See `skille.md` for detailed technical documentation.

## Usage

### Running Locally

```bash
# Start development server (with auto-reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploying to Vercel (Free)

```bash
# Push to GitHub main branch
git push origin main

# Vercel automatically deploys within 1-2 minutes
# Your app will be live at: https://your-project-name.vercel.app
```

See deployment documentation in `skille.md` for more options.

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool
- **Plain CSS** - Styling (no dependencies)
- **JavaScript ES6+** - Programming language
- **Static JSON** - Data storage

## Contributing

This is an open-source project. Contributions welcome!

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -am 'Add new feature'`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

### Ideas for Contributions

- Add more tournament data
- Enhance styling
- Add team search feature
- Create standings table
- Improve mobile experience
- Fix bugs or improve performance

See `spec.md` for future feature ideas.

## Data & Privacy

### Data
- All data is static and bundled with the application
- No external API calls required
- No personal data is collected
- No cookies are used

### Privacy
- ✅ Your browser does not send data anywhere
- ✅ No analytics or tracking
- ✅ No third-party services
- ✅ Works completely offline

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS, Android)

## Performance

- ⚡ **Fast Load Time** - Instant (no external API)
- ⚡ **Small Bundle** - ~20KB gzipped
- ⚡ **No Network Latency** - Local static data
- ⚡ **Optimized Assets** - Vite production build

## Troubleshooting

### `npm install` fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try again
npm install
```

### `npm run dev` fails

```bash
# Check Node version
node --version  # Should be 16+

# Try killing any existing Vite process
# Then run again
npm run dev
```

### Styling looks wrong

- Clear browser cache (Ctrl+Shift+Delete)
- Verify CSS is imported in `src/main.jsx`
- Check CSS class names in DevTools

### Build fails

```bash
# Build with verbose output
npm run build -- --verbose

# Or check for syntax errors
npm run dev
```

## Future Roadmap

### Phase 2: Live Scores (Optional)
- Add optional football-data.org integration
- User provides own API key
- Live score polling
- Refresh button for updates

### Phase 3: Enhanced Features
- Team search/filter
- Stadium search by location
- Group stage standings
- Match statistics

### Phase 4: User Experience
- Multi-language support
- Dark/light theme toggle
- Favorites functionality
- Export/share features

See `spec.md` for detailed roadmap.

## License

MIT License - Use freely, modify, distribute.

See `LICENSE` file for details.

## Support

- **GitHub Issues** - Report bugs or request features
- **Discussions** - Ask questions or share ideas
- **Pull Requests** - Contribute code

## FAQ

**Q: Why is there no real-time live updates?**  
A: MVP uses static data to stay 100% free. Real-time updates require an API, which could have costs or rate limits. Future versions could add optional live score polling.

**Q: Do I need an API key?**  
A: No. The MVP doesn't require any API key. All data is bundled with the app.

**Q: Can I use this commercially?**  
A: Yes. MIT license allows commercial use. Just include the license file.

**Q: Can I contribute data?**  
A: Yes! Submit a PR with updated/additional match data in `src/data/matches.json`.

**Q: Does this work offline?**  
A: Yes, after `npm install`, the app works completely offline. No internet needed.

**Q: What if I want to add an API later?**  
A: The code is structured to support it. See `skille.md` for technical details on how to swap data sources.

**Q: Why React instead of Vue/Svelte?**  
A: React is industry standard and easier for contributors. Any framework could work.

**Q: Is this related to FIFA or official World Cup?**  
A: No, this is an independent open-source project. It uses publicly available data.

## Changelog

### v1.0.0 (Initial Release)
- ✅ Match list and filtering
- ✅ Team and stadium information
- ✅ Score display
- ✅ Event tracking (goals, cards)
- ✅ Mobile responsive design
- ✅ Static data (World Cup 2022, 2026 sample)
- ✅ Free deployment to Vercel

## Credits

- Data sourced from public World Cup information
- Built with React and Vite
- Deployed on Vercel
- Inspired by football fan community

## Contact

- GitHub Issues for bug reports and features
- Pull Requests for contributions

---

**Made with ⚽ for football fans everywhere. Forever free.**