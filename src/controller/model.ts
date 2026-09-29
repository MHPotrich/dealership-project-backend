import type { BunRequest } from "bun";
import { getResponseNotFound } from "../utils";
import { deleteModel as deleteModelRepository, updateModel as updateModelRepository, addModel as addModelRepository, getModel as getModelRepository, getModels as getModelsRepository } from "../repository/model";
import { Model } from "../entity/model";

export function getModels(): Response {
  const models = getModelsRepository();

	return Response.json({ models });
}

export function getModel(request: BunRequest): Response {
  const modelId: number = parseInt(request.params.id);
  const model: Model | null = getModelRepository(modelId);

	return Response.json(model);
}

export async function addModel(request: BunRequest): Promise<Response> {
	const requestBody: {
		name: string;
		brand: number;
		year: number;
		transmission: string;
		drivetrain: string;
		engine: string;
		vin: string;
		doors: number;
		seating: number;
		horsePower: number;
  } = await request.json();
  const model: Model = new Model(requestBody.name, requestBody.brand, requestBody.year, requestBody.transmission, requestBody.drivetrain, requestBody.engine, requestBody.vin, requestBody.doors, requestBody.seating, requestBody.horsePower);
  let statusCode: number = 201;

	if (!model.isValid())
		return getResponseNotFound();

  const addSuccess: Boolean = addModelRepository(model);

  if (!addSuccess) {
    statusCode = 505;
  }

	return new Response(null, { status: statusCode });
}

export async function updateModel(request: BunRequest): Promise<Response> {
	const requestBody: object = await request.json();
	const modelId: number = parseInt(request.params.id);
  let statusCode: number = 201;
  const updateSuccess: Boolean = updateModelRepository(modelId, requestBody);

  if (!updateSuccess) {
    statusCode = 505;
  }

	return new Response(null, { status: statusCode });
}

export function deleteModel(request: BunRequest): Response {
	const modelId: number = parseInt(request.params.id);
  const deleteSuccess: Boolean = deleteModelRepository(modelId);
  let statusCode: number = 201;

  if (!deleteSuccess) {
    statusCode = 505;
  }

	return new Response(null, { status: statusCode });
}
