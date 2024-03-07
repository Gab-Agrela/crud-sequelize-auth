import * as pg from "pg";
import { Sequelize } from "sequelize";
import "dotenv/config";

const { POSTGRES_URL } = process.env;

export const db = new Sequelize(POSTGRES_URL, {
  dialectModule: pg,
});
