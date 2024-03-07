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
class ProductMiddleware {
    hasId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!+id)
                return res
                    .status(400)
                    .json({ message: "Invalid param: Id should be a number" });
            return next();
        });
    }
    hasSomeDifferentField(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query } = req;
            const fields = Object.keys(query);
            const allowedFields = ["name", "brand", "model", "id"];
            if (!query)
                return next();
            if (fields.some((field) => !allowedFields.includes(field))) {
                return res.status(400).json({
                    message: `Invalid param: should be name, brand, model or id `,
                });
            }
            return next();
        });
    }
}
exports.default = ProductMiddleware;
//# sourceMappingURL=product.middleware.js.map