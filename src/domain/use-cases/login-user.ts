import { JWTAdapter } from "../../config";
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { RegisterUserDTO } from "../dtos/auth/register-user.dto";
import { User } from "../entitites/user";
import { CustomError } from "../errors/custom.error";
import { AuthRepository } from "../repositories/auth";

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: signToken = JWTAdapter.generateToken
  ) {}
  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const { user } = await this.authRepository.login(loginUserDto);
    const token = await this.signToken({ id: user.id });
    if(!token) throw CustomError.internalServerError("Failed to generate token");
    return {
      token: token!,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };
  }
}

interface LoginUserUseCase {
  execute(loginUserDTO: LoginUserDto): Promise<UserToken>;
}

interface UserToken {
  token: string;
  user: Pick<User, "name" | "email" | "id">;
}

type signToken = (
  payload: { id: string },
  duration?: string
) => Promise<string | null>;
