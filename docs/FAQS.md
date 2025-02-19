### How do I install a new package in a workspace? NB: Filter should be `@repo` + the workspace name in `package.json`.

```bash
pnpm install -D vitest --filter=@repo/user
```

### How do I install a new package at the root? NB: Be very judicious when adding root dependencies.

```bash
pnpm install -w typescript
```

### Where are packages installed?

Each workspace has its own `node_modules` folder. Root packages are installed to the monorepo's `node_modules` folder.

### What do the turbo commands do in the root package.json scripts?

The `turbo run dev` command will run the `dev` script in each workspace's `package.json` in parallel (if they have it). The `turbo run` commands will only work if a corresponding command is defined in the `turbo.json` file.

### What's the difference between packages and apps?

Apps are deployable (React app, Node server, etc.). Packages are shared code (consumed by apps or other packages).

### Why is there an api and db package?

The user app uses the api types, and the node server mounts the actual API, so it's shared code. The db package is used by the api package.