import { Request, Response, NextFunction } from "express";

export function validateAddVariant(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const { productId, size, color, price, stock, sku } = req.body;

    if (!productId || typeof productId !== "string") {
      res
        .status(400)
        .json({ error: "productId is required and must be a string." });
      return; // Early return if productId is invalid
    }
    if (!size || typeof size !== "string") {
      res.status(400).json({ error: "size is required and must be a string." });
      return; // Early return if size is invalid
    }
    if (!color || typeof color !== "string") {
      res
        .status(400)
        .json({ error: "color is required and must be a string." });
      return; // Early return if color is invalid
    }
    if (price === undefined || typeof price !== "number" || price < 0) {
      res.status(400).json({
        error: "price is required and must be a non-negative number.",
      });
      return; // Early return if price is invalid
    }
    if (stock === undefined || !Number.isInteger(stock) || stock < 0) {
      res.status(400).json({
        error: "stock is required and must be a non-negative integer.",
      });
      return; // Early return if stock is invalid
    }
    if (!sku || typeof sku !== "string") {
      res.status(400).json({ error: "sku is required and must be a string." });
      return; // Early return if sku is invalid
    }

    next();
  } catch (error) {
    console.error("Error validating Add Variant input:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error while validating input." });
  }
}
