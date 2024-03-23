FROM node:20-alpine as base

FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY app ./app
COPY next.config.js .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.js .
COPY components.json .
COPY lib ./lib
COPY prisma ./prisma
COPY .next ./next
COPY public ./public

ARG NEXT_PUBLIC_SITE_URL
ARG DATABASE_URL

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm run generateDatabase

RUN npm run build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./next/static

ENV NEXT_TELEMETRY_DISABLED 1

CMD [ "npm", "run", "start" ]