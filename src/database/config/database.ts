import "dotenv/config";
import { Options } from "sequelize";

const { POSTGRES_USER, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DATABASE } =
  process.env;

const config: Options = {
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  dialect: "postgres",
  host: POSTGRES_HOST,
};

export = config;
