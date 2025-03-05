import { getDatabaseInstance } from "../database";

const CARS_DB_TABLE = "car";

export function getCars(request) {
	const LIMIT = request.query.limit || 0;
	const OFFSET = request.query.offset || 0;
	let dbQuery = `SELECT * FROM ${CARS_DB_TABLE}`;

	if (LIMIT > 0 && OFFSET > 0) {
		dbQuery += ` LIMIT ${LIMIT} OFFSET ${OFFSET}`;
	}

	return Response.json({
		cars: getDatabaseInstance().query(dbQuery).all(),
	});
}

export function getCar() {}

export function addCar() {
	const NEW_CAR = {};
}

export function updateCar() {}

export function deleteCar() {}
