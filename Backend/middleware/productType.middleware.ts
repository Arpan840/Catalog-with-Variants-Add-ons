import { Request, Response, NextFunction } from "express";

export const addProductTypeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { name } = req.body;
    console.log("Middleware received name:", name);

    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return; // return after sending response
    }
    if (typeof name !== "string" || name.trim() === "") {
      res.status(400).json({ message: "Name must be a non-empty string" });
      return; // return after sending response
    }
    req.body.name = name.trim();
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
