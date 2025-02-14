## Setup

Ensure Node.js 22 or greater (recommend using asdf for version management)
`npm i -g pnpm`
`pnpm install`

## Doing stuff

Installing a new packages in a workspace (package or app). To install a root package, use the `-w` flag instead of a filter.

```bash
pnpm install -D eslint-plugin-prettier --filter=@repo/eslint-config
```

This project uses Biome instead of ESLint and Prettier. Here's Biome's [list of rules](https://biomejs.dev/linter/rules/) and how to [configure them](https://biomejs.dev/linter/#configuration). Apps and projects can add their own `biome.json` if necessary.

# TODO

Node server breakdown
/packages/db - creates db client / connection pool, stores migration files
/packages/api - depends on db, sets up TRPC router, exports Router type
/apps/web - depends on api, imports Router type, uses it in TRPC client
/apps/server - depends on api, mounts TRPC api at a route
/apps/migrator - depends on db, runs migrations

Use [Sherif](https://github.com/QuiiBz/sherif) in CI to lint monorepos and ensure package versions are synced.

Stories in packages/ui and Storybook app in apps/storybook-ui https://turbo.build/repo/docs/guides/tools/storybook#more-tips

Node app

## Later speed improvements

1. TSConfig "incremental" and "composite"
2. Tsup instead of tsc

## Pushing static builds

Deploys to S3 plus Cloudfront.
Invalidates cache on index.html so the new app version is served whenever the page reloads.
Chunks of code have hashed names, so new build chunks and old build chunks won't collide.
User on an old build can still navigate to new chunks and be fine.
Should expire and remove old builds after a safe threshold (a week or so) to save space.

## SSR + RSC

Doesn't really make sense for highly interactive, data intensive dashboards.
Very little content is static.
Huge complexity overhead, both in deployment, build, code organization, and cognitive load.
Makes testing, Storybook, reusability harder.
Next and Remix servers don't offer full BFF capabilities like being a multi-app API gateway, cache, realtime, DB layer.
Still have plenty of loading times and states, just written differently.
Having a performant API will lead to the same snappy performance, and is a better investment overall.
Server and client components can't share state or render each other in the normal way, will lead to bugs and frustration.
So many gotchas and footguns and random named exports that mean special things (but no autocomplete to tell you)

## Deployment

Turborepo isn't really involved in deployment.
The only thing relevant thing it does is compile the builds.
It is very relevant for CI.
There should be a Github action for linting and testing - these will be very fast b/c unchanged sections will hit the cache.
Can also have a Sherif action.
Is build an action?

Probably a CI check that all the builds actually compile.
Builds can be remotely cached, so the deploy step can reuse.

Deploy step will build again, because the order is important (at least for dev builds).
Deploy Node app, get URL.
Deploy FEs with api URL injected.

AWS CDK should help, also look into constructs (higher level AWS classes that represent blocks of infra).
