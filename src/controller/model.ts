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

	if (
		REQUEST_BODY.name === null ||
		REQUEST_BODY.brand === null ||
		REQUEST_BODY.year === null ||
		REQUEST_BODY.transmission === null ||
		REQUEST_BODY.drivetrain === null ||
		REQUEST_BODY.engine === null ||
		REQUEST_BODY.vin === null ||
		REQUEST_BODY.doors === null ||
		REQUEST_BODY.seating === null ||
		REQUEST_BODY.horse_power === null
	)
		return getResponseNotFound();

	getDatabaseInstance()
		.query(
			`INSERT INTO ${MODELS_DB_TABLE} (name, brand, year, transmission, drivetrain, engine, vin, doors, seating, horse_power) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		)
		.run(
			REQUEST_BODY.name,
			REQUEST_BODY.brand,
			REQUEST_BODY.year,
			REQUEST_BODY.transmission,
			REQUEST_BODY.drivetrain,
			REQUEST_BODY.engine,
			REQUEST_BODY.vin,
			REQUEST_BODY.doors,
			REQUEST_BODY.seating,
			REQUEST_BODY.horse_power
		);

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
