"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_router_1 = __importDefault(require("./account.router"));
const product_router_1 = __importDefault(require("./product.router"));
const router = (0, express_1.Router)();
router.use("/account", account_router_1.default);
router.use("/product", product_router_1.default);
exports.default = router;
