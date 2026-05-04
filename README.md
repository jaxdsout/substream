# Substream

Search any movie or TV show and instantly see where it's streaming. Built with a neo-cyberpunk aesthetic — neon green on near-black, CRT scanline overlay, Blade Runner vibes.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **Zustand** — global state
- **CSS Modules** — no Tailwind
- **TypeScript**
- **Watchmode API** — streaming availability data

## Features

- Autocomplete title search via Watchmode
- Streaming platform availability by region (subscription & free only)
- IMDb and Letterboxd review links
- Direct deep-links to each platform
- Region switching

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env.local` at the project root:

```
WATCHMODE_API_KEY=your_key_here
```

Get a free API key at [api.watchmode.com](https://api.watchmode.com).

## Project Structure

```
src/
  app/
    api/
      search/       # Autocomplete search route (server-side, keeps API key hidden)
      title/[id]/   # Title details + streaming sources route
    (main)/
      search/[query]/  # Search results page
  components/
    AppShell/       # Layout shell — handles home→results centering animation
    Card/           # Search result card
    Platforms/      # Streaming platform logo grid
    Reviews/        # IMDb / Letterboxd links
    InfoModal/      # Title detail modal
  lib/
    platforms.ts    # Platform name → logo lookup table
    types.ts        # Shared TypeScript interfaces
  store/
    useStore.ts     # Zustand store (search results, selected title, region)
public/
  logos/
    platforms/      # Streaming service logos (19 active platforms)
    reviews/        # IMDb and Letterboxd logos
```

## Deployment

Deployed on Vercel. Set `WATCHMODE_API_KEY` in your Vercel environment variables.
