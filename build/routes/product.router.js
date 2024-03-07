"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product.controller"));
const product_middleware_1 = __importDefault(require("../middleware/product.middleware"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const productRouter = (0, express_1.Router)();
const controller = new product_controller_1.default();
const middleware = {
    product: new product_middleware_1.default(),
    auth: new auth_middleware_1.default(),
};
productRouter.use(middleware.auth.validateJwtToken);
productRouter.post("/create", controller.create.bind(controller));
productRouter.get("/read", middleware.product.hasSomeDifferentField, controller.read.bind(controller));
productRouter.patch("/update", controller.update.bind(controller));
productRouter.delete("/delete/:id", middleware.product.hasId, controller.delete.bind(controller));
exports.default = productRouter;
