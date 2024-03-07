"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_service_1 = __importDefault(require("../services/register.service"));
const account_service_1 = __importDefault(require("../services/account.service"));
class RegisterController {
    constructor() {
        this.regiterService = new register_service_1.default();
        this.accountService = new account_service_1.default();
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                yield this.accountService.usernameAlreadyExist(username);
                yield this.accountService.emailAlreadyExist(email);
                const { status } = yield this.regiterService.createUser(username, email, password);
                return res.status(status).json({ message: "Account created" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = RegisterController;
