import { Router } from "express";
import RegisterController from "../controller/register.controller";
import UserMiddleware from "../middleware/user.middleware";

const userRouter = Router();

const controller = {
  register: new RegisterController(),
};
const { hasEmail, hasPassword, hasUsername } = new UserMiddleware();

userRouter.post(
  "/register",
  hasUsername,
  hasEmail,
  hasPassword,
  controller.register.createUser.bind(controller.register)
);

export default userRouter;
