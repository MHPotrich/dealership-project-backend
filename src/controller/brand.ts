import type { BunRequest } from "bun";
import { getDatabaseInstance } from "../database";
import { getResponseNotFound } from "../utils";

const BRANDS_DB_TABLE = "brand";

export function getBrands() {
	return Response.json({
		brands: getDatabaseInstance()
			.query(`SELECT * FROM ${BRANDS_DB_TABLE}`)
			.all(),
	});
}

export function getBrand(request: BunRequest) {
	if (!request.params.id) return getResponseNotFound();

	return Response.json(
		getDatabaseInstance()
			.query(`SELECT * FROM ${BRANDS_DB_TABLE} WHERE id = ?`)
			.get(request.params.id)
	);
}

export async function addBrand(request: BunRequest) {
	const REQUEST_BODY = await request.json();

	if (!REQUEST_BODY.name) return getResponseNotFound();

	getDatabaseInstance()
		.query(`INSERT INTO ${BRANDS_DB_TABLE} (name) VALUES (?)`)
		.run(REQUEST_BODY.name);

	return new Response(null, { status: 201 });
}

export async function updateBrand(request: BunRequest) {
	const REQUEST_BODY: { name: string } = await request.json();
	const TARGET_ID = parseInt(request.params.id);

	if (!REQUEST_BODY.name) return getResponseNotFound();

	getDatabaseInstance()
		.query(`UPDATE ${BRANDS_DB_TABLE} SET name = ? WHERE id = ?`)
		.run(REQUEST_BODY.name, TARGET_ID);

	return new Response(null, { status: 201 });
}

export function deleteBrand(request: BunRequest) {
	const TARGET_ID = request.params.id;

	getDatabaseInstance()
		.query(`DELETE FROM ${BRANDS_DB_TABLE} WHERE id = ?`)
		.get(TARGET_ID);

	return new Response(null, { status: 201 });
}
