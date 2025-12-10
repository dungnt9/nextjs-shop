import { gql } from "@apollo/client";

// ==================== PRODUCT QUERIES ====================

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      brand
      price
      description
      stock
      isActive
      categoryId
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      id
      name
      brand
      price
      description
      stock
      isActive
      categoryId
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

// ==================== CATEGORY QUERIES ====================

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
      isActive
      createdAt
      updatedAt
      products {
        id
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: Int!) {
    category(id: $id) {
      id
      name
      description
      isActive
      createdAt
      updatedAt
      products {
        id
        name
      }
    }
  }
`;

// ==================== PRODUCT MUTATIONS ====================

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      brand
      price
      description
      stock
      isActive
      categoryId
      category {
        id
        name
      }
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      brand
      price
      description
      stock
      isActive
      categoryId
      category {
        id
        name
      }
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;

// ==================== CATEGORY MUTATIONS ====================

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      description
      isActive
      createdAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      id
      name
      description
      isActive
      updatedAt
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;
