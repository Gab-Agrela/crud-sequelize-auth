"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const { POSTGRES_URL } = process.env;
const config = POSTGRES_URL;
exports.default = config;
//# sourceMappingURL=database.js.map