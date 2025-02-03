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

Use [Sherif](https://github.com/QuiiBz/sherif) in CI to lint monorepos and ensure package versions are synced.

Stories in packages/ui and Storybook app in apps/storybook-ui https://turbo.build/repo/docs/guides/tools/storybook#more-tips

TS Configs for react-app and react-library should both inherit from base, figure out correct props for each 