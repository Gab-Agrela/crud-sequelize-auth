import { Router } from "express";
import userRouter from "./account.router";
import productRouter from "./product.router";

const router = Router();

router.use("/account", userRouter);
router.use("/product", productRouter);

export default router;
