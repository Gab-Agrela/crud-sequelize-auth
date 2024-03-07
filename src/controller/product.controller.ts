import { NextFunction, Request, Response } from "express";

import ProductService, { TProductFind } from "../services/product.service";
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
      const { userId } = resp.locals;
      const mapTypeOfContent = {
        1: (body: TProductTypeOne) => formatTypeOne(userId, body),
        2: (body: TProductTypeTwo) => formatTypeTwo(userId, body),
        3: (body: Array<TProductTypeThree>) => formatTypeThree(userId, body),
      };
      const productFormatted = mapTypeOfContent[typeOfContent(body)](body);
      console.log(productFormatted);

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
      const { userId } = resp.locals;

      await this.service.getById(userId, id);

      const [product] = await this.service.update(userId, id, fieldsToUpdate);
      if (!product) throw new Error("Error when updating product");

      return resp
        .status(200)
        .json({ message: "Product updated", data: product });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = resp.locals;
      const convertedIdToNumber = +id;
      await this.service.getById(userId, convertedIdToNumber);

      const product = await this.service.delete(userId, convertedIdToNumber);

      return resp
        .status(200)
        .json({ message: "Product deleted", data: product });
    } catch (error) {
      next(error);
    }
  }
  async read(req: Request, resp: Response, next: NextFunction) {
    try {
      const { query } = req;
      const { userId } = resp.locals;
      const product = await this.service.find(userId, query as TProductFind);

      return resp.status(200).json({ message: "Product found", data: product });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
