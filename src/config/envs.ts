import "dotenv/config";
import { get } from "env-var";

export const envs = {
  port: get("PORT").required().asPortNumber(),
  mongo_url: get("MONGO_URL").required().asString(),
  mongo_db_name: get("MONGO_DB_NAME").required().asString(),
  jwt_seed: get("JWT_SEED").required().asString(),
};
