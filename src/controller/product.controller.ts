import { NextFunction, Request, Response } from "express";

import ProductService from "../services/product.service";
import {
  TProduct,
  TProductTypeOne,
  TProductTypeThree,
  TProductTypeTwo,
  formatTypeOne,
  formatTypeThree,
  formatTypeTwo,
  typeOfContent,
} from "../utils/mapProductEntrie";

class ProductController {
  private service: ProductService = new ProductService();

  async create(req: Request, resp: Response, next: NextFunction) {
    try {
      const { body } = req;
      const mapTypeOfContent = {
        1: (body: TProductTypeOne) => formatTypeOne(body),
        2: (body: TProductTypeTwo) => formatTypeTwo(body),
        3: (body: Array<TProductTypeThree>) => formatTypeThree(body),
      };
      const productFormatted = mapTypeOfContent[typeOfContent(body)](body);

      await this.service.validateUniqueFields(productFormatted);

      if (Array.isArray(productFormatted)) {
        const products = await this.service.createMany(
          productFormatted as Array<TProduct>
        );
        return resp
          .status(200)
          .json({ message: "Product created", data: products });
      }

      const product = await this.service.create(productFormatted as TProduct);
      return resp
        .status(200)
        .json({ message: "Product created", data: product });
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, resp: Response, next: NextFunction) {
    try {
      const {
        body: { id, ...fieldsToUpdate },
      } = req;
      await this.service.getById(id);
      const [product] = await this.service.update(id, fieldsToUpdate);
      if (!product) throw new Error("Error when updating product");
      return resp
        .status(200)
        .json({ message: "Product updated", data: product });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
