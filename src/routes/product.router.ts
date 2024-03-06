import { Router } from "express";
import ProductController from "../controller/product.controller";
import ProductMiddleware from "../middleware/product.middleware";

const productRouter = Router();

const controller = new ProductController();
const middleware = new ProductMiddleware();

productRouter.post("/create", controller.create.bind(controller));
productRouter.patch("/update", controller.update.bind(controller));
productRouter.delete(
  "/delete/:id",
  middleware.hasId,
  controller.delete.bind(controller)
);

export default productRouter;
