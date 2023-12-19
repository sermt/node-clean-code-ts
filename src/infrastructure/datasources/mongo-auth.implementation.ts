import { BcryptAdapter } from "../../config";
import { UserModel } from "../../config/data/mongodb/model/user.model";
import { AuthDatasource } from "../../domain/datasources/auth";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDTO } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entitites/user";
import { CustomError } from "../../domain/errors/custom.error";
import { UserMapper } from "../mapper/user.mapper";

export class AuthDatasourceImplementation implements AuthDatasource {
  constructor(
    private readonly hashPassword: hashFunction = BcryptAdapter.hash,
    private readonly comparePasswords: compareFunction = BcryptAdapter.comparePasswords
  ) {}
  public async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    const { name, email, password } = registerUserDTO;

    try {
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        throw CustomError.badRequest("Email already exists");
      }

      // Hash the password
      const hashedPassword = this.hashPassword(password);

      // Create a new user in the database
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role: ["USER"],
      });

      await user.save();

      return UserMapper.UserEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      // If the error is not an instance of CustomError, you might want to handle or log it
      throw CustomError.internalServerError((error as Error).message);
    }
  }

  public async login(loginUserDTO: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDTO;
    try {
      const user = await UserModel.findOne({ email });
      if (!email) throw CustomError.badRequest("User not found");
      const isPasswordValid = await this.comparePasswords(
        password,
        user?.password as string
      );
      if (!isPasswordValid) throw CustomError.badRequest("Invalid password");
      return UserMapper.UserEntityFromObject(user!);
    } catch (error) {
      throw CustomError.internalServerError();
    }
  }
}

type hashFunction = (password: string) => string;
type compareFunction = (password: string, hashedPassword: string) => boolean;
