# MediConnect Malaysia (Next.js frontend)

Frontend-only rebuild of the [Netlify design preview](https://mediconnect-malaysia-preview.netlify.app/), structured for a later API/backend and Vercel deployment.

## Stack

- Next.js App Router + TypeScript
- Preview CSS ported as-is (`src/styles/mediconnect.css`) for visual fidelity
- Client-side mock interactions (journey stages, plan form, hospital filters, chat/callback preview)
- No backend or secrets required yet

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run generate:content` | Regenerate page HTML content from a local `_preview/` scrape (optional) |

## Environment variables

None required for the current frontend-only preview.

See [`.env.example`](./.env.example) for later backend hooks:

- `NEXT_PUBLIC_API_BASE_URL` — enquiry/callback API
- Contact channel IDs (WhatsApp / phone) once live

## Vercel

Root Directory: repo root. Build command: `npm run build`. Output: Next.js default.

GitHub Actions CI (`.github/workflows/ci.yml`) runs `lint` + `build` on push/PR.
