## Setup

Ensure Node.js 22 or greater (recommend using asdf for version management)
`npm i -g pnpm`
`pnpm install`

## Doing stuff

Installing new packages:

```bash
pnpm install -D eslint-plugin-prettier --filter=@repo/eslint-config
```

## Questions

does the root pnpm lockfile have all nested packages?

https://typescript-eslint.io/troubleshooting/typed-linting/monorepos

still need to understand new eslint structure

should these packages be global?

    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "vite": "^6.0.5"

turbo build task

understand turbo file in general
