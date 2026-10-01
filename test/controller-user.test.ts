import { test, expect } from "bun:test";
import { getUser, addUser, updateUser, deleteUser } from "../src/controller/user.ts";

test("controller user - addUser", async () => {
  const testRequest = {
    json: async () => new Promise((resolve, reject) => {
      resolve({
        "firstName": "test",
        "lastName": "test",
        "email": "test@test.com",
        "password": "test123"
      });
    })
  };
  const response = await addUser(testRequest);

  expect(response.status).toBe(201);
});

test("controller user - getUser", async () => {
  const testRequest = {
    params: { id: 1 },
    url: "http://localhost/user?password=test123"
  };
  const response = await getUser(testRequest);
  const jsonResponse = await response.json();

  expect(jsonResponse).toHaveProperty("firstName");
  expect(jsonResponse).toHaveProperty("lastName");
  expect(jsonResponse).toHaveProperty("email");
});

test("controller user - updateUser", async () => {
  const testRequest = {
    params: { id: 1 },
    json: async () => new Promise((resolve, reject) => {
      resolve({
        "firstName": "test updated",
        "lastName": "test updated",
        "email": "testUpdated@test.com"
      });
    })
  };
  const response = await updateUser(testRequest);

  expect(response.status).toBe(201);
});

test("controller user - deleteUser", () => {
  const testRequest = { params: { id: 1 } };
  const response = deleteUser(testRequest);

  expect(response.status).toBe(201);
});
