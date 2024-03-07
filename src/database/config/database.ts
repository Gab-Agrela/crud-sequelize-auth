import "dotenv/config";
import { Options } from "sequelize";

const config: Options = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  dialect: "postgres",
  dialectModule: require("pg"),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

export = config;
