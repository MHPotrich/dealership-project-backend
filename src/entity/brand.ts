export class Brand {
  private id?: number;
  private name: string;

  constructor(name: string, id?: number) {
    this.name = name;
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(newName: string): void {
    this.name = newName;
  }

  public getId(): number | undefined {
    return this.id;
  }
}
