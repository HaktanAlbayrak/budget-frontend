# AI Agent Coding Guidelines for Budget App

## 🎯 Core Architecture & Stack

- **Framework:** Next.js 15+ (Strictly App Router). DO NOT use Pages Router.
- **Compiler:** React 19 + React Compiler is ENABLED. Do NOT use `useMemo`, `useCallback`, or `React.memo` unless explicitly necessary for external library integrations.
- **Styling:** Tailwind CSS v4. Rely on standard utility classes and the new `@theme` CSS directive. Do NOT look for `tailwind.config.js`.
- **Server State / Data Fetching:** `@tanstack/react-query` v5 + `axios`.
- **Client State:** `zustand`.
- **UI Components:** `shadcn/ui` + `lucide-react` for icons.
- **Animations:** `framer-motion`.

## 🏗️ Architectural Rules

1. **Server vs. Client Components:**
   - Default to Server Components (`React Server Components` - RSC).
   - ONLY add `"use client"` when interactivity (hooks, event listeners, TanStack Query hooks, Zustand) is strictly required.
   - Keep `"use client"` components as low in the component tree as possible.

2. **Data Fetching Strategy:**
   - **Marketing/Public Pages:** Use Next.js native `fetch` inside Server Components for SEO and speed.
   - **Dashboard/App:** Use TanStack Query with Axios for infinite scroll, caching, and optimistic updates.

3. **Styling & Design System:**
   - Implement "Glassmorphism" where applicable (using `bg-white/10 backdrop-blur-md` and subtle borders).
   - Ensure full Dark/Light mode support via `next-themes`. Always use Tailwind's `dark:` modifier.

4. **Code Quality:**
   - Write strict TypeScript. No `any` types. Define interfaces for all props and API responses.
   - Keep functions pure and small (Single Responsibility Principle).
   - Use early returns to avoid deep nesting.

5. **Project Structure (Route Groups):**
   - `(marketing)`: Public-facing pages (Landing page).
   - `(auth)`: Login and registration.
   - `(dashboard)`: Protected app pages (Transactions, Planned Payments).

## 🚀 Execution

When generating code, always prioritize modern, clean, and performant React 19 patterns. If a feature can be done natively in CSS (Tailwind) rather than JS, choose CSS. Follow these rules implicitly in all responses.
