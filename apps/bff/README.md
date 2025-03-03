Might want to include introspection in generate types?

## Rebuilding in dev mode when an external package changes
"dev": "pnpm run dev:build & pnpm run dev:watch",
"dev:build": "tsup --watch",
"dev:watch": "nodemon --watch dist --watch ../../packages/api/dist dist/index.js",

