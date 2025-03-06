import type { BunRequest } from "bun";
import { getDatabaseInstance } from "../database";
import { getResponseNotFound } from "../utils";

const USERS_DB_TABLE = "user";

export function getUser(request: BunRequest) {
	if (!request.params.id) return getResponseNotFound();

	return Response.json(
		getDatabaseInstance()
			.query(`SELECT * FROM ${USERS_DB_TABLE} WHERE id = ?`)
			.get(request.params.id)
	);
}

export async function addUser(request: BunRequest) {
	const REQUEST_BODY = await request.json();

	if (
		(REQUEST_BODY.first_name === null || REQUEST_BODY.last_name === null,
		REQUEST_BODY.email === null || REQUEST_BODY.password === null)
	)
		return getResponseNotFound();

	getDatabaseInstance()
		.query(
			`INSERT INTO ${USERS_DB_TABLE} (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`
		)
		.run(
			REQUEST_BODY.first_name,
			REQUEST_BODY.last_name,
			REQUEST_BODY.email,
			REQUEST_BODY.password
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
