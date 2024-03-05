import { Router } from "express";
import RegisterController from "../controller/register.controller";
import UserMiddleware from "../middleware/user.middleware";
import LoginController from "../controller/login.controller";
import UserController from "../controller/user.controller";

const userRouter = Router();

const controller = {
  register: new RegisterController(),
  user: new UserController(),
  login: new LoginController(),
};
const { hasEmail, hasPassword, hasUsername } = new UserMiddleware();

userRouter.get(
  "/username/:username",
  hasUsername,
  controller.user.getByUsername.bind(controller.user)
);

userRouter.get(
  "/email/:email",
  hasEmail,
  controller.user.getByEmail.bind(controller.user)
);
userRouter.post(
  "/register",
  hasUsername,
  hasEmail,
  hasPassword,
  controller.register.createUser.bind(controller.register)
);

userRouter.post(
  "/login",
  hasUsername,
  hasPassword,
  controller.login.auth.bind(controller.login)
);

export default userRouter;
