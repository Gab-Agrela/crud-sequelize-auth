import { NextFunction, Request, Response } from "express";
import UserService from "../services/register.service";

class RegisterController {
  private service = new UserService();

  async createUser(req: Request, resp: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const { status, message } = await this.service.createUser(
        username,
        email,
        password
      );
      resp.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default RegisterController;
