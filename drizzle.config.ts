import { defineConfig } from "drizzle-kit";

import { env } from "./src/utils/env.ts";

export default defineConfig({
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	out: "./drizzle",
	schema: "./src/database/schema.ts",
});
