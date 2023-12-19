import { AuthRepository } from "../../domain/repositories/auth";
import { AuthDatasource } from "../../domain/datasources/auth";
import { RegisterUserDTO } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entitites/user";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  public register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDTO);
  }
  public async login(loginUserDTO: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDTO);
  }
}
