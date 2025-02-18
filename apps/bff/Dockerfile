# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy root package.json and pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy the BFF package and any shared packages it depends on
COPY apps/bff ./apps/bff
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the BFF
RUN pnpm --filter @monostarter/bff build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy built files and dependencies from builder
COPY --from=builder /app/apps/bff/dist ./apps/bff/dist
COPY --from=builder /app/apps/bff/package.json ./apps/bff/package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

# Set production environment
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "--filter", "@monostarter/bff", "start"]
