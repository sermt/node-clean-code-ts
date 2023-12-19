import { JWTAdapter } from "../../config";
import { RegisterUserDTO } from "../dtos/auth/register-user.dto";
import { User } from "../entitites/user";
import { AuthRepository } from "../repositories/auth";

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: signToken = JWTAdapter.generateToken
  ) {}
  async execute(registerUserDTO: RegisterUserDTO): Promise<UserToken> {
    const { user } = await this.authRepository.register(registerUserDTO);
    const token = await this.signToken({ id: user.id });
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

interface RegisterUserUseCase {
  execute(registerUserDTO: RegisterUserDTO): Promise<UserToken>;
}

interface UserToken {
  token: string;
  user: Pick<User, "name" | "email" | "id">;
}

type signToken = (
  payload: { id: string },
  duration?: string
) => Promise<string | null>;
