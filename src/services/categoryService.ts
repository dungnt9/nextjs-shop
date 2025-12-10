import { apolloClient } from "@/lib/apolloClient";
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "@/graphql/queries";
import type {
  GetCategoriesResponse,
  GetCategoryResponse,
  CreateCategoryResponse,
  UpdateCategoryResponse,
} from "@/graphql/types";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types";

export const categoryService = {
  /**
   * Get all categories using GraphQL
   */
  getAll: async (): Promise<Category[]> => {
    const { data } = await apolloClient.query<GetCategoriesResponse>({
      query: GET_CATEGORIES,
    });

    return data!.categories.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      isActive: c.isActive,
      productCount: c.products?.length || 0,
      createdAt: c.createdAt,
    }));
  },

  /**
   * Get category by ID using GraphQL
   */
  getById: async (id: number): Promise<Category> => {
    const { data } = await apolloClient.query<GetCategoryResponse>({
      query: GET_CATEGORY,
      variables: { id },
    });

    const c = data!.category!;
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      isActive: c.isActive,
      createdAt: c.createdAt,
    };
  },

  /**
   * Create a new category using GraphQL mutation
   */
  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const { data: result } = await apolloClient.mutate<CreateCategoryResponse>({
      mutation: CREATE_CATEGORY,
      variables: {
        input: {
          name: data.name,
          description: data.description || "",
        },
      },
    });

    const c = result!.createCategory;
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      isActive: c.isActive,
      createdAt: c.createdAt,
    };
  },

  /**
   * Update an existing category using GraphQL mutation
   */
  update: async (
    id: number,
    data: UpdateCategoryRequest
  ): Promise<Category> => {
    const { data: result } = await apolloClient.mutate<UpdateCategoryResponse>({
      mutation: UPDATE_CATEGORY,
      variables: {
        input: {
          id,
          name: data.name,
          description: data.description || "",
          isActive: data.isActive,
        },
      },
    });

    const c = result!.updateCategory;
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      isActive: c.isActive,
      createdAt: c.createdAt,
    };
  },

  /**
   * Delete a category using GraphQL mutation
   */
  delete: async (id: number): Promise<void> => {
    await apolloClient.mutate({
      mutation: DELETE_CATEGORY,
      variables: { id },
    });
  },
};
