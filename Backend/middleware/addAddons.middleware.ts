import { Request, Response, NextFunction } from "express";

export function validateAddon(req: Request, res: Response, next: NextFunction): void {
  try {
    const { name, price, productId } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
       res
        .status(400)
        .json({
          error: "Addon name is required and must be a non-empty string",
        });
    }

    if (price === undefined || typeof price !== "number" || price < 0) {
       res
        .status(400)
        .json({
          error: "Addon price is required and must be a non-negative number",
        });
    }

    if (!productId || typeof productId !== "string") {
       res
        .status(400)
        .json({ error: "productId is required and must be a string" });
    }

    next();
  } catch (error) {
    console.error("Error validating addon input:", error);
     res
      .status(500)
      .json({ error: "Internal Server Error while validating input." });
  }
}
