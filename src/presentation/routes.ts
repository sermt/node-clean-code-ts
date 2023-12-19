import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get  getRoutes(): Router {
    const router = Router();

    // Auth
    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
