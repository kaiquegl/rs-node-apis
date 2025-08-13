### Desafio API Node.js (Rocketseat)

API REST construída com Node.js, Fastify, TypeScript, Drizzle ORM e PostgreSQL.

### Tecnologias
- **Node.js 22** (ESM)
- **Fastify 5** + **Zod** (validação e tipagem de rotas)
- **Drizzle ORM** (migrations e queries)
- **PostgreSQL 17** (Docker)
- **Swagger/OpenAPI** + Scalar API Reference (documentação em desenvolvimento)
- **Biome** e **Ultracite** (formatação e lint)

## Pré-requisitos
- Node.js 22.x (recomendado 22.18+). Caso não esteja em LTS, veja `--experimental-strip-types`: `https://nodejs.org/pt/learn/typescript/run-natively`
- PNPM instalado
- Docker e Docker Compose

## Começando
1) Instale dependências
```bash
pnpm install
```

2) Suba o banco com Docker
```bash
docker compose up -d
```

3) Crie o arquivo `.env` na raiz
```bash
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/desafio
```

4) Gere e aplique as migrations do Drizzle
```bash
pnpm db:generate
pnpm db:migrate
```

5) Rode o servidor
```bash
pnpm dev
```

Servidor em: `http://localhost:3333`

## Documentação da API
Em modo `development`, a documentação interativa fica disponível em:
- `http://localhost:3333/docs`

## Fluxo da Aplicação

```mermaid
flowchart TD
  A["Cliente"] -->|HTTP| B["Fastify (Server)"]
  B --> C{"Zod validação"}
  C -- inválido --> H["400/422 (Erro de validação)"]
  C -- ok --> D["Rota / Controller"]
  D --> E["Drizzle ORM"]
  E --> F["PostgreSQL"]
  F --> E
  E --> G["Resposta 200/201/404"]
  G --> I["Cliente"]
  H --> I
  B -. dev .-> J["Swagger + Scalar (/docs)"]
```

## Scripts
Disponíveis em `package.json`:
- `pnpm dev`: inicia o servidor com watch e carrega variáveis do `.env`
- `pnpm db:generate`: gera migrations do Drizzle
- `pnpm db:migrate`: aplica migrations
- `pnpm db:studio`: abre o Drizzle Studio

## Banco de Dados e ORM
- Configuração do Drizzle em `drizzle.config.ts`
- Esquemas em `src/database/schema.ts`
- Conexão em `src/database/client.ts` via `DATABASE_URL`

## Qualidade de Código
- Biome e Ultracite configurados. Comandos úteis:
```bash
npx ultracite lint
npx ultracite format
```

## Dicas de Desenvolvimento
- Logs em modo pretty via `pino-pretty`
- Tipagem de rotas com `fastify-type-provider-zod` (validator/serializer)
- Use `pnpm db:studio` para inspecionar o banco

## Licença
ISC — veja `package.json`.

## Autor
Kaique Lima
