import { envs } from "./config";
import { MongoDatabase } from "./config/data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.mongo_db_name,
    mongoUrl: envs.mongo_url,
  });
  const server = new Server({ port: envs.port, routes: AppRoutes.getRoutes });
  await server.start();
}
