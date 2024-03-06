import { NextFunction, Request, Response } from "express";
import RegisterService from "../services/register.service";
import UserService from "../services/user.service";

class RegisterController {
  private regiterService: RegisterService = new RegisterService();
  private userService: UserService = new UserService();

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;

      await this.userService.usernameAlreadyExist(username);
      await this.userService.emailAlreadyExist(email);

      const { status } = await this.regiterService.createUser(
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
