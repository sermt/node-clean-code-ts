import { User, UserEntity } from "../../domain/entitites/user";
import { CustomError } from "../../domain/errors/custom.error";

export class UserMapper {
  static UserEntityFromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, role, img, password } = object;

    if (!_id || !id) throw CustomError.badRequest("Missing ID");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!password) throw CustomError.badRequest("Missing password");
    if (!role) throw CustomError.badRequest("Missing role");

    return new UserEntity({ id: _id || id, name, email, password, role, img });
  }
}

type user = User & { _id: string };
