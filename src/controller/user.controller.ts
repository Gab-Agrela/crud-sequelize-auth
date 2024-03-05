import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  private service: UserService = new UserService();

  async getByUsername(req: Request, resp: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const { status, message } = await this.service.getByUsername(
        username as string
      );
      return resp.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async getByEmail(req: Request, resp: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const { status, message } = await this.service.getByEmail(
        email as string
      );
      return resp.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
