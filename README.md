## About

This is an example/starter for a Typescript monorepo with TurboRepo. Eventually it will contain a user app, admin app, Node.js server, and Storybook, deployable to AWS with GitHub actions for CI/CD.

This is a work in progress.

## Setup

Use Node.js 22 (recommend using [asdf](https://github.com/asdf-vm/asdf) or [mise](https://github.com/jdx/mise) for version management)

```bash
npm i -g pnpm@9.15.4 # if not installed already
pnpm install
pnpm dev
```

## Update all package versions

Be careful with this, assumes a very light app or very good tests.

```bash
pnpm up -r --latest
```