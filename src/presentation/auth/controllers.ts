import { Request, Response } from "express";
import { RegisterUserDTO } from "../../domain/dtos/auth/register-user.dto";
import { AuthRepository } from "../../domain/repositories/auth";
import { CustomError } from "../../domain/errors/custom.error";
import { JWTAdapter } from "../../config";
import { UserModel } from "../../config/data/mongodb/model/user.model";
import { RegisterUser } from "../../domain/use-cases/register-user";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { LoginUser } from "../../domain/use-cases/login-user";

export class AuthController {
  // DI
  constructor(private readonly authRepository: AuthRepository) {}

  public login = async (req: Request, res: Response): Promise<void> => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) throw CustomError.badRequest(error);

    const user = await new LoginUser(this.authRepository).execute(
      loginUserDto!
    );
    if (!user) throw CustomError.notFound("User not found");
    res.status(200).json(user);
  };

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      throw CustomError.internalServerError((error as Error).message);
    }
  };

  public register = async (req: Request, res: Response): Promise<void> => {
    const [error, registerUserDTO] = RegisterUserDTO.create(req.body);

    if (error) throw CustomError.badRequest(error);

    try {
      const user = await new RegisterUser(this.authRepository).execute(
        registerUserDTO!
      );
      res.status(201).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  private handleError = (error: unknown, res: Response): void => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  };
}
