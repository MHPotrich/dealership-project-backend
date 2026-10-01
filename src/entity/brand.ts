export class Brand {
  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.name = name;
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(newName: string): void {
    this.name = newName;
  }

  public getId(): number {
    return this.id;
  }
}
