# Trip Dashboard

A static React app that renders a multi-day trip itinerary with per-day maps,
poster banners, and schedules. Built with Vite, React 18, and Tailwind CSS.

Deployed at: https://s1059197.github.io/trip-dashboard/

## Local development

```sh
npm install
npm run dev
```

Dev server runs at http://localhost:5173/trip-dashboard/.

## Production build

```sh
npm run build
npm run preview
```

The build output goes to `dist/`. Vite is configured with `base: "/trip-dashboard/"`
so all asset URLs resolve correctly under that subpath on GitHub Pages.

## Deployment

The site is published from the `gh-pages` branch and served at
`https://s1059197.github.io/trip-dashboard/`.

```sh
npm run build
npm run deploy
```

`deploy` publishes the contents of `dist/` to the `gh-pages` branch via the
`gh-pages` package — it does not touch any other branch.

## Project layout

```
index.html              Vite entry, loads Google Fonts and src/main.jsx
src/main.jsx            React entry, mounts <TripDashboard />
src/TripDashboard.jsx   The itinerary component (all trip data inline)
src/index.css           Tailwind directives
vite.config.js          base path + React plugin
tailwind.config.js      content globs for purge
```

## Notes

- Fonts (Bebas Neue, Spectral, JetBrains Mono) are loaded from Google Fonts
  via a `<link>` tag in `index.html`. The component also adds the same link
  at runtime as a fallback; the `id="trip-fonts"` guard prevents duplication.
- Theming uses CSS custom properties declared inline on the root element of
  `<TripDashboard />` — there is no separate theme file.
- Trip data (days, cities, lakes, mountains) is hard-coded inside
  `src/TripDashboard.jsx`. Edit that file to change the itinerary.
