import { NextFunction, Request, Response } from "express";

class AccountMiddleware {
  async hasUsername(req: Request, res: Response, next: NextFunction) {
    const { method } = req;
    const { username } = method === "GET" ? req.params : req.body;
    if (!username)
      return res.status(400).json({ message: "Missing field: username" });
    return next();
  }

  async hasEmail(req: Request, res: Response, next: NextFunction) {
    const { method } = req;
    const { email } = method === "GET" ? req.params : req.body;
    if (!email)
      return res.status(400).json({ message: "Missing field: email" });
    return next();
  }

  async hasPassword(req: Request, res: Response, next: NextFunction) {
    const { method } = req;
    const { password } = method === "GET" ? req.query : req.body;
    if (!password)
      return res.status(400).json({ message: "Missing field: password" });
    return next();
  }
}

export default AccountMiddleware;
