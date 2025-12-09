// Product types
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  brand: string;
  price: number;
  description?: string;
  stock: number;
}

export interface UpdateProductRequest {
  name: string;
  brand: string;
  price: number;
  description?: string;
  stock: number;
}

// Order types
export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  productId: number;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = "Pending" | "Processing" | "Completed" | "Cancelled";

export interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  productId: number;
  quantity: number;
}

export interface UpdateOrderRequest {
  customerName: string;
  customerEmail: string;
  productId: number;
  quantity: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Socket event types
export interface OrderCreatedEvent {
  message: string;
  data: {
    customerName: string;
    productName: string;
    totalAmount: number;
  };
}

// Form types for modals
export interface ProductFormValues {
  name: string;
  brand: string;
  price: number;
  description?: string;
  stock: number;
}

export interface OrderFormValues {
  customerName: string;
  customerEmail: string;
  productId: number;
  quantity: number;
}
