# From:
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:18-bookworm-slim AS base
RUN apt-get update -y && apt-get install -y openssl

# Dependencies (with Bun to speed thigs up)
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Build
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Overwrite .env.production.local with the correct one
COPY .env .env
COPY .env.production.local .env.production.local
RUN npm run build

# Run
FROM base AS runner
ARG PORT
ARG UID
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# The UID here has to match the "pro1" user at racso.cs.upc.edu!
RUN addgroup --system --gid $UID nodejs
RUN adduser --system --uid $UID nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT=$PORT
EXPOSE $PORT
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]