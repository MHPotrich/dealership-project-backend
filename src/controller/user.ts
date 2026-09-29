import type { BunRequest } from "bun";
import { getResponseNotFound } from "../utils";
import { User } from "../entity/user";
import { deleteUser as deleteUserRepository, updateUser as updateUserRepository, getUser as getUserRepository, addUser as addUserRepository } from "../repository/user";

export async function addUser(request: BunRequest): Promise<Response> {
  const requestBody: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  } = await request.json();
  let statusCode: number = 201;
  const newUser: User = new User(requestBody.firstName, requestBody.lastName, requestBody.email);

  await newUser.setPassword(requestBody.password);

	if (!newUser.isValid()) return getResponseNotFound();

  const addSuccess: Boolean = addUserRepository(newUser);

  if (!addSuccess) {
    statusCode = 505;
  }

	return new Response(null, { status: statusCode });
}

export async function getUser(request: BunRequest): Promise<Response> {
	const url: URL = new URL(request.url);
	const password: string = url.searchParams.get("password") || "";
  const repositoryUser: User | null = await getUserRepository(password, request.params.id);

  if (repositoryUser !== null) {
    return Response.json({
      firstName: repositoryUser.getFirstName(),
      lastName: repositoryUser.getLastName(),
      email: repositoryUser.getEmail()
    });
  }

	return getResponseNotFound();
}

export async function updateUser(request: BunRequest): Promise<Response> {
	const requestBody: object = await request.json();
	const userId: number = parseInt(request.params.id);
  const updateSuccess: Boolean = updateUserRepository(userId, requestBody);
  let statusCode: number = 201;

  if (!updateSuccess) statusCode = 500;

	return new Response(null, { status: statusCode });
}

export function deleteUser(request: BunRequest): Response {
	const userId: number = parseInt(request.params.id);
  const deleteSuccess: Boolean = deleteUserRepository(userId);
  let statusCode: number = 201;

  if (!deleteSuccess) statusCode = 500;

	return new Response(null, { status: statusCode });
}
