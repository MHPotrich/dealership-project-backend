import { test, expect } from "bun:test";
import { BunRequest } from "bun";
import { getBrands, getBrand, addBrand, updateBrand, deleteBrand } from "../src/controller/brand.ts";

const BRAND_NAME_TEST = "test-brand";

test("controller - getBrands", async () => {
	const RESPONSE: Response = await getBrands().json();

	expect(RESPONSE).toHaveProperty("brands");
});

test("controller - addBrand", async () => {
	let testRequest = new Object();

	testRequest.json = async () => new Promise((resolve, reject) => {
		resolve({
			name: BRAND_NAME_TEST
		});
	});

	const RESPONSE: Response = await addBrand(testRequest);

	expect(RESPONSE.status).toBe(201);
});

test("controller - getBrand", async () => {
	const TEST_REQUEST = {
		params: {
			id: 1
		}
	};
	const RESPONSE: Response = await getBrand(TEST_REQUEST).json();	

	expect(RESPONSE).toHaveProperty("id");
	expect(RESPONSE).toHaveProperty("name");	
});

test("controller - updateBrand", async () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;
	testRequest.json = async () => new Promise((resolve, reject) => {
		resolve({
			name: "test update"
		});
	});
	
	const RESPONSE = await updateBrand(testRequest);

	expect(RESPONSE.status).toBe(201);
});

test("controller - deleteBrand", async () => {
	const testRequest = new Object();
	
	testRequest.params = new Object();
	testRequest.params.id = 1;

	const RESPONSE = await deleteBrand(testRequest);

	expect(RESPONSE.status).toBe(201);
});
