"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jose_1 = require("jose");
require("dotenv/config");
const generateJwtToken = (username, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { SECRET_JWT, ALG_JWT, ISSUER_JWT, AUDIENCE_JWT } = process.env;
    const secretKey = new TextEncoder().encode(SECRET_JWT);
    const token = yield new jose_1.SignJWT({ username, id })
        .setProtectedHeader({ alg: ALG_JWT })
        .setIssuedAt()
        .setIssuer(ISSUER_JWT)
        .setAudience(AUDIENCE_JWT)
        .setExpirationTime("10h")
        .sign(secretKey);
    return token;
});
exports.default = generateJwtToken;
