---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

howto use this file:
- use this file to provide context about the project, its structure, and coding guidelines
- this file is not part of the project itself, but is used by AI to better understand the project and provide more relevant responses
- do not include this file in the project or repository itself

# Project Context and Coding Guidelines
A conversion-focused agency site built with Astro and React, featuring fast, scalable, AI-powered solutions.
## Project Structure

```
/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/     # Reusable React components (e.g., Header.tsx)
│   ├── layouts/        # Astro layout components (e.g., BaseLayout.astro)
│   ├── pages/          # Astro page components (e.g., index.astro)
│   └── styles/         # Global and component-specific styles (e.g., global.css)
└── package.json        # Project metadata and dependencies
```
## Commands
| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `clean-commit`           | Remove all unecessary files, code and logs. Follow DRY concept. Add all changes and commit them with a generated commit that lists all that has been done in the commit         |