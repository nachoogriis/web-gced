FROM oven/bun:1.3-slim AS base
# Use Catalan Debian mirror for faster downloads
#RUN sed -i 's|deb.debian.org|ftp.caliu.cat|g' /etc/apt/sources.list.d/debian.sources && \
#    apt-get update -y && apt-get install -y openssl

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env .env
# Overwrite .env.production.local with the correct one
COPY prod.db prod.db
COPY .env.production.local .env.production.local
RUN bunx prisma generate
RUN bun run build

# Run
FROM base AS runner
ARG PORT
ARG UID
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN mkdir .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV PORT=$PORT
EXPOSE $PORT
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]
