# himanshuheda.vercel.app

Personal portfolio of Himanshu Heda: Full-Stack & AI Integration Engineer.
Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Every page is statically generated.

## Run locally

Needs Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # optional: add the Formspree form ID
npm run dev                  # http://localhost:3000
```

## Build and check

```bash
npm run build    # production build; fails on type errors
npm run lint
npm start        # serve the production build on http://localhost:3000
```

## Deploy (Vercel)

The Vercel project is connected to this GitHub repo:

- Push to any branch: Vercel builds a **preview** URL (behind Vercel login).
- Merge to `main`: Vercel deploys **production** to https://himanshuheda.vercel.app.

`vercel.json` pins `framework: nextjs` so the build is correct even if the project's
Framework Preset in the Vercel dashboard is still set to "Other" from the old static
site. Once the preset is set to Next.js, the pin is harmless.

Rollback: Vercel dashboard → Deployments → pick the previous production deployment →
Instant Rollback.

### Environment variables

Set these in `.env.local` for local work and in Vercel → Settings → Environment Variables
(Production and Preview). Never commit `.env.local`.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | No | Formspree form ID for the contact form. If empty, the form is hidden and only the email link shows. |
| `NEXT_PUBLIC_SITE_URL` | No | Overrides `https://himanshuheda.vercel.app` for canonical URLs, sitemap, OG images and JSON-LD. |

After changing an env var on Vercel, redeploy so the new value is built in.

## Editing content

All copy lives in two files; components only render it.

| What | File |
|---|---|
| Name, email, socials, hero, metrics, About, experience, education, skills, publication, achievements, certificates, Figma designs | `src/data/portfolio-data.ts` |
| Case studies (`/work` and `/work/[slug]`) and earlier work | `src/data/case-studies.ts` |
| Title, meta description, site URL | `src/lib/site.ts` |

Rules for content:

- Keep metrics identical to the resume.
- No client names, client data, internal URLs or client screenshots. Case studies use an
  architecture diagram instead of screenshots.
- A link that does not exist yet is left out (the item renders without a link). Never use `href="#"`.
- Search the code for `TODO(me)` to find what is still missing.

### Resume PDF

Put the PDF at `public/assets/Resume/Himanshu_Heda_Resume.pdf`. The download buttons and the
redirects from old resume URLs only appear once that file exists (checked at build time).

### Images

Use lowercase, hyphenated file names (no spaces) and WebP where possible, under `public/`.
Always give `next/image` a real `width`, `height` and `alt`.

## Structure

```
src/
  app/                 routes: /, /resume, /work, /work/[slug], /contact
                       plus sitemap.ts, robots.ts, opengraph-image.tsx, twitter-image.tsx
  components/          UI (Sidebar, Navbar, Hero, sections, case study parts)
  data/                all site content
  lib/                 site constants, OG image renderer, build-time file check
next.config.ts         redirects for old URLs (/index.html, old resume paths)
```

## Analytics

None. No analytics or tracking scripts are installed.
