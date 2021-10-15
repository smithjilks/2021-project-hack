export class StudentData {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public regNumber: string,
    public imagePath: string,

  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.regNumber = regNumber;
    this.imagePath = imagePath;
  }
}
