import { test, expect } from "bun:test";
import { getResponseNotFound } from "../src/utils.ts";

test("util - getResponseNotFound", () => {
	const notFoundResponse: Response = getResponseNotFound();
	expect(notFoundResponse.status).toBe(404);
});
