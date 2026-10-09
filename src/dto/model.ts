export class ModelDto {
  public id: number;
  public name: string;
  public brand: number;
  public year: number;
  public transmission: string;
  public drivetrain: string;
  public engine: string;
  public vin: string;
  public doors: number;
  public seating: number;
  public horsePower: number;

  constructor(id: number, name: string, brand: number, year: number, transmission: string, drivetrain: string, engine: string, vin: string, doors: number, seating: number, horsePower: number) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.year = year;
    this.transmission = transmission;
    this.drivetrain = drivetrain;
    this.engine = engine;
    this.vin = vin;
    this.doors = doors;
    this.seating = seating;
    this.horsePower = horsePower;
  }
}
