import { getDatabaseInstance } from "../database";
import { Database } from "bun:sqlite";
import { convertToDatabaseKey } from "../utils";
import { Car } from "../entity/car";

const carsDbTable: string = "car";

export function getCars(limit: number, offset: number): Array<Car> {
	let dbQuery: string = `SELECT * FROM ${carsDbTable}`;

	if (limit > 0 && offset > 0) {
		dbQuery += ` LIMIT ${limit} OFFSET ${offset}`;
		}

		const dataBaseResponse = getDatabaseInstance().query(dbQuery).all();
		const cars: Array<Car> = [];

		dataBaseResponse.forEach((item: { listPrice: number, salePrice: number, inStock: boolean, model: string, travelledDistance: number, exteriorColor: string, interiorColor: string }) => {
				cars.push(new Car(item.listPrice, item.salePrice, item.inStock, item.model, item.travelledDistance, item.exteriorColor, item.interiorColor))
		})

		return cars;
}

export function getCar(carId: number): Car | null {
  const repositoryCar: { list_price: number, sale_price: number, in_stock: boolean, model: string, travelled_distance: number, exterior_color: string, interior_color: string } | null = getDatabaseInstance()
		.query(`SELECT * FROM ${carsDbTable} WHERE id = ?`)
    .get(carId)

  if (repositoryCar == null) return null;

  const car: Car = new Car(repositoryCar.list_price, repositoryCar.sale_price, repositoryCar.in_stock, repositoryCar.model, repositoryCar.travelled_distance, repositoryCar.exterior_color, repositoryCar.interior_color);

  return car;
}

export function addCar(newCar: Car): Boolean {
  getDatabaseInstance()
		.query(
			`INSERT INTO ${carsDbTable} (list_price, sale_price, in_stock, model, travelled_distance, exterior_color, interior_color) VALUES (?, ?, ?, ?, ?, ?, ?)`
		)
		.run(
			newCar.getListPrice(),
			newCar.getSalePrice(),
			newCar.getInStock(),
			newCar.getModel(),
			newCar.getTravelledDistance(),
			newCar.getExteriorColor(),
			newCar.getInteriorColor()
    );

  return true;
}

export function updateCar(carId: number, newValues: object): Boolean {
  const databaseInstance: Database = getDatabaseInstance();

  for (const [key, value] of Object.entries(newValues)) {
    if (key !== "id") {
      const databaseKey: string = convertToDatabaseKey(key);

			databaseInstance.query(
				`UPDATE ${carsDbTable} SET ${databaseKey} = ? WHERE id = ?`
			).run(value, carId);
		}
  }

  return true;
}

export function deleteCar(carId: number): boolean {
  getDatabaseInstance()
		.query(`DELETE FROM ${carsDbTable} WHERE id = ?`)
    .get(carId);

  return true;
}
