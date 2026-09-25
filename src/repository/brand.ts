import { getDatabaseInstance } from "../database";
import { Brand } from "../entity/brand";

const brandsDbTable: string = "brand";

export function deleteBrand(brandId: number): Boolean {
  if (brandId < 0) {
    return false;
  }

  getDatabaseInstance()
		.query(`DELETE FROM ${brandsDbTable} WHERE id = ?`)
    .get(brandId);

  return true;
}

export function updateBrand(brandId: number, newName: string): Boolean {
  if (brandId < 0) {
    return false;
  }

  getDatabaseInstance()
		.query(`UPDATE ${brandsDbTable} SET name = ? WHERE id = ?`)
    .run(newName, brandId);

  return true;
}

export function addBrand(brandName: string): Boolean {
  if (brandName.length == 0) {
    return false;
  }

  getDatabaseInstance()
		.query(`INSERT INTO ${brandsDbTable} (name) VALUES (?)`)
    .run(brandName);

  return true;
}

export function getBrand(brandId: number): Brand {
  const databaseResponse: { id: number, name: string } = getDatabaseInstance()
		.query(`SELECT * FROM ${brandsDbTable} WHERE id = ?`)
    .get(brandId)

  const brand: Brand = new Brand(databaseResponse.id, databaseResponse.name);

  return brand;
}

export function getBrands(): Array<Brand> {
  const dataBaseResponse: Array<{ id: number, name: string }> = getDatabaseInstance()
    .query(`SELECT * FROM ${brandsDbTable}`)
    .all();
  const brands: Array<Brand> = [];

  dataBaseResponse.forEach(item => {
    brands.push(new Brand(item.id, item.name));
  })

  return brands;
}
