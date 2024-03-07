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
const Product_1 = __importDefault(require("../database/models/Product"));
class ProductService {
    constructor() {
        this.model = Product_1.default;
    }
    create(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.create(Object.assign({}, entry));
            if (!product)
                throw new Error("Error when creating product");
            return product;
        });
    }
    createMany(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.bulkCreate(entry);
            if (!product)
                throw new Error("Error when creating product");
            return product;
        });
    }
    update(userId, id, fieldsToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.update(Object.assign({}, fieldsToUpdate), { where: { userId, id } });
            return product;
        });
    }
    delete(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.destroy({ where: { userId, id } });
            return product;
        });
    }
    find(userId, param) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.findAll({ where: Object.assign({ userId }, param) });
            if (!product.length)
                throw new Error("Product not found");
            return product;
        });
    }
    nameAlreadyExist(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.findOne({ where: { userId, name } });
            if (product)
                throw new Error("Name already registered");
            return;
        });
    }
    brandAlreadyExist(userId, brand) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.findOne({ where: { userId, brand } });
            if (product)
                throw new Error("Brand already registered");
            return;
        });
    }
    modelAlreadyExist(userId, model) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.findOne({ where: { userId, model } });
            if (product)
                throw new Error("Model already registered");
            return;
        });
    }
    getById(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.findOne({ where: { userId, id } });
            if (!product)
                throw new Error("Product not found");
            return product;
        });
    }
    validateUniqueFields(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(data)) {
                for (const { userId, name, brand, model } of data) {
                    yield this.nameAlreadyExist(userId, name);
                    yield this.brandAlreadyExist(userId, brand);
                    yield this.modelAlreadyExist(userId, model);
                }
            }
            else {
                yield this.nameAlreadyExist(data.userId, data.name);
                yield this.brandAlreadyExist(data.userId, data.brand);
                yield this.modelAlreadyExist(data.userId, data.model);
            }
            return;
        });
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map