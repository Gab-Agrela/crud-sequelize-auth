import { NextFunction, Request, Response } from "express";
import * as jose from "jose";

class AuthMiddleware {
  async validateJwtToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const accessDenied = "Access denied. Please provide token";

    if (!authorization) {
      return res.status(401).send(accessDenied);
    }

    const [, token] = authorization.split(" ");
    if (!token) {
      return res.status(401).send(accessDenied);
    }

    try {
      const { SECRET_JWT, ISSUER_JWT, AUDIENCE_JWT } = process.env;

      const secretKey = new TextEncoder().encode(SECRET_JWT);
      const { payload } = await jose.jwtVerify(token, secretKey, {
        issuer: ISSUER_JWT,
        audience: AUDIENCE_JWT,
      });

      if (!payload.id) {
        throw new Error("Invalid user");
      }

      res.locals.userId = payload.id;
      return next();
    } catch (error) {
      return res.status(403).send("Access denied. Invalid token");
    }
  }
}

export default AuthMiddleware;
