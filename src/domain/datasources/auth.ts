import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDTO } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entitites/user";

export abstract class AuthDatasource {
  abstract register(registerUserDTO: RegisterUserDTO): Promise<UserEntity>;
  abstract login(loginUserDTO: LoginUserDto): Promise<UserEntity>;
}
