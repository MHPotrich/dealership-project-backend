import { test, expect } from "bun:test";
import { getResponseNotFound, convertToDatabaseKey, isPasswordCorrect } from "../src/utils.ts";

test("util - getResponseNotFound", () => {
	const notFoundResponse: Response = getResponseNotFound();
	expect(notFoundResponse.status).toBe(404);
});

test("util - convertToDatabaseKey", () => {
  const result: string = convertToDatabaseKey("testWorkflow");

	expect(result).toBe("test_workflow");
});

test("util - isPasswordCorrect", async () => {
  const hashPassword: string = await Bun.password.hash("testPassword123");

  expect(await isPasswordCorrect("testPassword123", hashPassword)).toBe(true);
	expect(await isPasswordCorrect("testPassword124", hashPassword)).toBe(false);
});
