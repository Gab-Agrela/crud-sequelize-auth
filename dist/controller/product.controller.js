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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
const mapProductEntrie_1 = require("../utils/mapProductEntrie");
class ProductController {
    constructor() {
        this.service = new product_service_1.default();
    }
    create(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const { userId } = resp.locals;
                const mapTypeOfContent = {
                    1: (body) => (0, mapProductEntrie_1.formatTypeOne)(userId, body),
                    2: (body) => (0, mapProductEntrie_1.formatTypeTwo)(userId, body),
                    3: (body) => (0, mapProductEntrie_1.formatTypeThree)(userId, body),
                };
                const productFormatted = mapTypeOfContent[(0, mapProductEntrie_1.typeOfContent)(body)](body);
                yield this.service.validateUniqueFields(productFormatted);
                if (Array.isArray(productFormatted)) {
                    const products = yield this.service.createMany(productFormatted);
                    return resp
                        .status(200)
                        .json({ message: "Product created", data: products });
                }
                const product = yield this.service.create(productFormatted);
                return resp
                    .status(200)
                    .json({ message: "Product created", data: product });
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { id } = _a, fieldsToUpdate = __rest(_a, ["id"]);
                const { userId } = resp.locals;
                yield this.service.getById(userId, id);
                const [product] = yield this.service.update(userId, id, fieldsToUpdate);
                if (!product)
                    throw new Error("Error when updating product");
                return resp
                    .status(200)
                    .json({ message: "Product updated", data: product });
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId } = resp.locals;
                const convertedIdToNumber = +id;
                yield this.service.getById(userId, convertedIdToNumber);
                const product = yield this.service.delete(userId, convertedIdToNumber);
                return resp
                    .status(200)
                    .json({ message: "Product deleted", data: product });
            }
            catch (error) {
                next(error);
            }
        });
    }
    read(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req;
                const { userId } = resp.locals;
                const product = yield this.service.find(userId, query);
                return resp.status(200).json({ message: "Product found", data: product });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProductController;
