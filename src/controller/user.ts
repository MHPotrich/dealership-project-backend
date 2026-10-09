import type { BunRequest } from "bun";
import { getResponseNotFound } from "../utils";
import { User } from "../entity/user";
import { deleteUser as deleteUserRepository, updateUser as updateUserRepository, getUser as getUserRepository, addUser as addUserRepository } from "../repository/user";
import { UserDto } from "../dto/user";

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
    statusCode = 400;
  }

	return new Response(null, { status: statusCode });
}

export async function getUser(request: BunRequest): Promise<Response> {
	const url: URL = new URL(request.url);
	const password: string = url.searchParams.get("password") || "";
  const repositoryUser: User | null | undefined = await getUserRepository(password, request.params.id);

  if (repositoryUser) {
    const userDto = new UserDto(
      repositoryUser.getFirstName(),
      repositoryUser.getLastName(),
      repositoryUser.getEmail(),
      repositoryUser.getId()
    );

    return Response.json(userDto);
  }

	return getResponseNotFound();
}

export async function updateUser(request: BunRequest): Promise<Response> {
	const requestBody: object = await request.json();
	const userId: number = parseInt(request.params.id);
  const updateSuccess: Boolean = updateUserRepository(userId, requestBody);

  if (updateSuccess) {
    const repositoryUser: User | null | undefined = await getUserRepository(request.params.password, String(userId));

    if (repositoryUser === null) {
      return new Response(null, { status: 500 });
    }

    // wrong password
    if (repositoryUser === undefined) {
      return new Response(null, { status: 401 });
    }

    const userDto = new UserDto(
      repositoryUser.getFirstName(),
      repositoryUser.getLastName(),
      repositoryUser.getEmail(),
      repositoryUser.getId()
    );

    return Response.json(userDto);
  }

	return new Response(null, { status: 400 });
}

export function deleteUser(request: BunRequest): Response {
	const userId: number = parseInt(request.params.id);
  const deleteSuccess: Boolean = deleteUserRepository(userId);
  let statusCode: number = 204;

  if (!deleteSuccess) statusCode = 400;

	return new Response(null, { status: statusCode });
}
