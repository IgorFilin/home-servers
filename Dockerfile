FROM node:20-alpine AS build

ARG SERVICE_NAME=gateway 

WORKDIR /app

RUN npm add --global nx

COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

RUN npm i

COPY . .

RUN nx build $SERVICE_NAME --prod

FROM node:20-alpine AS runner

RUN adduser -S nest && addgroup -S nest

WORKDIR /app

COPY package*.json ./

RUN npm i && chown -R nest:nest .

COPY --chown=nest:nest --from=build /app/dist ./dist

COPY --chown=nest:nest .env /app/dist/apps/home-servers/.env

USER nest

RUN ls -la ./dist/apps

CMD ["node", "dist/apps/home-servers/main.js"]