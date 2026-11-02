# Milestone 3: 3D story portfolio (himanshuheda.vercel.app)

Read this whole file first. Prerequisite: `portfolio-upgrade` is merged into `main` (I will do that myself). Create a new branch `portfolio-3d` from `main`. Never merge into `main` yourself. Every step deploys to a Vercel preview only.

## 0. Working rules

1. Plan first: list the files, new dependencies and a scene spec per chapter, then wait for my "go".
2. Never invent facts, numbers, links or screenshots. Missing item means a `TODO(me)` comment in code and a line in your final summary, never visible text on the page. If a link is missing, hide that button.
3. No client names or client data anywhere. Say "a manufacturing client".
4. Small commits, one per step.

### Commit rules (important)
- No Claude attribution in any commit: no `Co-Authored-By: Claude...`, no `Claude-Session:` line, no "Generated with Claude Code".
- Set `.claude/settings.json` to `{ "attribution": { "commit": "", "pr": "" }, "includeCoAuthoredBy": false }`.
- Some versions still add a `Claude-Session:` trailer even with that setting, so also install a `commit-msg` hook in `.git/hooks/` that deletes lines matching `Co-Authored-By: Claude`, `Claude-Session:` and `Generated with [Claude Code]`. Make it work in Git Bash on Windows.
- Before every push run `git log main..HEAD --format=%B | grep -iE "claude|co-authored"`. It must print nothing.
- Check whether the existing `portfolio-upgrade` commits already contain such lines. If they do, tell me; do not rewrite shared history without my OK.
- Commit messages: plain, short, imperative, under my own git identity (`git config user.name` and `user.email`).

## 1. Part A: fix the open items from Milestone 2 (do these first)

- **Zip Tales stack:** read the repo's manifests (`package.json`, `requirements.txt`, etc.) and list the real stack on the site. If it is mixed, show all of it. Ask me only if unclear.
- **IBM.jpg:** remove `public/certifications/IBM.jpg` from the repo so it is no longer publicly reachable.
- **"CES Pump Selector":** keep the name for now, but define it once as a constant in the data file so I can rename it in one place.
- **Certificate links** other than IBM: keep them as plain text, no `#` links.
- **Resume PDF:** I will commit the new file myself. Do not touch it.
- I will set the Formspree env var myself in Vercel.

## 2. Part B: redesign `/` as a 3D scroll story

### Why
The current site looks like a generic template. I want visitors to feel they are looking at a working engineer's build log, not a college portfolio. It must still pass a 30-second recruiter test.

### Concept: "Build log"
A dark, technical scroll journey. A fixed WebGL canvas sits behind real HTML chapters. The camera moves along a path as the visitor scrolls, and a network of nodes (my systems) grows from a few dim points into a structured production architecture. Each chapter is one stage of my career. Metrics appear like command output (`$ metrics --since 2026`), but every value must be real.

### Look and feel
- Near-black background, one electric accent colour (teal or cyan) plus one secondary (violet). Ask me which if you want to change it.
- Display font for headings, a mono font for labels and terminal text. No stock illustrations, no skill bars, no "passionate", no emoji.
- Copy: first person, short, concrete, no buzzwords. Numbers carry the story.

### Chapters (HTML text in this order, each with a 3D scene state)
0. **Boot.** A terminal types `whoami`, then the hero: "Himanshu Heda. Full-Stack & AI Integration Engineer." Sub-line and buttons (Resume, Contact) as in the current hero, plus "Open to full-time roles". Scene: a wireframe core with a few orbiting nodes and mouse parallax.
1. **Origin (2021 to 2024).** From Chittorgarh to BCA, then MCA in Delhi NCR (Jul 2024 to Jul 2026). First builds: an e-commerce site, a Java chat app, a Java bank system. Scene: a handful of dim nodes.
2. **Community and first jobs (2024 to 2025).** CodSoft web internship; Project Admin and Mentor at GirlScript Summer of Code, SWOC, GDSC, Kharagpur Open Source Society and Android Club VIT Bhopal (50+ PRs reviewed, 100+ contributors mentored); hackathon finalist at ABV-IIITM Gwalior; OctoDo intern (n8n SEO automation with 60% less manual effort, hydraulic design cost prediction +15%); the IEEE phishing-detection paper (97.70%). Scene: the network grows and edges appear between nodes.
3. **Production (2026).** Developer at OctoDo Sol. WorkOrder system: manual processing down 80%. Pump selector: 60 minutes to under 5 seconds. Scene: nodes snap into layers (client, API, database) with data pulses; counters animate.
4. **FabVision AI (flagship).** A solo-built Flutter + FastAPI platform on AWS. Live on Google Play, now v20, Razorpay payments live, 100+ downloads, iOS next. Scene: a 3D phone with FabVision screens on it and a fabric photo turning into a model shot (particles or a simple shader). Use real screenshots from `public/fabvision/` (I will add them). Until then, show a clean abstract screen with no fake UI claims. Button: Google Play.
5. **Integrations and automation.** Meta/WhatsApp Business API across 3 numbers, n8n with Tally order-to-cash, listmonk with Amazon SES. Scene: pulses travelling between labelled service nodes.
6. **Now.** In progress: Payment Tracker, Sewar pump research, a local multi-agent LLM system. Contact buttons and the email link. Scene: the full network, calm.

Each chapter links to its existing `/work/[slug]` page for details. Keep `/resume`, `/work` and `/contact` as they are, restyled to match the new look.

### Interaction
- Scroll-driven camera path, subtle mouse parallax, hover labels on nodes, a chapter progress indicator with plain `#chapter` anchors.
- A "Skip story" link at the top and a compact 30-second summary (metrics plus links) near the top, so a recruiter never has to scroll through the whole story.

### Technical requirements
- React Three Fiber v9 (React 19 compatible), drei and three. Procedural geometry only; no big models or HDRs. If a GLB is truly needed, keep it under 300 KB with Draco.
- Load the canvas with `next/dynamic` (`ssr: false`), mounted after first paint. All copy must be server-rendered in the DOM in reading order. The canvas is `aria-hidden`.
- Performance: cap device pixel ratio at 1.5, use instancing, pause rendering when the tab is hidden or the canvas is off-screen, and no heavy post-processing on mobile.
- Fallbacks, never a blank screen:
  - no WebGL, `prefers-reduced-motion`, `Save-Data`, or a low-end device (`hardwareConcurrency <= 4` or `deviceMemory <= 4`) get a static 2D version of the same story (CSS or SVG) with the same copy;
  - an error boundary around the canvas.
- Accessibility: visible focus, skip link, keyboard-reachable navigation, AA contrast, no content only available through animation.
- SEO: keep metadata, JSON-LD, sitemap and OG image working; update the OG image to match the new look.

### Budgets and gates
- Lighthouse mobile for `/`: Performance 85+, Accessibility, Best Practices and SEO 100. The LCP element must be text, not the canvas. Other pages stay at 95+.
- First-load JS for `/` excluding the lazy 3D chunk: at most about 170 KB gzipped. 3D chunk: at most about 400 KB gzipped.
- 60 fps on desktop, at least 30 fps on a mid-range phone.
- Test at 360, 768 and 1280 px. Give me screenshots of every chapter and the Lighthouse numbers.

## 3. Delivery in stages (preview each one)
- **3a:** foundation (canvas, fallback, budgets) and chapters 0 and 1.
- **3b:** chapters 2 to 6.
- **3c:** polish, performance pass, restyle of the other pages.

## 4. Questions for me before you start
1. Do you have FabVision screenshots in `public/fabvision/`? If not, I will add them.
2. Accent colour preference (teal or cyan), or should I choose?
3. Dark only, or also a light theme?
