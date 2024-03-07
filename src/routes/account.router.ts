import { Router } from "express";
import RegisterController from "../controller/register.controller";
import UserMiddleware from "../middleware/account.middleware";
import LoginController from "../controller/login.controller";
import UserController from "../controller/account.controller";

const accountRouter = Router();

const controller = {
  register: new RegisterController(),
  user: new UserController(),
  login: new LoginController(),
};
const { hasEmail, hasPassword, hasUsername } = new UserMiddleware();

accountRouter.get(
  "/username/:username",
  hasUsername,
  controller.user.getByUsername.bind(controller.user)
);

accountRouter.get(
  "/email/:email",
  hasEmail,
  controller.user.getByEmail.bind(controller.user)
);

accountRouter.post(
  "/register",
  hasUsername,
  hasEmail,
  hasPassword,
  controller.register.createUser.bind(controller.register)
);

accountRouter.post(
  "/login",
  hasUsername,
  hasPassword,
  controller.login.auth.bind(controller.login)
);

export default accountRouter;
