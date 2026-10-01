import { test, expect } from "bun:test";
import { getCars, getCar, addCar, updateCar, deleteCar } from "../src/controller/car";

test("controller car - addCar", async () => {
  const testRequest = {
    json: async () => new Promise((resolve, reject) => {
  		resolve({
  			"listPrice": 99000,
  			"salePrice": 98000,
  			"inStock": true,
  			"model": 1,
  			"travelledDistance": 5000,
  			"exteriorColor": "test",
  			"interiorColor": "test",
  		});
  	})
	};

	const response = await addCar(testRequest);

	expect(response.status).toBe(201);
});

test("controller car - getCars", async () => {
  const limit = 1;
  const offset = 0;

  const responseModels = await getCars({
    url: `http://localhost/cars?limit=${{ limit }}&offset=${{offset}}`
	}).json();

	expect(responseModels).toHaveProperty("cars");
});

test("controller car - getCar", async () => {
  const testRequest = { params: { id: 1 } };
  const response = getCar(testRequest);
  const jsonResponse = await response.json();

  expect(response.status).toBe(200);
	expect(jsonResponse).toHaveProperty("listPrice");
	expect(jsonResponse).toHaveProperty("salePrice");
	expect(jsonResponse).toHaveProperty("inStock");
	expect(jsonResponse).toHaveProperty("model");
	expect(jsonResponse).toHaveProperty("travelledDistance");
	expect(jsonResponse).toHaveProperty("exteriorColor");
	expect(jsonResponse).toHaveProperty("interiorColor");
});

test("controller car - updateCar", async () => {
  const testRequest = {
    params: { id: 1 },
    json: async () => new Promise((resolve, reject) => {
  		resolve({
  			"travelledDistance": 6400,
  		});
  	})
	};
	const response = await updateCar(testRequest);

	expect(response.status).toBe(201);
});

test("controller car - deleteCar", async () => {
  const testRequest = { params: { id: 1 } };
	const response = deleteCar(testRequest);

	expect(response.status).toBe(201);
});
