# Priority
- Node server, api, db
- ENVs
- AWS CDK
- CSS
- Storybook
- Remote cache

# TODO

Node server breakdown
/packages/db - creates db client / connection pool, stores migration files
/packages/api - depends on db, sets up TRPC router, exports Router type
/apps/web - depends on api, imports Router type, uses it in TRPC client
/apps/server - depends on api, mounts TRPC api at a route
/apps/migrator - depends on db, runs migrations

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
