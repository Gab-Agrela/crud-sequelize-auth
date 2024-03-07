"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = __importDefault(require("../controller/register.controller"));
const account_middleware_1 = __importDefault(require("../middleware/account.middleware"));
const login_controller_1 = __importDefault(require("../controller/login.controller"));
const account_controller_1 = __importDefault(require("../controller/account.controller"));
const accountRouter = (0, express_1.Router)();
const controller = {
    register: new register_controller_1.default(),
    user: new account_controller_1.default(),
    login: new login_controller_1.default(),
};
const { hasEmail, hasPassword, hasUsername } = new account_middleware_1.default();
accountRouter.get("/username/:username", hasUsername, controller.user.getByUsername.bind(controller.user));
accountRouter.get("/email/:email", hasEmail, controller.user.getByEmail.bind(controller.user));
accountRouter.post("/register", hasUsername, hasEmail, hasPassword, controller.register.createUser.bind(controller.register));
accountRouter.post("/login", hasUsername, hasPassword, controller.login.auth.bind(controller.login));
exports.default = accountRouter;
