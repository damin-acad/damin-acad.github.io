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
# the Node adapter bundles its own deps into dist/server
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]
