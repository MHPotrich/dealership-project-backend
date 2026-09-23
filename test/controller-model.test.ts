import { test, expect } from "bun:test";
import { getModels, getModel, addModel, updateModel, deleteModel } from "../src/controller/model";

test("controller - addModel", async () => {
  let testRequest = new Object();

	testRequest.json = async () => new Promise((resolve, reject) => {
		resolve({
      "name": "test",
      "brand": 1,
      "year": 2025,
      "transmission": "test",
      "drivetrain": "test",
      "engine": "test",
      "vin": "vin",
      "doors": 2,
      "seating": 2,
      "horse_power": 1
    });
	});

	const RESPONSE = await addModel(testRequest);

	expect(RESPONSE.status).toBe(201);
});

test("controller - getModels", async () => {
	const responseModels = await getModels().json();

	expect(responseModels).toHaveProperty("models");
});

test("controller - getModel", async () => {
  const testRequest = {
    params: {
      id: 1
    }
	};

  const RESPONSE = getModel(testRequest);
  const jsonResponse = await RESPONSE.json();

	expect(jsonResponse).toHaveProperty("name");
	expect(jsonResponse).toHaveProperty("brand");
	expect(jsonResponse).toHaveProperty("year");
	expect(jsonResponse).toHaveProperty("transmission");
	expect(jsonResponse).toHaveProperty("drivetrain");
	expect(jsonResponse).toHaveProperty("engine");
	expect(jsonResponse).toHaveProperty("vin");
	expect(jsonResponse).toHaveProperty("doors");
	expect(jsonResponse).toHaveProperty("seating");
	expect(jsonResponse).toHaveProperty("horse_power");
});

test("controller - updateModel", async () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;

	testRequest.json = async () => new Promise((resolve, reject) => {
		resolve({
			"year": 2023,
		});
	});


	const RESPONSE = await updateModel(testRequest);

	expect(RESPONSE.status).toBe(201);
});

test("controller - deleteModel", async () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;

	const RESPONSE = await deleteModel(testRequest);

	expect(RESPONSE.status).toBe(201);
});
