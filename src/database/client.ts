import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "../utils/env.ts";
import { courses, enrollments, users } from "./schema.ts";

export const db = drizzle(env.DATABASE_URL, {
	casing: "snake_case",
	logger: env.NODE_ENV === "development",
	schema: { courses, enrollments, users },
});
