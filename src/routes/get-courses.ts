import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";

import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";

export const getCoursesRoute: FastifyPluginCallbackZod = (server) => {
	server.get(
		"/courses",
		{
			schema: {
				tags: ["courses"],
				summary: "Get all courses",
				response: {
					200: z.object({
						courses: z.array(
							z.object({
								id: z.uuid(),
								title: z.string(),
							})
						),
					}),
				},
			},
		},
		async (_, reply) => {
			const result = await db
				.select({
					id: courses.id,
					title: courses.title,
				})
				.from(courses);

			return reply.send({ courses: result });
		}
	);
};
