import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "staging", "production"]),
	DATABASE_URL: z.url().startsWith("postgresql://"),
});

export const env = envSchema.parse(process.env);
