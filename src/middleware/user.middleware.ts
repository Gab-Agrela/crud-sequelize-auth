import { NextFunction, Request, Response } from "express";

class UserMiddleware {
  async hasUsername(req: Request, resp: Response, next: NextFunction) {
    const { username } = req.body;
    if (!username)
      return resp.status(400).json({ message: "Missing field: username" });
    return next();
  }

  async hasEmail(req: Request, resp: Response, next: NextFunction) {
    const { email } = req.body;
    if (!email)
      return resp.status(400).json({ message: "Missing field: email" });
    return next();
  }

  async hasPassword(req: Request, resp: Response, next: NextFunction) {
    const { password } = req.body;
    if (!password)
      return resp.status(400).json({ message: "Missing field: password" });
    return next();
  }
}

export default UserMiddleware;
