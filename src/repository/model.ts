import { getDatabaseInstance } from "../database";
import { Database } from "bun:sqlite";
import { convertToDatabaseKey } from "../utils";
import { Model } from "../entity/model";

const modelsDbTable: string = "model";

export function deleteModel(modelId: number): Boolean {
  getDatabaseInstance()
		.query(`DELETE FROM ${modelsDbTable} WHERE id = ?`)
    .get(modelId);

  return true;
}

export function updateModel(modelId: number, newValues: object): Boolean {
  const databaseInstance: Database = getDatabaseInstance();

	for (const [key, value] of Object.entries(newValues)) {
  	if (key !== "id") {
      const databaseKey: string = convertToDatabaseKey(key);

     	databaseInstance.query(
        `UPDATE ${modelsDbTable} SET ${databaseKey} = ? WHERE id = ?`
     	).run(value, modelId);
    }
  }

  return true;
}

export function addModel(model: Model): Boolean {
  getDatabaseInstance()
		.query(
			`INSERT INTO ${modelsDbTable} (name, brand, year, transmission, drivetrain, engine, vin, doors, seating, horse_power) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		)
		.run(
			model.getName(),
			model.getBrand(),
			model.getYear(),
			model.getTransmission(),
			model.getDrivetrain(),
			model.getEngine(),
			model.getVin(),
			model.getDoors(),
			model.getSeating(),
			model.getHorsePower()
  );

  return true;
}

export function getModel(modelId: number): Model | null {
  const repositoryModel: {
    name: string;
    brand: number;
    year: number;
    transmission: string;
    drivetrain: string;
    engine: string;
    vin: string;
    doors: number;
    seating: number;
    horse_power: number;
  } = getDatabaseInstance().query(`SELECT * FROM ${modelsDbTable} WHERE id = ?`).get(modelId);

  if (repositoryModel == null) return null;

  return new Model(
    repositoryModel.name,
    repositoryModel.brand,
    repositoryModel.year,
    repositoryModel.transmission,
    repositoryModel.drivetrain,
    repositoryModel.engine,
    repositoryModel.vin,
    repositoryModel.doors,
    repositoryModel.seating,
    repositoryModel.horse_power
  );
}

export function getModels(): Model[] {
  const models: Model[] = [];
  const repositoryModels = getDatabaseInstance().query(`SELECT * FROM ${modelsDbTable}`).all();

  repositoryModels.forEach((item: {
    name: string;
    brand: number;
    year: number;
    transmission: string;
    drivetrain: string;
    engine: string;
    vin: string;
    doors: number;
    seating: number;
    horse_power: number;
  }) => {
    models.push(new Model(
      item.name,
      item.brand,
      item.year,
      item.transmission,
      item.drivetrain,
      item.engine,
      item.vin,
      item.doors,
      item.seating,
      item.horse_power
    ));
  });

  return models;
}
