FROM node:lts-alpine AS base

# Dependencies
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
COPY .env .env
# Overwrite .env.production.local with the correct one
COPY prod.db ./prod.db
ENV DATABASE_URL file:/app/prod.db
RUN npx prisma generate
RUN npm run build

# Run
FROM base AS runner
ARG PORT
ARG UID

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR /app

RUN mkdir .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV PORT=$PORT
EXPOSE $PORT
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
