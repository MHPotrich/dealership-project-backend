import { test, expect } from "bun:test";
import { getModels, getModel, addModel, updateModel, deleteModel } from "../src/controller/model";  

test("controller - getModels", async () => {
	const responseModels = await getModels().json();
	
	expect(responseModels).toHaveProperty("models");
});

test("controller - getModel", async () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;

	const RESPONSE = await getModel(testRequest);

	expect(await RESPONSE.json()).toHaveProperty("name");
	expect(await RESPONSE.json()).toHaveProperty("brand");
	expect(await RESPONSE.json()).toHaveProperty("year");
	expect(await RESPONSE.json()).toHaveProperty("transmission");
	expect(await RESPONSE.json()).toHaveProperty("drivetrain");
	expect(await RESPONSE.json()).toHaveProperty("engine");
	expect(await RESPONSE.json()).toHaveProperty("vin");
	expect(await RESPONSE.json()).toHaveProperty("doors");
	expect(await RESPONSE.json()).toHaveProperty("seating");
	expect(await RESPONSE.json()).toHaveProperty("horse_power");
});

test("controller - addModel", async () => {
	let testRequest = new Object();

	testRequest.json({
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

	const RESPONSE = async addModel(testRequest);

	expect(RESPONSE.status).toBe(201);
});

test("controller - updateModel", async () => {
	let testRequest = new Object();
	
	testRequest.params = new Object();
	testRequest.params.id = 1;

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
