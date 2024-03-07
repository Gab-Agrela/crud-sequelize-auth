import { Router } from "express";
import ProductController from "../controller/product.controller";
import ProductMiddleware from "../middleware/product.middleware";
import AuthMiddleware from "../middleware/auth.middleware";

const productRouter = Router();

const controller = new ProductController();
const middleware = {
  product: new ProductMiddleware(),
  auth: new AuthMiddleware(),
};

productRouter.use(middleware.auth.validateJwtToken);

productRouter.post("/create", controller.create.bind(controller));

productRouter.get(
  "/read",
  middleware.product.hasSomeDifferentField,
  controller.read.bind(controller)
);

productRouter.patch("/update", controller.update.bind(controller));

productRouter.delete(
  "/delete/:id",
  middleware.product.hasId,
  controller.delete.bind(controller)
);

export default productRouter;
