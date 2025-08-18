/** biome-ignore-all lint/correctness/noUnusedImports: It's a declaration file */
import fastify from "fastify";

declare module "fastify" {
	export interface FastifyRequest {
		user?: {
			sub: string;
			role: "student" | "manager";
		};
	}
}
