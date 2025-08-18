import type { FastifyReply, FastifyRequest } from "fastify";
import { getAuthenticatedUserFromRequest } from "../../utils/get-authenticated-user-from-request.ts";

export function checkUserRole(role: "student" | "manager") {
	return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
		const user = getAuthenticatedUserFromRequest(request);

		if (user.role !== role) {
			reply.status(401).send();
		}

		done();
	};
}
