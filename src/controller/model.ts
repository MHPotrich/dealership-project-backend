import type { BunRequest } from "bun";
import { getResponseNotFound } from "../utils";
import { deleteModel as deleteModelRepository, updateModel as updateModelRepository, addModel as addModelRepository, getModel as getModelRepository, getModels as getModelsRepository } from "../repository/model";
import { Model } from "../entity/model";
import { ModelDto } from "../dto/model";

export function getModels(): Response {
  const models = getModelsRepository();
  const modelsDto = models.map(model => {
    return new ModelDto(
      model.getName(),
      model.getBrand(),
      model.getYear(),
      model.getTransmission(),
      model.getDrivetrain(),
      model.getEngine(),
      model.getVin(),
      model.getDoors(),
      model.getSeating(),
      model.getHorsePower(),
      model.getId()
    );
  })

  return Response.json({ models: modelsDto });
}

export function getModel(request: BunRequest): Response {
  const modelId: number = parseInt(request.params.id);
  const model: Model | null = getModelRepository(modelId);

  if (model) {
    const modelDto = new ModelDto(
      model.getName(),
      model.getBrand(),
      model.getYear(),
      model.getTransmission(),
      model.getDrivetrain(),
      model.getEngine(),
      model.getVin(),
      model.getDoors(),
      model.getSeating(),
      model.getHorsePower(),
      model.getId()
    );

    return Response.json(modelDto);
  }

	return new Response(null, { status: 404 });
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
    statusCode = 400;
  }

	return new Response(null, { status: statusCode });
}

export async function updateModel(request: BunRequest): Promise<Response> {
	const requestBody: object = await request.json();
	const modelId: number = parseInt(request.params.id);
  const updateSuccess: Boolean = updateModelRepository(modelId, requestBody);

  if (updateSuccess) {
    const model: Model | null = getModelRepository(modelId);

    if (model) {
      const modelDto = new ModelDto(
        model.getName(),
        model.getBrand(),
        model.getYear(),
        model.getTransmission(),
        model.getDrivetrain(),
        model.getEngine(),
        model.getVin(),
        model.getDoors(),
        model.getSeating(),
        model.getHorsePower(),
        model.getId()
      );

      return Response.json(modelDto);
    }

    return new Response(null, { status: 404 });
  }

	return new Response(null, { status: 400 });
}

export function deleteModel(request: BunRequest): Response {
	const modelId: number = parseInt(request.params.id);
  const deleteSuccess: Boolean = deleteModelRepository(modelId);
  let statusCode: number = 204;

  if (!deleteSuccess) {
    statusCode = 400;
  }

	return new Response(null, { status: statusCode });
}
