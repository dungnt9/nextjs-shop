// Category types
export interface Category {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description?: string;
  isActive: boolean;
}

// Product types
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  stock: number;
  isActive: boolean;
  categoryId: number | null;
  categoryName: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateProductRequest {
  name: string;
  brand: string;
  price: number;
  description?: string;
  stock: number;
  categoryId?: number;
}

export interface UpdateProductRequest {
  name: string;
  brand: string;
  price: number;
  description?: string;
  stock: number;
  categoryId?: number;
  isActive: boolean;
}

// Order types
export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string | null;
}

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Completed"
  | "Cancelled";

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

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
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
  categoryId?: number;
  isActive?: boolean;
}

export interface OrderFormValues {
  customerName: string;
  customerEmail: string;
  productId: number;
  quantity: number;
}

export interface CategoryFormValues {
  name: string;
  description?: string;
  isActive?: boolean;
}
