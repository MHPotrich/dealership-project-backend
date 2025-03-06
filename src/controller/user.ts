import type { BunRequest } from "bun";
import { getDatabaseInstance } from "../database";
import { getResponseNotFound } from "../utils";
import { Database } from "bun:sqlite";

const USERS_DB_TABLE: string = "user";

export async function getUser(request: BunRequest): Promise<Response> {
	const THIS_URL: URL = new URL(request.url);
	const PASSWORD: string = THIS_URL.searchParams.get("password") || "";
	const DB_USER: { password: string } | null = getDatabaseInstance()
		.query(`SELECT * FROM ${USERS_DB_TABLE} WHERE id = ?`)
		.get(request.params.id);

	if (DB_USER == null) return getResponseNotFound();

	const IS_PASSWORD_CORRECT: boolean = await Bun.password.verify(
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

export async function addUser(request: BunRequest): Promise<Response> {
	const REQUEST_BODY: {
		first_name: string;
		last_name: string;
		email: string;
		password: string;
	} = await request.json();

	if (
		(REQUEST_BODY.first_name === null || REQUEST_BODY.last_name === null,
		REQUEST_BODY.email === null || REQUEST_BODY.password === null)
	)
		return getResponseNotFound();

	const HASH_PASSWORD: string = await Bun.password.hash(
		REQUEST_BODY.password
	);

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

export async function updateUser(request: BunRequest): Promise<Response> {
	const REQUEST_BODY: object = await request.json();
	const TARGET_ID: number = parseInt(request.params.id);
	const DATABASE_INSTANCE: Database = getDatabaseInstance();

	for (const [key, value] of Object.entries(REQUEST_BODY)) {
		if (key !== "id") {
			DATABASE_INSTANCE.query(
				`UPDATE ${USERS_DB_TABLE} SET ${key} = ? WHERE id = ?`
			).run(value, TARGET_ID);
		}
	}

	return new Response(null, { status: 201 });
}

export function deleteUser(request: BunRequest): Response {
	const TARGET_ID: number = parseInt(request.params.id);

	getDatabaseInstance()
		.query(`DELETE FROM ${USERS_DB_TABLE} WHERE id = ?`)
		.get(TARGET_ID);

	return new Response(null, { status: 201 });
}
