import { ModelStatic } from "sequelize";

import Product from "../database/models/Product";
import { TProduct } from "../utils/mapProductEntrie";

export type TProductFind = {
  name: string | undefined;
  brand: string | undefined;
  model: string | undefined;
};

export interface TProductUpdate extends TProductFind {
  options: { price: number | null; color: string | null }[] | undefined;
}
class ProductService {
  private model: ModelStatic<Product> = Product;

  async create(entry: TProduct) {
    const product = await this.model.create({ ...entry });
    if (!product) throw new Error("Error when creating product");
    return product;
  }

  async createMany(entry: Array<TProduct>) {
    const product = await this.model.bulkCreate(entry);
    if (!product) throw new Error("Error when creating product");
    return product;
  }

  async update(userId: number, id: number, fieldsToUpdate: TProductUpdate) {
    const product = await this.model.update(
      { ...fieldsToUpdate },
      { where: { userId, id } }
    );
    return product;
  }

  async delete(userId: number, id: number) {
    const product = await this.model.destroy({ where: { userId, id } });
    return product;
  }

  async find(userId: number, param: TProductFind) {
    const product = await this.model.findAll({ where: { userId, ...param } });
    if (!product.length) throw new Error("Product not found");
    return product;
  }

  async nameAlreadyExist(userId: number, name: string) {
    const product = await this.model.findOne({ where: { userId, name } });
    console.log("adasd chegou");
    if (product) throw new Error("Name already registered");
    return;
  }

  async brandAlreadyExist(userId: number, brand: string) {
    const product = await this.model.findOne({ where: { userId, brand } });
    if (product) throw new Error("Brand already registered");
    return;
  }

  async modelAlreadyExist(userId: number, model: string) {
    const product = await this.model.findOne({ where: { userId, model } });
    if (product) throw new Error("Model already registered");
    return;
  }

  async getById(userId: number, id: number) {
    const product = await this.model.findOne({ where: { userId, id } });
    if (!product) throw new Error("Product not found");
    return product;
  }

  async validateUniqueFields(data: TProduct | Array<TProduct>) {
    if (Array.isArray(data)) {
      for (const { userId, name, brand, model } of data) {
        await this.nameAlreadyExist(userId, name);
        await this.brandAlreadyExist(userId, brand);
        await this.modelAlreadyExist(userId, model);
      }
    } else {
      await this.nameAlreadyExist(data.userId, data.name);
      await this.brandAlreadyExist(data.userId, data.brand);
      await this.modelAlreadyExist(data.userId, data.model);
    }
    return;
  }
}

export default ProductService;
