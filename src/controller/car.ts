import type { BunRequest } from "bun";
import { getResponseNotFound } from "../utils";
import { deleteCar as deleteCarRepository, updateCar as updateCarRepository, addCar as addCarRepository, getCar as getCarRepository, getCars as getCarsRepository } from "../repository/car";
import { Car } from "../entity/car";

function getQueryNumber(url: URL, target: string): number {
	let value: string | null = url.searchParams.get(target);

	if (value) return parseInt(value);

	return 0;
}

export function getCars(request: BunRequest): Response {
	const thisUrl: URL = new URL(request.url);
	const limit: number = getQueryNumber(thisUrl, "limit");
	const offset: number = getQueryNumber(thisUrl, "offset");

  const cars: Car[] = getCarsRepository(limit, offset);

	return Response.json({ cars });
}

export function getCar(request: BunRequest): Response {
  const carId: number = parseInt(request.params.id);
  const car: Car | null = getCarRepository(carId);

  if (car != null) {
    return Response.json(car);
  }

	return getResponseNotFound();
}

export async function addCar(request: BunRequest): Promise<Response> {
	const requestBody: {
		listPrice: number;
		salePrice: number;
		inStock: boolean;
		model: number;
		travelledDistance: number;
		exteriorColor: string;
		interiorColor: string;
	} = await request.json();
  const car: Car = new Car(requestBody.listPrice, requestBody.salePrice, requestBody.inStock, requestBody.model, requestBody.travelledDistance, requestBody.exteriorColor, requestBody.interiorColor);
  let statusCode: number = 201;

	if (!car.isValid())
		return getResponseNotFound();

  const addSuccess: Boolean = addCarRepository(car);

  if (!addSuccess) {
    statusCode = 505;
  }

	return new Response(null, { status: statusCode });
}

export async function updateCar(request: BunRequest): Promise<Response> {
	const requestBody: object = await request.json();
	const carId: number = parseInt(request.params.id);
  const updateSuccess: Boolean = updateCarRepository(carId, requestBody);
  let statusCode: number = 201;

  if (!updateSuccess) {
    statusCode = 505;
  }

	return new Response(null, { status: statusCode });
}

export function deleteCar(request: BunRequest): Response {
	const carId: number = parseInt(request.params.id);
  const deleteSuccess: boolean = deleteCarRepository(carId);
  let statusCode = 201;

  if (!deleteSuccess) {
    statusCode = 505;
  }

	return new Response(null, { status: 201 });
}
