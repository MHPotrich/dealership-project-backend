import type { BunRequest } from "bun";
import { getDatabaseInstance } from "../database";
import { getResponseNotFound } from "../utils";

const BRANDS_DB_TABLE: string = "brand";

export function getBrands(): Response {
	return Response.json({
		brands: getDatabaseInstance()
			.query(`SELECT * FROM ${BRANDS_DB_TABLE}`)
			.all(),
	});
}

export function getBrand(request: BunRequest): Response {
	const TARGET_ID: number = parseInt(request.params.id);

	return Response.json(
		getDatabaseInstance()
			.query(`SELECT * FROM ${BRANDS_DB_TABLE} WHERE id = ?`)
			.get(TARGET_ID)
	);
}

export async function addBrand(request: BunRequest): Promise<Response> {
	const REQUEST_BODY: { name: string | null } = await request.json();

	if (!REQUEST_BODY.name) return getResponseNotFound();

	getDatabaseInstance()
		.query(`INSERT INTO ${BRANDS_DB_TABLE} (name) VALUES (?)`)
		.run(REQUEST_BODY.name);

	return new Response(null, { status: 201 });
}

export async function updateBrand(request: BunRequest): Promise<Response> {
	const REQUEST_BODY: { name: string } = await request.json();
	const TARGET_ID: number = parseInt(request.params.id);

	if (!REQUEST_BODY.name) return getResponseNotFound();

	getDatabaseInstance()
		.query(`UPDATE ${BRANDS_DB_TABLE} SET name = ? WHERE id = ?`)
		.run(REQUEST_BODY.name, TARGET_ID);

	return new Response(null, { status: 201 });
}

export function deleteBrand(request: BunRequest): Response {
	const TARGET_ID: number = parseInt(request.params.id);

	getDatabaseInstance()
		.query(`DELETE FROM ${BRANDS_DB_TABLE} WHERE id = ?`)
		.get(TARGET_ID);

	return new Response(null, { status: 201 });
}
