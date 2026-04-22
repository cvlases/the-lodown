# THE LODOWN

**Big news, closer to home.**

A local journalism discovery platform consisting of:
- **Website** — A React (Vite) web app for browsing local news sources, saving articles into folders, building a personalized feed, and submitting new outlets.
- **Chrome Extension** — A Manifest V3 browser companion that flags corporate media ownership, searches DuckDuckGo for local alternatives, and lets you bookmark articles to your account.
- **Supabase Backend** — Auth, database, and an Edge Function for RSS feed syncing.

---

## Quick Start

### 1. Set up the Supabase database

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor.
2. Open `supabase/setup.sql` from this repo and run the entire script.
3. This creates all tables, RLS policies, indexes, and seeds initial source/resistance data.

### 2. Run the website locally

```bash
# Install dependencies
pnpm install    # or npm install

# The .env file is already configured — edit if needed:
#   VITE_SUPABASE_URL
#   VITE_SUPABASE_ANON_KEY
#   VITE_GOOGLE_MAPS_KEY (optional, for the Browse screen map)

# Start dev server
pnpm dev        # or npm run dev
```

### 3. Load the Chrome extension

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode** (toggle in the top-right).
3. Click **Load unpacked** → select the `extension/` folder.
4. The LoDown icon appears in your toolbar.

The extension's Supabase credentials are in `extension/scripts/config.js`.

---

## Project Structure

```
the-lodown/
├── src/                          # Website (React + Vite + Tailwind)
│   ├── app/
│   │   ├── App.tsx               # Root component, routing, auth
│   │   └── components/
│   │       ├── Masthead.tsx       # Header, nav, auth modal
│   │       ├── BrowseScreen.tsx   # Google Maps + outlet directory
│   │       ├── SavedScreen.tsx    # Folder-based article saving
│   │       ├── FollowingScreen.tsx# Personalized feed + tag management
│   │       ├── ExtensionScreen.tsx# Extension promo / download page
│   │       ├── AboutScreen.tsx    # About page
│   │       └── SubmitSourceScreen.tsx # Outlet submission form
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client init
│   │   └── sources.ts            # Static source list
│   └── styles/                   # CSS: Tailwind, fonts, theme
│
├── extension/                    # Chrome Extension (Manifest V3)
│   ├── manifest.json
│   ├── popup.html                # Extension popup UI
│   ├── alert.html                # Auto-mode alert page
│   └── scripts/
│       ├── config.js             # Supabase credentials (edit this)
│       ├── background.js         # Service worker: search, auth, data
│       └── popup.js              # Popup UI logic
│
├── supabase/
│   ├── setup.sql                 # Database setup — run this first
│   └── functions/
│       └── sync-rss/index.ts     # Edge Function: RSS feed syncer
│
├── .env                          # Website env vars (Supabase + Maps keys)
├── .env.example                  # Template for env vars
└── package.json
```

---

## Database Tables

| Table | Purpose |
|-------|---------|
| `sources` | Verified local news outlets (shared by website + extension) |
| `articles` | Articles fetched via RSS sync |
| `saved_folders` | User's personal bookmark folders |
| `saved_articles` | Articles saved inside folders |
| `following_tags` | User's followed authors/sources/places/topics |
| `source_requests` | Outlet submissions from the public form |
| `resistance_list` | Corporate media domains flagged by the extension |
| `extension_bookmarks` | Articles bookmarked from the extension |

All tables have Row Level Security (RLS) enabled. User-scoped tables require authentication; public tables (sources, articles, resistance_list) allow anonymous reads.

---

## RSS Sync Edge Function

The `supabase/functions/sync-rss/index.ts` function fetches RSS feeds from verified sources and upserts articles. Deploy it as a Supabase Edge Function and schedule it hourly via Supabase Cron Jobs (`0 * * * *`).

---

## License

See [LICENSE](LICENSE).
