import type { BunRequest } from "bun";
import { getDatabaseInstance } from "../database";
import { getResponseNotFound } from "../utils";

const CARS_DB_TABLE = "car";

function getQueryNumber(url: URL, target: string): number {
	let value: string | null = url.searchParams.get(target);

	if (value) return parseInt(value);

	return 0;
}

export function getCars(request: BunRequest) {
	const THIS_URL = new URL(request.url);
	const LIMIT: number = getQueryNumber(THIS_URL, "limit");
	const OFFSET: number = getQueryNumber(THIS_URL, "offset");
	let dbQuery = `SELECT * FROM ${CARS_DB_TABLE}`;

	if (LIMIT > 0 && OFFSET > 0) {
		dbQuery += ` LIMIT ${LIMIT} OFFSET ${OFFSET}`;
	}

	return Response.json({
		cars: getDatabaseInstance().query(dbQuery).all(),
	});
}

export function getCar(request: BunRequest) {
	if (!request.params.id) return getResponseNotFound();

	return Response.json(
		getDatabaseInstance()
			.query(`SELECT * FROM ${CARS_DB_TABLE} WHERE id = ?`)
			.get(request.params.id)
	);
}

export async function addCar(request: BunRequest) {
	const REQUEST_BODY = await request.json();

	if (
		REQUEST_BODY.list_price === null ||
		REQUEST_BODY.sale_price === null ||
		REQUEST_BODY.in_stock === null ||
		REQUEST_BODY.model === null ||
		REQUEST_BODY.travelled_distance === null ||
		REQUEST_BODY.exterior_color === null ||
		REQUEST_BODY.interior_color === null
	)
		return getResponseNotFound();

	getDatabaseInstance()
		.query(
			`INSERT INTO ${CARS_DB_TABLE} (list_price, sale_price, in_stock, model, travelled_distance, exterior_color, interior_color) VALUES (?, ?, ?, ?, ?, ?, ?)`
		)
		.run(
			REQUEST_BODY.list_price,
			REQUEST_BODY.sale_price,
			REQUEST_BODY.in_stock,
			REQUEST_BODY.model,
			REQUEST_BODY.travelled_distance,
			REQUEST_BODY.exterior_color,
			REQUEST_BODY.interior_color
		);

	return new Response(null, { status: 201 });
}

export async function updateCar(request: BunRequest) {
	const REQUEST_BODY: object = await request.json();
	const TARGET_ID = parseInt(request.params.id);
	const DATABASE_INSTANCE = getDatabaseInstance();

	for (const [key, value] of Object.entries(REQUEST_BODY)) {
		if (key !== "id") {
			DATABASE_INSTANCE.query(
				`UPDATE ${CARS_DB_TABLE} SET ${key} = ? WHERE id = ?`
			).run(value, TARGET_ID);
		}
	}

	return new Response(null, { status: 201 });
}

export function deleteCar(request: BunRequest) {
	const TARGET_ID = request.params.id;

	getDatabaseInstance()
		.query(`DELETE FROM ${CARS_DB_TABLE} WHERE id = ?`)
		.get(TARGET_ID);

	return new Response(null, { status: 201 });
}
