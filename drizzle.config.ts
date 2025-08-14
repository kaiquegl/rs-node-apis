import { defineConfig } from "drizzle-kit";

import { env } from "./src/utils/env.ts";

export default defineConfig({
	dialect: "postgresql",
	casing: "snake_case",
	out: "./src/database/migrations",
	schema: "./src/database/schema.ts",
	dbCredentials: { url: env.DATABASE_URL },
});
