import { Database } from "bun:sqlite";

let database: Database;

function initDatabase(): void {
	if (!database) {
		database = new Database("database.db");
		database.exec(
			`CREATE TABLE IF NOT EXISTS "Brand" (
                "id" INTEGER NOT NULL UNIQUE,
                "name" TEXT NOT NULL,
                PRIMARY KEY("id")
            );

            CREATE TABLE IF NOT EXISTS "Model" (
                "id" INTEGER NOT NULL UNIQUE,
                "name" TEXT NOT NULL,
                "brand" INTEGER NOT NULL,
                "year" INTEGER NOT NULL,
                "transmission" TEXT NOT NULL,
                "drivetrain" TEXT NOT NULL,
                "engine" TEXT NOT NULL,
                "vin" TEXT NOT NULL,
                "doors" INTEGER NOT NULL,
                "seating" INTEGER NOT NULL,
                "horse_power" INTEGER NOT NULL,
                PRIMARY KEY("id"),
                FOREIGN KEY ("brand") REFERENCES "Brand"("id")
                ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            CREATE TABLE IF NOT EXISTS "Car" (
                "id" INTEGER NOT NULL UNIQUE,
                "list_price" NUMERIC NOT NULL,
                "sale_price" NUMERIC,
                "in_stock" BOOLEAN NOT NULL DEFAULT true,
                "model" INTEGER NOT NULL,
                "travelled_distance" INTEGER,
                "exterior_color" TEXT NOT NULL,
                "interior_color" TEXT NOT NULL,
                PRIMARY KEY("id"),
                FOREIGN KEY ("model") REFERENCES "Model"("id")
                ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            CREATE TABLE IF NOT EXISTS "User" (
                "id" INTEGER NOT NULL UNIQUE,
                "first_name" TEXT NOT NULL,
                "last_name" TEXT NOT NULL,
                "cars" INTEGER,
                "email" TEXT NOT NULL,
                "password" TEXT NOT NULL,
                PRIMARY KEY("id"),
                FOREIGN KEY ("cars") REFERENCES "Car"("id")
                ON UPDATE NO ACTION ON DELETE NO ACTION
            );
            `
		);
	}
}

export function getDatabaseInstance(): Database {
	initDatabase();
	return database;
}
