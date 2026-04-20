@AGENTS.md

Codebase Structure
- src/: React frontend with component generation UI
- server/: Bun API server (Anthropic & Google Gemini proxy)
- vite.config.ts: Frontend build config
- tsconfig*.json: TypeScript configuration (split for app & build tooling)

Key Files
- server/index.ts: API endpoints and provider integration logic
- src/App.tsx: Main React application
- src/hooks/useComponentGenerator.ts: Hook for component generation logic
- src/components/: UI components (CodeView, LivePreview, PromptInput, ComponentCard)
