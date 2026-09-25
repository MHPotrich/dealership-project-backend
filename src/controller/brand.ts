import type { BunRequest } from "bun";
import { getResponseNotFound } from "../utils";
import { deleteBrand as deleteBrandRepository, updateBrand as updateBrandRepository, addBrand as addBrandRepository, getBrand as getBrandRepository, getBrands as getBrandsRepository } from "../repository/brand";
import { Brand } from "../entity/brand";

export function getBrands(): Response {
  const brands: Array<Brand> = getBrandsRepository();

	return Response.json({
		brands: brands
	});
}

export function getBrand(request: BunRequest): Response {
  const brandId: number = parseInt(request.params.id);
  const brand: Brand = getBrandRepository(brandId);

  return Response.json({
    id: brand.getId(),
    name: brand.getName()
	});
}

export async function addBrand(request: BunRequest): Promise<Response> {
  const requestBody: { name: string | null } = await request.json();
  let statusCode: number = 201;

	if (!requestBody.name) return getResponseNotFound();

  const addSuccess: Boolean = addBrandRepository(requestBody.name);

  if (!addSuccess) {
    statusCode = 505;
  }

	return new Response(null, { status: statusCode });
}

export async function updateBrand(request: BunRequest): Promise<Response> {
	const requestBody: { name: string } = await request.json();
  const brandId: number = parseInt(request.params.id);
  let statusCode: number = 201;

	if (!requestBody.name) return getResponseNotFound();

  const updateSuccess: Boolean = updateBrandRepository(brandId, requestBody.name);

  if (!updateSuccess) {
    statusCode = 505;
  }

	return new Response(null, { status: statusCode });
}

export function deleteBrand(request: BunRequest): Response {
	const brandId: number = parseInt(request.params.id);
  const deleteSuccess: Boolean = deleteBrandRepository(brandId);
  let statusCode: number = 201;

  if (!deleteSuccess) {
    statusCode = 505;
  }

	return new Response(null, { status: statusCode });
}
