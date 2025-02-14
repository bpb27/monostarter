## Usiung this package in an app

1. Add "@radix-ui/themes": "^3.2.0" and "@repo/ui": "workspace:*" to the app's package dependencies and run `pnpm install` from the root of the monorepo
2. Add `import "@radix-ui/themes/styles.css";` to your app, likely in main.tsx.
3. Add `import { Theme } from "@radix-ui/themes";` (also likely in main.tsx) and add to the component tree.

## TODO

Is it possible to fully bundle and export CSS?