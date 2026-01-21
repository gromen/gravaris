# CONVENTIONS.md

Instrukcje dla AI (aider) pracującego z tym projektem.

## Projekt

**Gravaris** - strona firmy usług ziemnych (koparka, transport). Rynek polski.

## Tech Stack

- Astro 5.16 (SSR mode)
- Tailwind CSS 4
- Netlify (deploy + CMS)
- Resend (email API)

## Komendy

```bash
npm run dev         # Dev server :4321
npm run build       # Build → ./dist/
npm run preview     # Preview buildu
```

## Struktura

```
src/
├── components/     # Astro components (Header, Footer, Hero, ServicesGrid...)
├── config/site.ts  # Konfiguracja (kontakt, usługi)
├── content/projects/ # Markdown projekty (CMS)
├── layouts/        # Layouty stron
├── pages/          # Strony (index, kontakt, projekty)
│   ├── api/        # API endpoints (contact.ts)
│   └── projekty/   # Dynamiczne strony projektów
├── styles/         # global.css z Tailwind theme
└── middleware.ts   # Maintenance mode logic
```

## Import Aliases

Używaj `@` prefix:
```typescript
import X from '@components/X.astro'
import { siteConfig } from '@config/site'
```

## Design System

Kolory (Tailwind):
- `primary` → #FFC107 (żółty/złoty)
- `accent` → #E0A800 (ciemniejszy żółty, hover)
- `dark` → #0f0f0f (tło)
- `dark-card` → #141414 (karty)

## DO's

- Pisz UI po polsku
- Używaj aliasów importu (@components, @config)
- Tailwind utility classes
- Komponenty .astro dla UI
- Zachowaj spójność z istniejącym stylem

## DON'Ts

- Nie zmieniaj struktury katalogów
- Nie dodawaj nowych zależności bez pytania
- Nie modyfikuj konfiguracji Netlify CMS bez potrzeby
- Nie usuwaj komentarzy w kodzie
- Nie zmieniaj kolorystyki bez uzgodnienia

## Content (CMS)

- Projekty: `src/content/projects/*.md`
- Obrazy projektów: `public/images/projects/`
- Schema: `src/content.config.ts` (Zod)

## Maintenance Mode

Env: `MAINTENANCE_MODE=true`
Bypass: `?access=true`

## Styl odpowiedzi

- Bądź zwięzły
- Kod > opis
- Pytaj jeśli nie jesteś pewien
