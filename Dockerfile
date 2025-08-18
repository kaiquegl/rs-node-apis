FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . ./

RUN pnpm install --frozen-lockfile

EXPOSE 3333

CMD ["node", "src/server.ts"]
