import { Request, Response, NextFunction } from "express";

export function validateAddProductInput(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const { name, description, images, productTypeId } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      res
        .status(400)
        .json({
          error: "Product name is required and must be a non-empty string.",
        });
      return; // Early return if name is invalid
    }

    if (description !== undefined && typeof description !== "string") {
      res.status(400).json({ error: "Description must be a string." });
      return; // Early return if description is invalid
    }

    if (images !== undefined) {
      if (!Array.isArray(images)) {
        res.status(400).json({ error: "Images must be an array of strings." });
        return; // Early return if images is not an array
      }
      for (const img of images) {
        if (typeof img !== "string") {
          res
            .status(400)
            .json({ error: "Each image must be a string (URL or path)." });
          return; // Early return if any image is not a string
        }
      }
    }

    if (
      !productTypeId ||
      typeof productTypeId !== "string" ||
      productTypeId.trim() === ""
    ) {
      res
        .status(400)
        .json({
          error:
            "productTypeId is required and must be a non-empty string (UUID).",
        });
      return; // Early return if productTypeId is invalid
    }

    next();
  } catch (error) {
    console.error("Error validating Add Product input:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error while validating input." });
  }
}
