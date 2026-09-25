export class User {
  private firstName: string;
	private lastName: string;
	private email: string;
  private password: string | null;

  constructor(newFirstName: string, newLastName: string, newEmail: string) {
    this.firstName = newFirstName;
    this.lastName = newLastName;
    this.email = newEmail;
  }

  private isEmailValid(): Boolean {
    return this.email !== null && this.email.length > 0;
  }

  private isPasswordValid(): Boolean {
    return this.password !== null && this.password.length >= 8;
  }

  private isFirstNameValid(): Boolean {
    return this.firstName !== null && this.firstName.length >= 3;
  }

  private isLastNameValid(): Boolean {
    return this.lastName !== null && this.lastName.length >= 3;
  }

  public isValid(): Boolean {
    return this.isEmailValid() && this.isPasswordValid() && this.isFirstNameValid() && this.isLastNameValid();
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public setFirstName(newFirstName: string): void {
    this.firstName = newFirstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setLastName(newLastName: string): void {
    this.lastName = newLastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(newEmail: string): void {
    this.email = newEmail;
  }

  public getPassword(): string | null {
    return this.password;
  }

  public async setPassword(rawPassword: string): Promise<void> {
    const hashPassword: string = await Bun.password.hash(rawPassword);

    this.password = hashPassword;
  }

  public setHashPassword(hashedPassword: string): void {
    this.password = hashedPassword;
  }
}
