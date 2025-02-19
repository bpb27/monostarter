
TurboRepo is the best tool available for managing a TS monorepo. It's been adopted by Vercel and it's built on the standard workspace functionality of package managers. It helps force you into distinct module/service and app boundaries, which is hugely beneficial in the long run (avoid the monolith monster). It also allows you to share code without needing separate repos or publishing packages (e.g. types, API clients, component libraries). It makes CI extremely fast by recognizing what work needs to be performed based on the actual code changes.

Vite + React Router 7 (library version) + client only FE is great. The NextJS and Remix push to move rendering server side is still new and changing, but doesn't offer a lot of discernible user value compared to a fast API, client code-splitting, and parallel rendering with outlets. The builds and deployments are super simple (S3 + CloudFront) and fast. And you get to avoid all the cognitive and code complexity introduced by the server/client React divide. If SSR/RSC becomes extremely compelling in the future, it's currently supported by React Router with a few deployment modifications.

A fully featured Node.js server is much more powerful, customizable, and feature-rich than what you get from Next.js. TRPC + Keysley is the ultimate TS DX, with full typesafety from DB queries to API routes to React components.

Biome is like ESLint + Prettier in one tool with super easy configuration and speed (written in Rust). ESLint 9 is wildly different than prior versions, difficult to use, and relatively slow. And Prettier is great but it's not directly integrated with ESLint. Here's Biome's [list of rules](https://biomejs.dev/linter/rules/) and how to [configure them](https://biomejs.dev/linter/#configuration). It's fast enough to run from the root for now, but apps and projects can add their own `biome.json` and integrate into Turbo if necessary.

Smaller decisions:
- Valibot over Zod because it's much more performant and has a smaller footprint
- Radix because that's the standard choice
- Framer Motion? because it's non-invasive animation
- Panda CSS? because it seems cool (maybe not though)