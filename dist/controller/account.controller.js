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
const account_service_1 = __importDefault(require("../services/account.service"));
class AccountController {
    constructor() {
        this.service = new account_service_1.default();
    }
    getByUsername(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const { status, message } = yield this.service.getByUsername(username);
                return res.status(status).json(message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const { status, message } = yield this.service.getByEmail(email);
                return res.status(status).json(message);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AccountController;
