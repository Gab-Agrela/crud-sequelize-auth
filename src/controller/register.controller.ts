import { NextFunction, Request, Response } from "express";
import RegisterService from "../services/register.service";

class RegisterController {
  private service: RegisterService = new RegisterService();

  async createUser(req: Request, resp: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const { status, message } = await this.service.createUser(
        username,
        email,
        password
      );
      return resp.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default RegisterController;
