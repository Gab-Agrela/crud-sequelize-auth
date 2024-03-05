"use strict";
require("dotenv/config");
// const {POSTGRES_URL} = process.env
const config = {
    username: "postgres",
    password: "1234",
    database: "postgres",
    dialect: "postgres",
    host: "localhost",
};
module.exports = config;
