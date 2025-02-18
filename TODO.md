# Priority
- packages/db
- ENVs
- AWS CDK
- CSS
- Storybook
- Remote cache

# TODO

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

