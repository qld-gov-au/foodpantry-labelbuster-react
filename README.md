# Food Pantry Label Buster (React)

React + Vite implementation of the Label Buster flow using QGDS Bootstrap 5 styles and components.

## Tech stack
- React 19
- TypeScript
- Vite
- QGDS Bootstrap 5 (`@qld-gov-au/qgds-bootstrap5`)
- Bootstrap 5
- Font Awesome (free)

## Getting started
```bash
npm install
npm run dev
```

## Scripts
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## App structure
- `src/App.tsx`: app shell and page routing (state-driven)
- `src/components/LabelBusterSideNav.tsx`: side navigation items and active state
- `src/components/SideNavigation.tsx`: QGDS side nav renderer
- `src/pages/*`: page views
- `src/pages/helpGuide/*`: help guide content pages

## Styling
- QGDS styles are loaded in `src/App.tsx`
- App layout tweaks live in `src/App.css`

## Notes
- Navigation is state-based (no React Router).
- QGDS JS is loaded to enable components like accordions.
