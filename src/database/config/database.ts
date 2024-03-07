import "dotenv/config";
import { Options } from "sequelize";

const config: Options = {
  username: process.env.POSTGRES_USER || "root",
  password: process.env.POSTGRES_PASSWORD || "123456",
  database: process.env.POSTGRES_DATABASE || "verceldb",
  host: process.env.POSTGRES_HOST || "localhost",
  ssl: process.env.POSTGRES_SSL === "true",
  port: 5432,
  dialect: "postgres",
  dialectModule: require("pg"),
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
};

export = config;
