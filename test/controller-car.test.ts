import { test, expect } from "bun:test";
import { getCars, getCar, addCar, updateCar, deleteCar } from "../src/controller/car";

test("controller - addCar", async () => {
	let testRequest = new Object();

	testRequest.json = async () => new Promise((resolve, reject) => {
		resolve({
			"list_price": 99000,
			"sale_price": 98000,
			"in_stock": true,
			"model": "test",
			"travelled_distance": 5000,
			"exterior_color": "test",
			"interior_color": "test",
		});
	});

	const RESPONSE = await addCar(testRequest);

	expect(RESPONSE.status).toBe(201);
});

test("controller - getCars", async () => {
  const limit = 1;
  const offset = 0;

  const responseModels = await getCars({
    url: `http://localhost/cars?limit=${{ limit }}&offset=${{offset}}`
	}).json();

	expect(responseModels).toHaveProperty("cars");
});

test("controller - getCar", async () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;

  const RESPONSE = await getCar(testRequest);
  const jsonResponse = await RESPONSE.json();

	expect(jsonResponse).toHaveProperty("list_price");
	expect(jsonResponse).toHaveProperty("sale_price");
	expect(jsonResponse).toHaveProperty("in_stock");
	expect(jsonResponse).toHaveProperty("model");
	expect(jsonResponse).toHaveProperty("travelled_distance");
	expect(jsonResponse).toHaveProperty("exterior_color");
	expect(jsonResponse).toHaveProperty("interior_color");
});

test("controller - updateCar", async () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;

	testRequest.json = async () => new Promise((resolve, reject) => {
		resolve({
			"travelled_distance": 6400,
		});
	});


	const RESPONSE = await updateCar(testRequest);

	expect(RESPONSE.status).toBe(201);
});

test("controller - deleteCar", async () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;

	const RESPONSE = await deleteCar(testRequest);

	expect(RESPONSE.status).toBe(201);
});
