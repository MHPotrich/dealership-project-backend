export class UserDto {
  public id?: number;
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor(firstName: string, lastName: string, email: string, id?: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = id;
  }
}
