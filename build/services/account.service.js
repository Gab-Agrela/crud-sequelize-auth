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
const User_1 = __importDefault(require("../database/models/User"));
const resp_1 = __importDefault(require("../utils/resp"));
class AccountService {
    constructor() {
        this.model = User_1.default;
    }
    getByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ where: { username } });
            if (!user)
                throw new Error("User not found");
            return (0, resp_1.default)(200, user);
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ where: { email } });
            if (!user)
                throw new Error("User not found");
            return (0, resp_1.default)(200, user);
        });
    }
    usernameAlreadyExist(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ where: { username } });
            if (user)
                throw new Error("Username already registered");
            return;
        });
    }
    emailAlreadyExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ where: { email } });
            if (user)
                throw new Error("Email already registered");
            return;
        });
    }
}
exports.default = AccountService;
