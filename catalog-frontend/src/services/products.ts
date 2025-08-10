import api from "./api";
import { Product, ProductType } from "../types";

// src/services/products.ts
export async function fetchProductsByType(type: string): Promise<Product[]> {
  const response = await api.get<{
    message: string;
    data: Product[];
    total: number;
    page: number;
    last_page: number;
  }>(`/product/getProductsByType/${type}`);

  return response.data.data;
}


export async function fetchAllProducts(
  page: number,
  limit: number
): Promise<Product[]> {
  const response = await api.get<Product[]>(
    `/product/getAllProducts?page=${page}&limit=${limit}`
  );
  return response.data;
}

export async function fetchProductTypes(): Promise<ProductType[]> {
  const response = await api.get<{ productTypes: ProductType[] }>("/product/getAllProductTypes");
  return response.data.productTypes;  // <-- get the array inside the object
}

