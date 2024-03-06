import { ModelStatic } from "sequelize";

import Product from "../database/models/Product";
import { TProduct } from "../utils/mapProductEntrie";

export type TProductUpdate = {
  name: string | undefined;
  brand: string | undefined;
  model: string | undefined;
  options: { price: number | null; color: string | null }[] | undefined;
};
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

  async update(id: number, fieldsToUpdate: TProductUpdate) {
    const product = await this.model.update(
      { ...fieldsToUpdate },
      { where: { id } }
    );
    return product;
  }

  async nameAlreadyExist(name: string) {
    const product = await this.model.findOne({ where: { name } });
    if (product) throw new Error("Name already registered");
    return;
  }

  async brandAlreadyExist(brand: string) {
    const product = await this.model.findOne({ where: { brand } });
    if (product) throw new Error("Brand already registered");
    return;
  }

  async modelAlreadyExist(model: string) {
    const product = await this.model.findOne({ where: { model } });
    if (product) throw new Error("Model already registered");
    return;
  }

  async getById(id: number) {
    const product = await this.model.findOne({ where: { id } });
    if (!product) throw new Error("Product not found");
    return product;
  }

  async validateUniqueFields(data: TProduct | Array<TProduct>) {
    if (Array.isArray(data)) {
      for (const { name, brand, model } of data) {
        await this.nameAlreadyExist(name);
        await this.brandAlreadyExist(brand);
        await this.modelAlreadyExist(model);
      }
    } else {
      await this.nameAlreadyExist(data.name);
      await this.brandAlreadyExist(data.brand);
      await this.modelAlreadyExist(data.model);
    }
    return;
  }
}

export default ProductService;
