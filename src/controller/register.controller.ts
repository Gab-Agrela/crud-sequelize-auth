import { NextFunction, Request, Response } from "express";
import RegisterService from "../services/register.service";

class RegisterController {
  private service: RegisterService = new RegisterService();

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const { status } = await this.service.createUser(
        username,
        email,
        password
      );
      return res.status(status).json({ message: "Conta criada com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}

export default RegisterController;
