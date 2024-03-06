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
}

export default ProductMiddleware;
