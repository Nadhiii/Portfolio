## The site

mahanadhi.space is the "river" redesign: Vite 7 + React 19, plain CSS, no router, nine stops in
`src/panels/`, navigation in `src/components/River.jsx`. See README.md for how it runs and is hosted.

House rules for changes:
- No em dashes anywhere (copy, comments, commit messages).
- Keep private things private: no colleague names, work emails, sheet IDs or internal URLs. Keep the
  Nandini POS copy vague (no location, family, pricing, features or tech details).
- `public/update.json` must stay at that path; the Nexus Android app fetches it.
- Keep the GTM event names in `src/utils/analytics.js` and the components; the live container depends on them.
- Keep the credit that the site was built with Claude (mostly) and Gemini (sometimes).

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
