import { test, expect } from "bun:test";
import { getResponseNotFound, convertToDatabaseKey } from "../src/utils.ts";

test("util - getResponseNotFound", () => {
	const notFoundResponse: Response = getResponseNotFound();
	expect(notFoundResponse.status).toBe(404);
});

test("util - convertToDatabaseKey", () => {
  const result: string = convertToDatabaseKey("testWorkflow");

	expect(result).toBe("test_workflow");
});
