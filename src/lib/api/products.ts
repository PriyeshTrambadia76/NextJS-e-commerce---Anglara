import type { Product } from "@/lib/types/product";

const BASE = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to load products");
  }
  return res.json() as Promise<Product[]>;
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to load product");
  }
  return res.json() as Promise<Product>;
}
