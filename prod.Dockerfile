FROM node:bookworm-slim as base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package.json package-lock.json* ./

FROM base as build
RUN bun install

COPY app ./app/
COPY next.config.js .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.js .
COPY components.json .
COPY lib ./lib/
COPY .next ./next/
COPY public ./public/
COPY prisma ./prisma/
RUN bun run build

FROM base AS prod-build

RUN bun install --production
COPY prisma ./prisma/
RUN cp -R node_modules prod_node_modules

FROM base AS prod

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=prod-build /app/prod_node_modules /app/node_modules
RUN chown nextjs:nodejs -R /app/node_modules

USER nextjs

COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public

CMD [ "bun", "run", "start" ]