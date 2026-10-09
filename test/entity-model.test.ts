import { test, expect } from "bun:test";
import { Model } from "../src/entity/model";

test("entity model - isValid", () => {
  const model = new Model("test", 1, 2026, "test", "test", "test", "1HGBH41JXMN109186", 4, 5, 1);

  expect(model.isValid()).toBe(true);
});
