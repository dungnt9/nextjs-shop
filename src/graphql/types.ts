// GraphQL response types for Product queries
export interface GraphQLProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  stock: number;
  isActive: boolean;
  categoryId: number;
  category: {
    id: number;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetProductsResponse {
  products: GraphQLProduct[];
}

export interface GetProductResponse {
  product: GraphQLProduct | null;
}

export interface CreateProductResponse {
  createProduct: GraphQLProduct;
}

export interface UpdateProductResponse {
  updateProduct: GraphQLProduct;
}

export interface DeleteProductResponse {
  deleteProduct: boolean;
}

// GraphQL response types for Category queries
export interface GraphQLCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
  products?: { id: number; name?: string }[];
}

export interface GetCategoriesResponse {
  categories: GraphQLCategory[];
}

export interface GetCategoryResponse {
  category: GraphQLCategory | null;
}

export interface CreateCategoryResponse {
  createCategory: GraphQLCategory;
}

export interface UpdateCategoryResponse {
  updateCategory: GraphQLCategory;
}

export interface DeleteCategoryResponse {
  deleteCategory: boolean;
}
