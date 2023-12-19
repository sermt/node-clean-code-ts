import { Router } from "express";
import { AuthController } from "./controllers";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/AuthRepositoryImpl";
import { AuthDatasourceImplementation } from "../../infrastructure/datasources/mongo-auth.implementation";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImplementation();
    const authRepository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(authRepository);

    // Main routes.
    router.post("/login", controller.login);
    router.post("/register", controller.register);
    router.get("/",[AuthMiddleware.validateJWT], controller.getUsers);

    return router;
  }
}
