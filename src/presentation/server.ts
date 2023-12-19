import express, { Router } from "express";

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  constructor(options: Options) {
    const { port = 3000, routes } = options;
    this.port = port;
    this.routes = routes;
  }
  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    // Routes
    this.app.use(this.routes);

    // Start server
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

interface Options {
  port?: number;
  routes: Router;
}
