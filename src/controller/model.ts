import type { BunRequest } from "bun";
import { getDatabaseInstance } from "../database";
import { getResponseNotFound } from "../utils";

const MODELS_DB_TABLE = "model";

export function getModels() {
	return Response.json({
		brands: getDatabaseInstance()
			.query(`SELECT * FROM ${MODELS_DB_TABLE}`)
			.all(),
	});
}

export function getModel(request: BunRequest) {
	if (!request.params.id) return getResponseNotFound();

	return Response.json(
		getDatabaseInstance()
			.query(`SELECT * FROM ${MODELS_DB_TABLE} WHERE id = ?`)
			.get(request.params.id)
	);
}

export async function addModel(request: BunRequest) {
	const REQUEST_BODY = await request.json();

	if (!REQUEST_BODY.name) return getResponseNotFound();

	getDatabaseInstance()
		.query(`INSERT INTO ${MODELS_DB_TABLE} (name) VALUES (?)`)
		.run(REQUEST_BODY.name);

	return new Response(null, { status: 201 });
}

export async function updateModel(request: BunRequest) {
	const REQUEST_BODY: object = await request.json();
	const TARGET_ID = parseInt(request.params.id);
	const DATABASE_INSTANCE = getDatabaseInstance();

	for (const [key, value] of Object.entries(REQUEST_BODY)) {
		DATABASE_INSTANCE.query(
			`UPDATE ${MODELS_DB_TABLE} SET ${key} = ? WHERE id = ?`
		).run(value, TARGET_ID);
	}

	return new Response(null, { status: 201 });
}

export function deleteModel(request: BunRequest) {
	const TARGET_ID = request.params.id;

	getDatabaseInstance()
		.query(`DELETE FROM ${MODELS_DB_TABLE} WHERE id = ?`)
		.get(TARGET_ID);

	return new Response(null, { status: 201 });
}
