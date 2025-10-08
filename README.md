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
