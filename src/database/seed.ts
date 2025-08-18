// import { reset, seed } from "drizzle-seed";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { hash } from "argon2";

import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";

// await reset(db, { courses, enrollments, users });

async function seed() {
	const passwordHash = await hash("123456");

	const usersInsert = await db
		.insert(users)
		.values([
			{
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: passwordHash,
				role: "student",
			},
			{
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: passwordHash,
				role: "student",
			},
			{
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: passwordHash,
				role: "student",
			},
		])
		.returning();

	const coursesInsert = await db
		.insert(courses)
		.values([{ title: faker.lorem.words(4) }, { title: faker.lorem.words(4) }])
		.returning();

	await db.insert(enrollments).values([
		{ courseId: coursesInsert[0].id, userId: usersInsert[0].id },
		{ courseId: coursesInsert[0].id, userId: usersInsert[1].id },
		{ courseId: coursesInsert[1].id, userId: usersInsert[2].id },
	]);
}

seed();

// await seed(db, { courses, enrollments, users }).refine((f) => {
// 	return {
// 		users: {
// 			count: 20,
// 			columns: {
// 				name: f.fullName(),
// 				email: f.email(),
// 			},
// 		},
// 		courses: {
// 			count: 20,
// 			columns: {
// 				title: f.loremIpsum({ sentencesCount: 4 }),
// 			},
// 			with: {
// 				enrollments: 5,
// 			},
// 		},
// 	};
// });

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log("Database seeded");
