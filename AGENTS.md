Operational Commands

Install dependencies
  bun install

Start development (API server + Vite simultaneously)
  bun run dev

Start API server only (with hot reload)
  bun run server

Build for production
  bun run build

Lint code
  bun run lint

Preview production build
  bun run preview

Golden Rules

Do's
- Always use bun for package management; never use npm, yarn, or pnpm.
- Store sensitive API keys (ANTHROPIC_API_KEY, GOOGLE_API_KEY) in .env file; never commit them.
- Use inline styles in generated React components; avoid CSS imports and CSS modules.
- Test both Anthropic Claude and Google Gemini providers when modifying server logic.
- Ensure generated components work with react-live runtime rendering (no import statements).

Don'ts
- Do not add TypeScript type annotations to generated component code (plain JavaScript only).
- Do not modify SYSTEM_PROMPT without testing the output format against react-live.
- Do not use CommonJS (require) in server code; use ESM throughout.
- Do not hardcode API keys in server/index.ts; always read from environment.

Project Context

React Component Generator: Generates interactive React components on-demand via AI (Anthropic Claude or Google Gemini). Users enter a prompt, receive code, and see live preview in real-time.

Tech Stack
- Frontend: React 19, TypeScript, Vite, react-live
- Backend: Bun (TypeScript runtime)
- AI Providers: Anthropic API, Google Gemini API
- Build: TypeScript Compiler, Vite
- Tooling: ESLint, concurrently

Standards and References

Code Style
- Use strict TypeScript settings; enable `strict: true` in tsconfig.
- Follow ESLint rules defined in eslintrc; run `bun run lint` before committing.
- Use functional components with hooks (React 19+).
- Prefer inline styles for generated components (no CSS modules or imports).

Git Strategy
- Commit messages in English and Korean (translated in PR descriptions).
- Keep commits focused on a single concern (feature, fix, or chore).
- Write PR titles clearly; reference any related issues.

API Contract

GET /api/config
Returns object with envKeys: { anthropic: boolean, google: boolean }

POST /api/generate
Body: { prompt: string, apiKey?: string, provider?: 'anthropic' | 'google' }
Response: { code: string } or { error: string }

Maintenance Policy

This file documents agent-specific rules derived from the codebase. If you notice contradictions between this file and the actual code, submit feedback or raise an issue. Rules will be updated quarterly or as needed.
