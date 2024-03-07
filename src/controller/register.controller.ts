import { NextFunction, Request, Response } from "express";
import RegisterService from "../services/register.service";
import AccountService from "../services/account.service";

class RegisterController {
  private regiterService: RegisterService = new RegisterService();
  private accountService: AccountService = new AccountService();

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;

      await this.accountService.usernameAlreadyExist(username);
      await this.accountService.emailAlreadyExist(email);

      const { status } = await this.regiterService.createUser(
        username,
        email,
        password
      );
      return res.status(status).json({ message: "Account created" });
    } catch (error) {
      next(error);
    }
  }
}

export default RegisterController;
