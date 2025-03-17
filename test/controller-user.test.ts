import { test, expect } from "bun:test";
import { getUser, addUser, updateUser, deleteUser } from "../src/controller/user.ts";

test("controller - addUser", async () => {
	let testRequest = new Object();

	testRequest.json = async () => new Promise((resolve, reject) => {
		resolve({
			"first_name": "test",
			"last_name": "test",
			"email": "test@test.com",
			"password": "test123"
		});
	});

	const RESPONSE = await addUser(testRequest);
	
	expect(RESPONSE.status).toBe(201);
});

test("controller - getUser", async () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;
	testRequest.url = "http://localhost/user?password=test123";

	const RESPONSE = await getUser(testRequest);

	expect(await RESPONSE.json()).toHaveProperty("first_name");
	expect(await RESPONSE.json()).toHaveProperty("last_name");
	expect(await RESPONSE.json()).toHaveProperty("email");
});

test("controller - updateUser", async () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;
	testRequest.json = async () => new Promise((resolve, reject) => {
		resolve({
			"first_name": "test updated",
			"last_name": "test updated",
			"email": "testUpdated@test.com"
		});
	});

	const RESPONSE = await updateUser(testRequest);

	expect(RESPONSE.status).toBe(201);
});

test("controller - deleteUser", () => {
	let testRequest = new Object();

	testRequest.params = new Object();
	testRequest.params.id = 1;

	const RESPONSE = deleteUser(testRequest);

	expect(RESPONSE.status).toBe(201);
});
