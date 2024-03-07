import { NextFunction, Request, Response } from "express";

class ProductMiddleware {
  async hasId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!+id)
      return res
        .status(400)
        .json({ message: "Invalid param: Id should be a number" });
    return next();
  }
  async hasSomeDifferentField(req: Request, res: Response, next: NextFunction) {
    const { query } = req;
    const fields = Object.keys(query);
    const allowedFields = ["name", "brand", "model", "id"];
    if (!query) return next();
    if (fields.some((field) => !allowedFields.includes(field))) {
      return res.status(400).json({
        message: `Invalid param: should be name, brand, model or id `,
      });
    }
    return next();
  }
}

export default ProductMiddleware;
