// import { reset, seed } from "drizzle-seed";
import { fakerPT_BR as faker } from "@faker-js/faker";

import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";

// await reset(db, { courses, enrollments, users });

async function seed() {
	const usersInsert = await db
		.insert(users)
		.values([
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
		])
		.returning();

	const coursesInsert = await db
		.insert(courses)
		.values([
			{ title: faker.lorem.words(4) },
			{ title: faker.lorem.words(4) },
			{ title: faker.lorem.words(4) },
			{ title: faker.lorem.words(4) },
			{ title: faker.lorem.words(4) },
			{ title: faker.lorem.words(4) },
			{ title: faker.lorem.words(4) },
			{ title: faker.lorem.words(4) },
			{ title: faker.lorem.words(4) },
			{ title: faker.lorem.words(4) },
		])
		.returning();

	await db.insert(enrollments).values([
		{ courseId: coursesInsert[0].id, userId: usersInsert[0].id },
		{ courseId: coursesInsert[0].id, userId: usersInsert[1].id },
		{ courseId: coursesInsert[1].id, userId: usersInsert[2].id },
		{ courseId: coursesInsert[1].id, userId: usersInsert[3].id },
		{ courseId: coursesInsert[2].id, userId: usersInsert[4].id },
		{ courseId: coursesInsert[2].id, userId: usersInsert[5].id },
		{ courseId: coursesInsert[3].id, userId: usersInsert[6].id },
		{ courseId: coursesInsert[4].id, userId: usersInsert[7].id },
		{ courseId: coursesInsert[5].id, userId: usersInsert[8].id },
		{ courseId: coursesInsert[6].id, userId: usersInsert[9].id },
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
