# Example config for getting ts-curl-impersonate to work in Docker containers

FROM node:22.14.0-alpine3.21 AS base

# 1. Install build tools. Adjust as needed.

RUN npm i -g corepack@latest

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN corepack use pnpm@10.6.5

WORKDIR /app
COPY . .

# =======================================================

FROM base AS build

# 2. Build application.

# =======================================================

FROM node:22.14.0-bookworm-slim AS prod

# 3. Install certificate libraries

RUN apt-get update
RUN apt-get -y install libnss3-dev ca-certificates
RUN update-ca-certificates

# Adjust based on the output of your application in the build step
COPY --from=build /app/out /app
WORKDIR /app

CMD ["node", "dist/index.js"]