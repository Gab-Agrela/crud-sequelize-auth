import { Router } from "express";
import ProductController from "../controller/product.controller";

const productRouter = Router();

const controller = new ProductController();

productRouter.post("/create", controller.create.bind(controller));

export default productRouter;
