import { test, expect } from "bun:test";
import { User } from "../src/entity/user";

test("entity user - isValid", async () => {
  const user = new User("test", "test", "test@test.com");

  await user.setPassword("passwordTest123");

  expect(user.isValid()).toBe(true);
});
