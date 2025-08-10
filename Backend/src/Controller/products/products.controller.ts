import { Request, Response } from "express";
import {
  addProduct,
  addProductType,
  createAddon,
  createVariant,
  getAllProductTypes,
  listAllProductsPaginated,
  listProductsByType,
} from "./products.service"; // wherever your function is

export const addProductTypeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const addedProductType = await addProductType(req);

    if (addedProductType.status === 400) {
      res
        .status(addedProductType.status)
        .json({ message: addedProductType.message });
      return; // Early return if product type already exists
    }

    res.status(addedProductType.status).json({
      message: addedProductType.message,
      data: addedProductType.data,
    });
  } catch (error) {
    console.error(error);
    // Return the response here explicitly
    res.status(500).json({ message: "Server error" });
  }
};

export const addProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await addProduct(req);
    if (result.error) {
      res.status(400).json({ error: result.error });
      return; // Early return if there is an error
    }
    res
      .status(result.status || 201)
      .json({ message: result.message, product: result.product });
  } catch (error) {
    console.error("Error in addProductController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export async function addVariantController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const variant = await createVariant(req.body);
    res.status(201).json({ message: "Variant added successfully", variant });
  } catch (error: any) {
    console.error("Error adding variant:", error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function addAddon(req: Request, res: Response): Promise<void> {
  try {
    const { name, price, productId } = req.body;
    const addon = await createAddon({ name, price, productId });
    res.status(201).json({ message: "Addon added successfully", addon });
  } catch (error: any) {
    console.error("Error adding addon:", error);
    res.status(400).json({ error: error.message || "Internal Server Error" });
  }
}

export async function getAllProductsPaginated(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await listAllProductsPaginated(page, limit);

    res.status(200).json({
      message: "Products fetched successfully",
      ...result,
    });
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getProductsByType(req: Request, res: Response): Promise<void> {
  try {
    const productTypeName = req.params.type;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await listProductsByType(productTypeName, page, limit);

     res.status(200).json({
      message: `Products of type '${productTypeName}' fetched successfully`,
      ...result,
    });
  } catch (error: any) {
    console.error("Error fetching products by type:", error);
     res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
}

export async function getAllProductTypesController(req: Request, res: Response): Promise<void> {
  try {
    const productTypes = await getAllProductTypes();
     res.status(200).json({ productTypes });
  } catch (error) {
    console.error("Error fetching product types:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
}
