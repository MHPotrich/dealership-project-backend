import type { BunRequest } from "bun";
import { getResponseNotFound } from "../utils";
import { deleteBrand as deleteBrandRepository, updateBrand as updateBrandRepository, addBrand as addBrandRepository, getBrand as getBrandRepository, getBrands as getBrandsRepository } from "../repository/brand";
import { Brand } from "../entity/brand";
import { BrandDto } from "../dto/brand";

export function getBrands(): Response {
  const brands: Array<Brand> = getBrandsRepository();
  const brandsDto = brands.map(brand => {
    return new BrandDto(brand.getName(), brand.getId());
  });

	return Response.json({
		brands: brandsDto
	});
}

export function getBrand(request: BunRequest): Response {
  const brandId: number = parseInt(request.params.id);
  const brand: Brand = getBrandRepository(brandId);
  const brandDto = new BrandDto(brand.getName(), brand.getId());

  return Response.json(brandDto);
}

export async function addBrand(request: BunRequest): Promise<Response> {
  const requestBody: { name: string | null } = await request.json();
  let statusCode: number = 201;

	if (!requestBody.name) return getResponseNotFound();

  const addSuccess: Boolean = addBrandRepository(requestBody.name);

  if (!addSuccess) {
    statusCode = 400;
  }

	return new Response(null, { status: statusCode });
}

export async function updateBrand(request: BunRequest): Promise<Response> {
	const requestBody: { name: string } = await request.json();
  const brandId: number = parseInt(request.params.id);

	if (!requestBody.name) return getResponseNotFound();

  const updateSuccess: Boolean = updateBrandRepository(brandId, requestBody.name);

  if (updateSuccess) {
    const brand = getBrandRepository(brandId);
    const brandDto = new BrandDto(brand.getName(), brand.getId());

    return Response.json(brandDto);
  }

	return new Response(null, { status: 400 });
}

export function deleteBrand(request: BunRequest): Response {
	const brandId: number = parseInt(request.params.id);
  const deleteSuccess: Boolean = deleteBrandRepository(brandId);
  let statusCode: number = 204;

  if (!deleteSuccess) {
    statusCode = 400;
  }

	return new Response(null, { status: statusCode });
}
