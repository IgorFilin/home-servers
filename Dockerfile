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

ARG SERVICE_NAME=gateway 
ENV SERVICE_NAME=$SERVICE_NAME

RUN adduser -S nest && addgroup -S nest

WORKDIR /app

COPY package*.json ./

RUN npm i && chown -R nest:nest .

COPY --chown=nest:nest --from=build /app/dist ./dist

USER nest

CMD node dist/apps/$SERVICE_NAME/main.js
