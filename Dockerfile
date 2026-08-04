FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# prebuild regenerates publications.json and research-map.json from papers.bib
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# The Node adapter leaves its runtime dependencies external: dist/server/entry.mjs
# imports piccolore, cookie, devalue, html-escaper, send, server-destroy,
# unstorage, clsx, zod, @oslojs/encoding and @astrojs/internal-helpers. Copying
# only dist produced ERR_MODULE_NOT_FOUND on boot.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]
