import { compareSync, hashSync } from "bcryptjs";

export class BcryptAdapter {
  static hash(password: string): string {
    return hashSync(password);
  }

  static comparePasswords(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }
}
