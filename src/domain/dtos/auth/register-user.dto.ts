import { Validators } from "../../../config/helpers/validators";
import { User } from "../../entitites/user";

export class RegisterUserDTO {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(
    user: Pick<User, "name" | "email" | "password">
  ): [string?, RegisterUserDTO?] {
    const { email, name, password } = user;
    if (!name) return ["name is required"];
    if (!email) return ["email is required"];
    if (!Validators.email.test(email as string)) return ["invalid email"];
    if (!password) return ["password is required"];
    if (password.trim().length < 6) return ["password is too short"];

    return [
      undefined,
      new RegisterUserDTO(name, email.toLocaleLowerCase(), password),
    ];
  }
}
