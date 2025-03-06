import type { BunRequest } from "bun";
import { getDatabaseInstance } from "../database";
import { getResponseNotFound } from "../utils";
import { Database } from "bun:sqlite";

const MODELS_DB_TABLE: string = "model";

export function getModels(): Response {
	return Response.json({
		brands: getDatabaseInstance()
			.query(`SELECT * FROM ${MODELS_DB_TABLE}`)
			.all(),
	});
}

export function getModel(request: BunRequest): Response {
	const TARGET_ID: number = parseInt(request.params.id);

	return Response.json(
		getDatabaseInstance()
			.query(`SELECT * FROM ${MODELS_DB_TABLE} WHERE id = ?`)
			.get(TARGET_ID)
	);
}

export async function addModel(request: BunRequest): Promise<Response> {
	const REQUEST_BODY: {
		name: string;
		brand: number;
		year: number;
		transmission: string;
		drivetrain: string;
		engine: string;
		vin: string;
		doors: number;
		seating: number;
		horse_power: number;
	} = await request.json();

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

export async function updateModel(request: BunRequest): Promise<Response> {
	const REQUEST_BODY: object = await request.json();
	const TARGET_ID: number = parseInt(request.params.id);
	const DATABASE_INSTANCE: Database = getDatabaseInstance();

	for (const [key, value] of Object.entries(REQUEST_BODY)) {
		DATABASE_INSTANCE.query(
			`UPDATE ${MODELS_DB_TABLE} SET ${key} = ? WHERE id = ?`
		).run(value, TARGET_ID);
	}

	return new Response(null, { status: 201 });
}

export function deleteModel(request: BunRequest): Response {
	const TARGET_ID: number = parseInt(request.params.id);

	getDatabaseInstance()
		.query(`DELETE FROM ${MODELS_DB_TABLE} WHERE id = ?`)
		.get(TARGET_ID);

	return new Response(null, { status: 201 });
}
