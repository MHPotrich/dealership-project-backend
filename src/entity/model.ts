export class Model {
  private name: string;
  private brand: number;
  private year: number;
  private transmission: string;
  private drivetrain: string;
  private engine: string;
  private vin: string;
  private doors: number;
  private seating: number;
  private horsePower: number;

  constructor(newName: string, newBrand: number, newYear: number, newTransmission: string, newDrivetrain: string, newEngine: string, newVin: string, newDoors: number, newSeating: number, newHorsePower: number) {
    this.name = newName;
    this.brand = newBrand;
    this.year = newYear;
    this.transmission = newTransmission;
    this.drivetrain = newDrivetrain;
    this.engine = newEngine;
    this.vin = newVin;
    this.doors = newDoors;
    this.seating = newSeating;
    this.horsePower = newHorsePower;
  }

  public getName(): string {
    return this.name;
  }

  public setName(newName: string): void {
    this.name = newName;
  }

  public getBrand(): number {
    return this.brand;
  }

  public setBrand(newBrand: number): void {
    this.brand = newBrand;
  }

  public getYear(): number {
    return this.year;
  }

  public setYear(newYear: number): void {
    this.year = newYear;
  }

  public getTransmission(): string {
    return this.transmission;
  }

  public setTransmission(newTransmission: string): void {
    this.transmission = newTransmission;
  }

  public getDrivetrain(): string {
    return this.drivetrain;
  }

  public setDrivetrain(newDrivetrain: string): void {
    this.drivetrain = newDrivetrain;
  }

  public getEngine(): string {
    return this.engine;
  }

  public setEngine(newEngine: string): void {
    this.engine = newEngine;
  }

  public getVin(): string {
    return this.vin;
  }

  public setVin(newVin: string): void {
    this.vin = newVin;
  }

  public getDoors(): number {
    return this.doors;
  }

  public setDoors(newDoors: number): void {
    this.doors = newDoors;
  }

  public getSeating(): number {
    return this.seating;
  }

  public setSeating(newSeating: number): void {
    this.seating = newSeating;
  }

  public getHorsePower(): number {
    return this.horsePower;
  }

  public setHorsePower(newHorsePower: number): void {
    this.horsePower = newHorsePower;
  }

  private isNameValid(): boolean {
    return this.name !== null && this.name.length > 0;
  }

  private isBrandValid(): boolean {
    return this.brand !== null && this.brand > 0;
  }

  private isYearValid(): boolean {
    return this.year !== null && this.year > 0 && this.year <= new Date().getFullYear() + 1;
  }

  private isTransmissionValid(): boolean {
    return this.transmission !== null && this.transmission.length > 0;
  }

  private isDrivetrainValid(): boolean {
    return this.drivetrain !== null && this.drivetrain.length > 0;
  }

  private isEngineValid(): boolean {
    return this.engine !== null && this.engine.length > 0;
  }

  private isVinValid(): boolean {
    return this.vin !== null && this.vin.length === 17;
  }

  private isDoorsValid(): boolean {
    return this.doors !== null && this.doors > 0;
  }

  private isSeatingValid(): boolean {
    return this.seating !== null && this.seating > 0;
  }

  private isHorsePowerValid(): boolean {
    return this.horsePower !== null && this.horsePower > 0;
  }

  public isValid(): boolean {
    return this.isNameValid() &&
      this.isBrandValid() &&
      this.isYearValid() &&
      this.isTransmissionValid() &&
      this.isDrivetrainValid() &&
      this.isEngineValid() &&
      this.isVinValid() &&
      this.isDoorsValid() &&
      this.isSeatingValid() &&
      this.isHorsePowerValid();
  }
}
