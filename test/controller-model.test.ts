import { test, expect } from "bun:test";
import { getModels, getModel, addModel, updateModel, deleteModel } from "../src/controller/model";

test("controller model - addModel", async () => {
  const testRequest = {
    json: async () => new Promise((resolve, reject) => {
  		resolve({
          "name": "test",
          "brand": 1,
          "year": 2025,
          "transmission": "test",
          "drivetrain": "test",
          "engine": "test",
          "vin": "1HGBH41JXMN109186",
          "doors": 2,
          "seating": 2,
          "horsePower": 1
        });
  	})
  };
	const response = await addModel(testRequest);

	expect(response.status).toBe(201);
});

test("controller model - getModels", async () => {
	const responseModels = await getModels().json();

	expect(responseModels).toHaveProperty("models");
});

test("controller model - getModel", async () => {
  const testRequest = { params: { id: 1 } };
  const response = getModel(testRequest);
  const jsonResponse = await response.json();

	expect(jsonResponse).toHaveProperty("name");
	expect(jsonResponse).toHaveProperty("brand");
	expect(jsonResponse).toHaveProperty("year");
	expect(jsonResponse).toHaveProperty("transmission");
	expect(jsonResponse).toHaveProperty("drivetrain");
	expect(jsonResponse).toHaveProperty("engine");
	expect(jsonResponse).toHaveProperty("vin");
	expect(jsonResponse).toHaveProperty("doors");
	expect(jsonResponse).toHaveProperty("seating");
	expect(jsonResponse).toHaveProperty("horsePower");
});

test("controller model - updateModel", async () => {
  const testRequest = {
    params: { id: 1 },
    json: async () => new Promise((resolve, reject) => {
  		resolve({
  			"year": 2023,
  		});
  	})
	};
	const response = await updateModel(testRequest);

	expect(response.status).toBe(201);
});

test("controller model - deleteModel", async () => {
  const testRequest = { params: { id: 1 } };
	const response = deleteModel(testRequest);

	expect(response.status).toBe(201);
});
