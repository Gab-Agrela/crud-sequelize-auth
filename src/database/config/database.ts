import "dotenv/config";
import { Options } from "sequelize";

// const {POSTGRES_URL} = process.env

const config: Options = {
  username: "postgres",
  password: "1234",
  database: "postgres",
  dialect: "postgres",
  host: "localhost",
};

export = config;
