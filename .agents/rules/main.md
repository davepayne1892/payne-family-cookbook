# Payne Family Cookbook Workspace Rules

This file outlines the guidelines, development commands, tech stack details, and repository structure for the **Payne Family Cookbook** workspace. Always adhere to these rules when working in this repository.

---

## 🛠️ Development & Build Commands

Always run verification commands before finalizing code changes.

- **Install Dependencies:** `npm install`
- **Start Dev Server:** `npm run dev` (Runs Next.js on port `9002` with Turbopack)
- **Start Genkit Dev UI:** `npm run genkit:dev`
- **Genkit Dev Watch Mode:** `npm run genkit:watch`
- **Type Checking:** `npm run typecheck` (Runs `tsc --noEmit`)
- **Linting:** `npm run lint` (Runs Next.js ESLint checks)
- **Build Production App:** `npm run build`
- **Start Built App:** `npm run start`

---

## 📚 Tech Stack

- **Framework:** Next.js 15.3.3 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 (configured in `tailwind.config.ts`), PostCSS, and Radix UI primitives via `@radix-ui` (shadcn/ui style components in `src/components/ui/`)
- **AI/Backend:** Firebase Genkit (`genkit`), `@genkit-ai/google-genai` using model `googleai/gemini-2.5-flash`
- **Key Dependencies:**
  - `react-hook-form` & `zod` (Form handling and schemas)
  - `lucide-react` (Icon set)
  - `gray-matter` (Parsing frontmatter in recipes)
  - `pluralize` (Pluralization/singularization for shopping list consolidation)

---

## 📁 Repository Structure

- `src/recipes/`: Raw recipes saved as `.md` files.
- `src/lib/`: Library code and core business logic.
  - `recipes.ts`: Logic for retrieving, sorting, and parsing markdown recipe files.
  - `shopping-list.ts`: Logic for parsing ingredients and generating consolidated shopping lists.
- `src/app/`: Next.js routing and page layouts.
  - `page.tsx`: Homepage with search, filters, and shopping list generator.
  - `recipes/[slug]/page.tsx`: Individual recipe details with metadata and hands-free mode.
- `src/components/`: Reusable React components.
  - `ui/`: shadcn/ui components (Badges, Buttons, Dialogs, etc.).
  - `shopping-list/`: Components for selecting recipes and exporting/printing consolidated lists.
  - `hands-free-mode.tsx`: Guided overlay for cooking instructions step-by-step.
- `src/ai/`: Genkit configuration and development flows.

---

## ✍️ Coding Guidelines & Rules

### 1. Recipe Format & Frontmatter
All recipes are stored in `src/recipes/` as Markdown files. They **must** include the following frontmatter fields:
```yaml
---
title: "Recipe Name"
author: "Author Name"
prepTime: "X hours Y minutes"
servings: X
image: "image_url_or_placeholder"
imageHint: "Short visual description of the dish for AI image generation"
tags:
  - "Tag 1"
  - "Tag 2"
---
```
- Each recipe markdown file must contain exactly one `### Ingredients` section and one `### Instructions` section.
- Ingredients must be formatted as a flat bulleted list (`- 1 cup ingredient name`).
- Instructions must be formatted as a numbered list (`1. Do step one`).

### 2. Shopping List Consolidation
- The shopping list parser (`src/lib/shopping-list.ts`) relies on `pluralize` to group ingredients.
- Always use standard measurement units (e.g., `cup`, `tbsp`, `tsp`, `oz`, `lb`, `g`, `kg`, `ml`, `l`, `clove`) in the recipe markdown files so they parse cleanly.

### 3. Component & UI Design
- Prefer functional components with TypeScript typings for props.
- Keep the design aesthetic clean, modern, and readable.
- Utilize the Tailwind config themes (`font-headline` for serif headings and `font-body` for copy).

---

## 🔍 Verification Plan

Before marking tasks complete:
1. Ensure `npm run typecheck` succeeds without errors.
2. Ensure `npm run lint` succeeds.
3. If changing recipe schemas, verify that the shopping list generator continues to group items successfully.
