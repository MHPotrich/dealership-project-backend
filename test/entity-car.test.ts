import { test, expect } from "bun:test";
import { Car } from "../src/entity/car";

test("entity car - isValid", () => {
  const car = new Car(30000, 28000, true, 1, 15000, "Blue", "White");

  expect(car.isValid()).toBe(true);
});
