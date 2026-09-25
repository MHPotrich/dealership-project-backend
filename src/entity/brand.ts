export class Brand {
  private id: number;
  private name: string;

  constructor(newId: number, newName: string) {
    this.name = newName;
    this.id = newId;
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
