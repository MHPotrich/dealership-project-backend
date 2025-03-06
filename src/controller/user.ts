import type { BunRequest } from "bun";
import { getDatabaseInstance } from "../database";
import { getResponseNotFound } from "../utils";

const USERS_DB_TABLE = "user";

export async function getUser(request: BunRequest) {
	const THIS_URL = new URL(request.url);
	const PASSWORD: string = THIS_URL.searchParams.get("password") || "";
	const DB_USER: { password: string } | null = getDatabaseInstance()
		.query(`SELECT * FROM ${USERS_DB_TABLE} WHERE id = ?`)
		.get(request.params.id);

	if (DB_USER == null) return getResponseNotFound();

	const IS_PASSWORD_CORRECT = await Bun.password.verify(
		PASSWORD,
		DB_USER.password
	);

	if (IS_PASSWORD_CORRECT)
		return Response.json(
			getDatabaseInstance()
				.query(`SELECT * FROM ${USERS_DB_TABLE} WHERE id = ?`)
				.get(request.params.id)
		);

	return getResponseNotFound();
}

export async function addUser(request: BunRequest) {
	const REQUEST_BODY = await request.json();

	if (
		(REQUEST_BODY.first_name === null || REQUEST_BODY.last_name === null,
		REQUEST_BODY.email === null || REQUEST_BODY.password === null)
	)
		return getResponseNotFound();

	const HASH_PASSWORD = await Bun.password.hash(REQUEST_BODY.password);

	getDatabaseInstance()
		.query(
			`INSERT INTO ${USERS_DB_TABLE} (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`
		)
		.run(
			REQUEST_BODY.first_name,
			REQUEST_BODY.last_name,
			REQUEST_BODY.email,
			HASH_PASSWORD
		);

	return new Response(null, { status: 201 });
}

export async function updateUser(request: BunRequest) {
	const REQUEST_BODY: object = await request.json();
	const TARGET_ID = parseInt(request.params.id);
	const DATABASE_INSTANCE = getDatabaseInstance();

	for (const [key, value] of Object.entries(REQUEST_BODY)) {
		if (key !== "id") {
			DATABASE_INSTANCE.query(
				`UPDATE ${USERS_DB_TABLE} SET ${key} = ? WHERE id = ?`
			).run(value, TARGET_ID);
		}
	}

	return new Response(null, { status: 201 });
}

export function deleteUser(request: BunRequest) {
	const TARGET_ID = request.params.id;

	getDatabaseInstance()
		.query(`DELETE FROM ${USERS_DB_TABLE} WHERE id = ?`)
		.get(TARGET_ID);

	return new Response(null, { status: 201 });
}
