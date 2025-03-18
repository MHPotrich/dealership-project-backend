import { test, expect } from "bun:test";
import { getCars, getCar, addCar, updateCar, deleteCar } from "../src/controller/car";  

test("controller - getCars", async () => {
	const responseModels = await getCars().json();
	
	expect(responseModels).toHaveProperty("cars");
});

test("controller - getCar", async () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;

	const RESPONSE = await getCar(testRequest);

	expect(await RESPONSE.json()).toHaveProperty("list_price");
	expect(await RESPONSE.json()).toHaveProperty("sale_price");
	expect(await RESPONSE.json()).toHaveProperty("in_stock");
	expect(await RESPONSE.json()).toHaveProperty("model");
	expect(await RESPONSE.json()).toHaveProperty("travelled_distance");
	expect(await RESPONSE.json()).toHaveProperty("exterior_color");
	expect(await RESPONSE.json()).toHaveProperty("interior_color");
});

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

	const RESPONSE = async addCar(testRequest);

	expect(RESPONSE.status).toBe(201);
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
