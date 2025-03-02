Simpler setup:
apps/bff has all the api and db stuff
apps/bff exports the app router type
packages/api-types imports and re-exports the app router type
apps/user imports from packages
need to verify that turborepo catches the changes
but probably don't need to add a devDependency

# Priority
- packages/db
- ENVs
- AWS CDK
- CSS
- Storybook
- Remote cache

# TODO

DB package should expose createDbPool with a connection string arg.
BFF should create a pool and put it in TRPC context.
API package should use db.context rather than accessing db package directly.
BFF should kill pool on restarts.

QueryParams hook.
Query params schema in route config.

Stories in packages/ui and Storybook app in apps/storybook-ui https://turbo.build/repo/docs/guides/tools/storybook#more-tips

https://turbo.build/repo/docs/guides/generating-code

find unused code -https://knip.dev/

commit hooks - https://github.com/evilmartians/lefthook

commit lint - https://github.com/conventional-changelog/commitlint

setup eslint
- prevent import of react router link
- prevent passing string to the to prop

## Later speed improvements

1. TSConfig "incremental" and "composite"
2. Tsup instead of tsc?

## Pushing static builds

Deploys to S3 plus Cloudfront.
Invalidates cache on index.html so the new app version is served whenever the page reloads.
Chunks of code have hashed names, so new build chunks and old build chunks won't collide.
User on an old build can still navigate to new chunks and be fine.
Should expire and remove old builds after a safe threshold (a week or so) to save space.

AWS CDK should help, also look into constructs (higher level AWS classes that represent blocks of infra)

