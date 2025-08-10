import { AppDataSource } from "../../dataSource";
import { ProductType } from "../../entities/ProductType";
import { Product } from "../../entities/Product";
import { Request } from "express";
import { Variant } from "../../entities/Variant";
import { Addon } from "../../entities/Addon";

const ProductTyperepo = AppDataSource.getRepository(ProductType);
const ProductRepo = AppDataSource.getRepository(Product);
const variantRepo = AppDataSource.getRepository(Variant);
const addonRepo = AppDataSource.getRepository(Addon);

// products.service.ts for products
export async function addProductType(
  req: Request
): Promise<{ message: string; status: number; data?: ProductType }> {
  try {
    const { name } = req.body;

    const existing = await ProductTyperepo.findOneBy({ name });
    if (existing) {
      return { message: "Product type already exists", status: 400 }; // Return early if product type already exists
    }

    const newProductType = ProductTyperepo.create({ name });
    await ProductTyperepo.save(newProductType);

    return {
      message: "Product type added successfully",
      status: 201,
      data: newProductType,
    };
  } catch (error: any) {
    console.error("Error adding product type:", error);
    return { message: error.message, status: error.status || 500 }; // Return error response
  }
}

export async function addProduct(req: Request) {
  try {
    const { name, description, images, productTypeId } = req.body;

    // Get the ProductType ProductTyperepo and find the type by id
    const productType = await ProductTyperepo.findOneBy({ id: productTypeId });

    if (!productType) {
      return { error: "Invalid productTypeId. Product type not found." };
    }

    // Create a new product entity
    const newProduct = ProductRepo.create({
      name,
      description,
      images,
      productType,
    });

    // Save the product
    await ProductRepo.save(newProduct);

    return {
      message: "Product added successfully",
      product: {
        ...newProduct,
        images: newProduct.images.map(
          (image: string) => process.env.BASEURL + image
        ),
      },
      status: 201,
    };
  } catch (error: any) {
    console.error("Error adding product:", error);
    return { error: error.message, status: error.status || 500 };
  }
}

export async function createVariant(data: {
  productId: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  sku: string;
}) {
  try {
    const { productId, size, color, price, stock, sku } = data;

    // Find the product
    const product = await ProductRepo.findOneBy({ id: productId });
    if (!product) {
      throw new Error("Product not found");
    }

    // Check SKU uniqueness
    const existingSku = await variantRepo.findOneBy({ sku });
    if (existingSku) {
      throw new Error("SKU must be unique. This SKU already exists.");
    }

    const variant = variantRepo.create({
      size,
      color,
      price,
      stock,
      sku,
      product,
    });

    await variantRepo.save(variant);
    if (variant?.product?.images) {
      variant.product.images = variant.product.images.map(
        (image: string) => process.env.BASEURL + image
      );
    }

    return variant;
  } catch (error: any) {
    console.error("Error creating variant:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}

export async function createAddon(data: {
  name: string;
  price: number;
  productId: string;
}) {
  try {
    const { name, price, productId } = data;

    // Find product to link addon to
    const product = await ProductRepo.findOne({
      where: { id: productId },
      relations: ["productType"],
    });
    if (!product) {
      throw new Error("Product not found");
    }

    // Optionally: Check if product's productType is Food (if you have such logic)
    if (product.productType.name.toLowerCase() !== "food") {
      throw new Error("Add-ons can only be added to Food products");
    }

    const addon = addonRepo.create({
      name,
      price,
      product,
    });

    await addonRepo.save(addon);
    if (addon?.product?.images) {
      addon.product.images = addon.product.images.map(
        (image: string) => process.env.BASEURL + image
      );
    }
    return addon;
  } catch (error: any) {
    console.error("Error creating addon:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}

export async function listAllProductsPaginated(page: number, limit: number) {
  try {
    const productRepo = AppDataSource.getRepository(Product);

    const [products, total] = await productRepo.findAndCount({
      relations: ["productType", "variants", "addons"],
      order: { created_at: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: products.map((products) => ({
        ...products,
        images: products.images.map(
          (image: string) => process.env.BASEURL + image
        ),
      })),
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  } catch (error: any) {
    console.error("Error listing products with pagination:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}

export async function listProductsByType(
  productTypeName: string,
  page: number,
  limit: number
) {
  try {
    const productRepo = AppDataSource.getRepository(Product);

    // Find the product type by name (case-insensitive)
    const productTypeRepo = AppDataSource.getRepository(ProductType);
    const productType = await productTypeRepo.findOne({
      where: { name: productTypeName },
    });

    if (!productType) {
      throw new Error(`Product type '${productTypeName}' not found`);
    }

    const [products, total] = await productRepo.findAndCount({
      where: { productType: { id: productType.id } },
      relations: ["productType", "variants", "addons"],
      order: { created_at: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: products.map((product) => ({
        ...product,
        images: product.images.map(
          (image: string) => process.env.BASEURL + image
        ),
      })),
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  } catch (error: any) {
    console.error("Error listing products by type:", error);
    throw new Error(error.message || "Internal Server Error");
  }
}

export async function getAllProductTypes() {
 try {
   let productTypeData = await ProductTyperepo.find(
    {
      relations: ["products", "products.variants", "products.addons"],
      order: { created_at: "DESC" },
    }
   );
    productTypeData = productTypeData.map((type) => ({
      ...type,
      products: type.products.map((product) => ({
        ...product,
        images: product.images.map(
          (image: string) => process.env.BASEURL + image
        ),
      })),
    }));
    return productTypeData;
 } catch (error: any) {
    console.error("Error fetching product types:", error);
    throw new Error(error.message || "Internal Server Error");
  
 }
}
