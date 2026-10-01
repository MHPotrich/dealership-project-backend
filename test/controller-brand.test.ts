import { test, expect } from "bun:test";
import { getBrands, getBrand, addBrand, updateBrand, deleteBrand } from "../src/controller/brand.ts";

const brandNameTest = "test-brand";

test("controller brand - getBrands", async () => {
	const response: Response = await getBrands().json();

	expect(response).toHaveProperty("brands");
});

test("controller brand - addBrand", async () => {
  let testRequest = {
    json: async () => new Promise((resolve, reject) => {
  		resolve({
  			name: brandNameTest
  		});
  	})
	};
	const response: Response = await addBrand(testRequest);

	expect(response.status).toBe(201);
});

test("controller brand - getBrand", async () => {
	const testRequest = { params: { id: 1 } };
	const response: Response = await getBrand(testRequest).json();

	expect(response).toHaveProperty("id");
	expect(response).toHaveProperty("name");
});

test("controller brand - updateBrand", async () => {
  let testRequest = {
    params: { id: 1 },
    json: async () => new Promise((resolve, reject) => {
  		resolve({
  			name: "test update"
  		});
  	})
	};
	const response = await updateBrand(testRequest);

	expect(response.status).toBe(201);
});

test("controller brand - deleteBrand", async () => {
  const testRequest = { params: { id: 1 } };
	const response = deleteBrand(testRequest);

	expect(response.status).toBe(201);
});
