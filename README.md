# 2 Weeks to Solve It - Agency Website

A conversion-focused agency site built with Astro and React, featuring fast, scalable, AI-powered solutions.

## 🚀 Project Structure

```
/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── Header.tsx          # Global navigation component
│   ├── layouts/
│   │   └── BaseLayout.astro    # Main layout with SEO
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── services.astro
│   │   ├── process.astro
│   │   ├── work.astro
│   │   ├── impact.astro
│   │   ├── blog.astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css          # Global styles with Tailwind
└── package.json
```

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🤖 Local AI Planner Integration

The hero chatbox now talks directly to an n8n workflow that orchestrates Ollama running the `qwen2.5:7b-instruct` model. Follow the steps below to reproduce the local setup.

- **Install n8n locally**
  1. Install Docker Desktop (recommended) or Node.js 18+.
  2. Run `docker run -it --rm -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n` (or `npx n8n start` if running via Node).
- **Import the provided workflow**
  1. Open http://localhost:5678.
  2. Create a new workflow and use *Import from File* with the JSON in `docs/workflows/painpoint-sprint-snapshot.json`.
  3. Activate the workflow or leave it inactive and run manually. The webhook path is `/webhook/planner`.
- **Install and prepare Ollama**
  1. macOS: `brew install ollama`; Linux: follow https://ollama.ai/download.
  2. Start the service: `ollama serve`.
  3. Pull the model once: `ollama pull qwen2.5:7b-instruct`.
- **Wire n8n to Ollama**
  - In the workflow’s HTTP Request node, set `OLLAMA_URL=http://localhost:11434/api/generate` and `MODEL_NAME=qwen2.5:7b-instruct` using n8n’s *Variables* tab or `.env` file.
- **Allow browser access (if needed)**
  - When posting to the webhook from the Astro dev server, you may need to launch n8n with `N8N_CORS_ALLOW_ORIGINS=http://localhost:4321` (or `*` for testing) so the browser can reach the webhook.
- **Configure Astro**
  - Optionally set `PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/planner` in a `.env` file at the project root. Without it, the app falls back to that local URL automatically.
  - Run `npm run dev` and open http://localhost:4321.
- **Test the loop**
  - Enter a painpoint in the hero chatbox. The UI now streams the payload to n8n.
  - If Ollama requests clarifications, add more context; Astro keeps everything you typed and resubmits the combined narrative.
  - When the model returns a complete plan, the result cards render the assumptions, sprint outline, CTA copy, and follow-up questions that came back from the workflow.

## ✅ Header Component - Implementation Status

### Features Implemented
- ✅ Logo with brand gradient (inspired by Lovable)
- ✅ All navigation links (Home, Services, Process, Work, Impact, Blog, Contact)
- ✅ Sticky header with smooth scroll behavior
- ✅ Backdrop blur and border on scroll
- ✅ Responsive mobile menu with smooth transitions
- ✅ CTA button ("Book a Call") with gradient styling

### Accessibility (WCAG 2.1 AA)
- ✅ Keyboard navigable (Tab, Enter, Escape)
- ✅ Focus visible states with ring indicators
- ✅ Current page link has `aria-current="page"`
- ✅ ARIA labels for screen readers
- ✅ Mobile menu with proper ARIA attributes
- ✅ Semantic HTML structure

### States
- ✅ Default state
- ✅ Hover/focus states with smooth transitions
- ✅ Active link highlighting (current page)
- ✅ Mobile collapsed/expanded menu
- ✅ Scrolled state (backdrop blur + shadow)

### Responsive Design
- ✅ Works at 320px width
- ✅ Mobile-first approach
- ✅ Breakpoints: sm (640px), md (768px), lg (1024px)
- ✅ Touch-friendly mobile menu

## 🎨 Design System

Inspired by Lovable.dev:
- **Colors**: Brand gradient (pink to purple), clean whites, soft grays
- **Typography**: Inter font family with various weights
- **Shadows**: Subtle elevation with colored shadows
- **Transitions**: Smooth 200-300ms transitions
- **Gradients**: Used for CTAs and accent elements

## 📊 Performance & SEO

- **Lighthouse Target**: ≥95 (Perf/SEO/Best/Access)
- **SEO**: Meta tags, OG images, canonical URLs
- **Analytics**: Plausible (cookieless)
- **Static Site**: Fast loading, no server dependencies

## 🔜 Next Steps

Component implementation order:
1. ✅ Header (Global Nav) - COMPLETED
2. Hero Section
3. Services Section
4. Process Section
5. Work/Case Studies
6. Impact Section
7. Contact Form (with n8n integration)
8. Footer
9. Blog Posts (Content Collection)

## 📝 License

Private - All rights reserved
