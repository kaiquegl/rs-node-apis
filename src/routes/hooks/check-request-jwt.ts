import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

import { env } from "../../utils/env.ts";

type JWTPayload = {
	sub: string;
	role: "student" | "manager";
};

export function checkRequestJWT(request: FastifyRequest, reply: FastifyReply, done: () => void) {
	const token = request.headers.authorization;

	if (!token) {
		reply.status(401).send();
		return done();
	}

	if (!env.JWT_SECRET) {
		throw new Error("JWT_SECRET must be set.");
	}

	try {
		const payload = jwt.verify(token, env.JWT_SECRET) as JWTPayload;

		request.user = payload;
	} catch {
		reply.status(401).send();
	} finally {
		done();
	}
}
