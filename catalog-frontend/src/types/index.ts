export interface ProductType {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Variant {
  id: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  sku: string;
  created_at: string;
  updated_at: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  productType: ProductType;
  variants: Variant[];
  addons?: Addon[];
}

export interface ProductType {
  id: string;
  name: string;
  products: Product[];
}

export interface Variant {
  id: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  sku: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}
