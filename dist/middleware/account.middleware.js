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
Object.defineProperty(exports, "__esModule", { value: true });
class AccountMiddleware {
    hasUsername(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { method } = req;
            const { username } = method === "GET" ? req.params : req.body;
            if (!username)
                return res.status(400).json({ message: "Missing field: username" });
            return next();
        });
    }
    hasEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { method } = req;
            const { email } = method === "GET" ? req.params : req.body;
            if (!email)
                return res.status(400).json({ message: "Missing field: email" });
            return next();
        });
    }
    hasPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { method } = req;
            const { password } = method === "GET" ? req.query : req.body;
            if (!password)
                return res.status(400).json({ message: "Missing field: password" });
            return next();
        });
    }
}
exports.default = AccountMiddleware;
//# sourceMappingURL=account.middleware.js.map