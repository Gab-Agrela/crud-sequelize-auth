import { NextFunction, Request, Response } from "express";
import LoginService from "../services/user.service";

class LoginController {
  private service: LoginService = new LoginService();

  async getByUsername(req: Request, resp: Response, next: NextFunction) {
    try {
      const { username } = req.query;
      const { status, message } = await this.service.getByUsername(
        username as string
      );
      return resp.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
