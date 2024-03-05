import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";

import UserService from "../services/user.service";

class LoginController {
  private service: UserService = new UserService();

  async auth(req: Request, resp: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const { status, message } = await this.service.getByUsername(username);
      const passwordAreEqual = await bcrypt.compare(password, message.password);

      if (!passwordAreEqual)
        return resp
          .status(400)
          .json({ message: "Login failed: Invalid password" });

      return resp.status(status).json({ message: "Login Success!" });
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
