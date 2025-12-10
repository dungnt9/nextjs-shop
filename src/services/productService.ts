import { apolloClient } from "@/lib/apolloClient";
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "@/graphql/queries";
import type {
  GetProductsResponse,
  GetProductResponse,
  CreateProductResponse,
  UpdateProductResponse,
} from "@/graphql/types";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types";

export const productService = {
  /**
   * Get all products using GraphQL
   */
  getAll: async (): Promise<Product[]> => {
    const { data } = await apolloClient.query<GetProductsResponse>({
      query: GET_PRODUCTS,
    });

    return data!.products.map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      description: p.description,
      stock: p.stock,
      isActive: p.isActive,
      categoryId: p.categoryId,
      categoryName: p.category?.name || null,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  },

  /**
   * Get product by ID using GraphQL
   */
  getById: async (id: number): Promise<Product> => {
    const { data } = await apolloClient.query<GetProductResponse>({
      query: GET_PRODUCT,
      variables: { id },
    });

    const p = data!.product!;
    return {
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      description: p.description,
      stock: p.stock,
      isActive: p.isActive,
      categoryId: p.categoryId,
      categoryName: p.category?.name || null,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  },

  /**
   * Create a new product using GraphQL mutation
   */
  create: async (data: CreateProductRequest): Promise<Product> => {
    const { data: result } = await apolloClient.mutate<CreateProductResponse>({
      mutation: CREATE_PRODUCT,
      variables: {
        input: {
          name: data.name,
          brand: data.brand,
          price: Number(data.price),
          description: data.description || "",
          stock: Number(data.stock),
          categoryId: data.categoryId || 0,
        },
      },
    });

    const p = result!.createProduct;
    return {
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      description: p.description,
      stock: p.stock,
      isActive: p.isActive,
      categoryId: p.categoryId,
      categoryName: p.category?.name || null,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt || null,
    };
  },

  /**
   * Update an existing product using GraphQL mutation
   */
  update: async (id: number, data: UpdateProductRequest): Promise<Product> => {
    const { data: result } = await apolloClient.mutate<UpdateProductResponse>({
      mutation: UPDATE_PRODUCT,
      variables: {
        input: {
          id,
          name: data.name,
          brand: data.brand,
          price: Number(data.price),
          description: data.description || "",
          stock: Number(data.stock),
          categoryId: data.categoryId || 0,
          isActive: data.isActive,
        },
      },
    });

    const p = result!.updateProduct;
    return {
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      description: p.description,
      stock: p.stock,
      isActive: p.isActive,
      categoryId: p.categoryId,
      categoryName: p.category?.name || null,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  },

  /**
   * Delete a product using GraphQL mutation
   */
  delete: async (id: number): Promise<void> => {
    await apolloClient.mutate({
      mutation: DELETE_PRODUCT,
      variables: { id },
    });
  },
};
