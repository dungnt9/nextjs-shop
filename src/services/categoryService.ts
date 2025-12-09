import axios from "axios";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_PRODUCT_API_URL?.replace(
    "/products",
    "/categories"
  ) || "http://localhost:6001/api/categories";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const categoryService = {
  /**
   * Get all categories
   */
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>("");
    return response.data;
  },

  /**
   * Get category by ID
   */
  getById: async (id: number): Promise<Category> => {
    const response = await apiClient.get<Category>(`/${id}`);
    return response.data;
  },

  /**
   * Create a new category
   */
  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const payload = {
      name: data.name,
      description: data.description || "",
    };
    const response = await apiClient.post<Category>("", payload);
    return response.data;
  },

  /**
   * Update an existing category
   */
  update: async (
    id: number,
    data: UpdateCategoryRequest
  ): Promise<Category> => {
    const payload = {
      name: data.name,
      description: data.description || "",
      isActive: data.isActive,
    };
    const response = await apiClient.put<Category>(`/${id}`, payload);
    return response.data;
  },

  /**
   * Delete a category
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },
};
