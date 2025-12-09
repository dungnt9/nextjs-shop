import axios from "axios";
import type { Order, CreateOrderRequest, UpdateOrderRequest } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_ORDER_API_URL || "http://localhost:6002/api/orders";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const orderService = {
  /**
   * Get all orders
   */
  getAll: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>("");
    return response.data;
  },

  /**
   * Get order by ID
   */
  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<Order>(`/${id}`);
    return response.data;
  },

  /**
   * Create a new order
   */
  create: async (data: CreateOrderRequest): Promise<Order> => {
    const payload = {
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      productId: Number(data.productId),
      quantity: Number(data.quantity),
    };
    const response = await apiClient.post<Order>("", payload);
    return response.data;
  },

  /**
   * Update an existing order
   */
  update: async (id: number, data: UpdateOrderRequest): Promise<Order> => {
    const payload = {
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      productId: Number(data.productId),
      quantity: Number(data.quantity),
    };
    const response = await apiClient.put<Order>(`/${id}`, payload);
    return response.data;
  },

  /**
   * Delete an order
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },
};
