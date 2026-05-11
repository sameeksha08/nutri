# nouri — App Mockup

> "How might we help future households manage their lifelong health with personalised education that recognises gender differences?"

A fully interactive HTML/CSS/JS app mockup. No build tools required.

## Running locally (VS Code)

**Option A — Live Server (recommended)**
1. Open folder in VS Code
2. Install "Live Server" extension by Ritwick Dey
3. Right-click `index.html` → Open with Live Server
4. Opens at http://localhost:5500

**Option B — Python**
```bash
python3 -m http.server 3000
```

## Deploying for a shareable link

**Vercel (best)**
1. Push to GitHub
2. vercel.com → Add New Project → Import repo → Deploy
3. Get a real public URL instantly (e.g. nouri-demo.vercel.app)

**Netlify (drag & drop, no account needed)**
1. netlify.com → Add new site → Deploy manually
2. Drag the nouri-app folder in
3. Instant public URL

## Screens
- Onboarding: 6-step flow with app connections
- Home: progress rings, connected app data, meal plan, insight cards
- Village: animated mascots, activity feed
- Tips: star ratings, resonance reactions, verified badges
- Journal: entry cards with synced health data, auto-capture from chat
- Ask Nouri: AI chat with contextual replies, journal auto-capture
- Profile: trust score, connected apps, gender-aware insight card

## Structure
```
nouri-app/
├── index.html
├── src/
│   ├── styles.css
│   ├── app.js
│   ├── data/mockData.js
│   ├── components/village.js
│   └── screens/ (onboarding, home, village-screen, community, journal, chat, profile)
```
