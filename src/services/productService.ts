import axios from "axios";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_PRODUCT_API_URL ||
  "http://localhost:6001/api/products";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productService = {
  /**
   * Get all products
   */
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("");
    return response.data;
  },

  /**
   * Get product by ID
   */
  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/${id}`);
    return response.data;
  },

  /**
   * Create a new product
   */
  create: async (data: CreateProductRequest): Promise<Product> => {
    const payload = {
      name: data.name,
      brand: data.brand,
      price: Number(data.price),
      description: data.description || "",
      stock: Number(data.stock),
      categoryId: data.categoryId || null,
    };
    const response = await apiClient.post<Product>("", payload);
    return response.data;
  },

  /**
   * Update an existing product
   */
  update: async (id: number, data: UpdateProductRequest): Promise<Product> => {
    const payload = {
      name: data.name,
      brand: data.brand,
      price: Number(data.price),
      description: data.description || "",
      stock: Number(data.stock),
      categoryId: data.categoryId || null,
      isActive: data.isActive,
    };
    const response = await apiClient.put<Product>(`/${id}`, payload);
    return response.data;
  },

  /**
   * Delete a product
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },
};
