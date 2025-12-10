# Next.js Shop Management System

Modern shop management system built with Next.js 15, TypeScript, Ant Design, and **GraphQL**.

## Features

- 📦 **Product Management**: Full CRUD operations for products
- 📂 **Category Management**: Organize products by categories
- 🛒 **Order Management**: Create and manage customer orders
- 🔔 **Real-time Notifications**: Socket.IO integration for instant updates
- 🎨 **Modern UI**: Ant Design components with responsive layout
- 🔒 **Type Safety**: Full TypeScript support
- ⚡ **App Router**: Next.js 15 App Router for optimal performance
- 🚀 **GraphQL**: Apollo Client for efficient data fetching

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: Ant Design 5
- **API Client**: Apollo Client (GraphQL)
- **Real-time**: Socket.IO Client
- **Notifications**: React Hot Toast
- **Date Handling**: Day.js

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── products/
│   │   └── page.tsx        # Products page
│   ├── categories/
│   │   └── page.tsx        # Categories page
│   └── orders/
│       └── page.tsx        # Orders page
├── components/             # React components
│   ├── layout/             # Layout components
│   ├── product/            # Product-related components
│   ├── category/           # Category-related components
│   ├── order/              # Order-related components
│   └── notifications/      # Notification components
├── contexts/               # React contexts
│   └── SocketContext.tsx   # Socket.IO context with typed events
├── graphql/                # GraphQL queries & types
│   ├── queries.ts          # GraphQL queries and mutations
│   └── types.ts            # GraphQL response types
├── lib/                    # Utility libraries
│   └── apolloClient.ts     # Apollo Client configuration
├── providers/              # App providers
│   ├── AntdProvider.tsx    # Ant Design provider
│   └── AppProvider.tsx     # Main app provider
├── services/               # API services (using GraphQL)
│   ├── productService.ts   # Product GraphQL operations
│   ├── categoryService.ts  # Category GraphQL operations
│   └── orderService.ts     # Order REST API calls
└── types/                  # TypeScript type definitions
    └── index.ts            # All types
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend services running:
  - Product Service (port 6001)
  - Order Service (port 6002)
  - Socket.IO Server (port 5001)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:6001/graphql
NEXT_PUBLIC_ORDER_API_URL=http://localhost:6002/api/orders
NEXT_PUBLIC_SOCKET_URL=http://localhost:5001
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### App Router

This project uses Next.js 15 App Router with:

- Server Components by default
- Client Components for interactive features (marked with `'use client'`)
- Layout-based routing

### State Management

- **Local State**: React useState for component state
- **Context**: Socket.IO connection management
- **Server State**: Direct API calls with loading states

### Type Safety

Full TypeScript coverage with:

- Interface definitions for all data models
- Type-safe API responses
- Proper event typing for Socket.IO

## API Integration

The app connects to backend services using **GraphQL** and REST:

### 1. Product Service (GraphQL) - `http://localhost:6001/graphql`

**Queries:**

```graphql
# Get all products
query GetProducts {
  products {
    id
    name
    brand
    price
    stock
    isActive
    category {
      id
      name
    }
  }
}

# Get single product
query GetProduct($id: Int!) {
  product(id: $id) {
    id
    name
    brand
    price
    description
    stock
  }
}

# Get all categories
query GetCategories {
  categories {
    id
    name
    description
    isActive
  }
}
```

**Mutations:**

```graphql
# Create product
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
  }
}

# Update product
mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    id
    name
  }
}

# Delete product
mutation DeleteProduct($id: Int!) {
  deleteProduct(id: $id)
}
```

### 2. Order Service (REST) - `http://localhost:6002/api/orders`

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/`           | List all orders     |
| GET    | `/:id`        | Get order by ID     |
| POST   | `/`           | Create order        |
| PUT    | `/:id`        | Update order        |
| PATCH  | `/:id/status` | Update order status |
| DELETE | `/:id`        | Delete order        |

## Real-time Features

Socket.IO events (typed with TypeScript):

- `ORDER_CREATED` - Notification when a new order is created

```typescript
interface OrderCreatedEventData {
  message: string;
  data: {
    customerName: string;
    productName: string;
    totalAmount: number;
  };
}
```

## GraphQL Integration

This project uses Apollo Client for GraphQL operations:

```typescript
// Example: Fetching products with GraphQL
const { data } = await apolloClient.query({
  query: GET_PRODUCTS,
});

// Example: Creating a product with GraphQL
const { data } = await apolloClient.mutate({
  mutation: CREATE_PRODUCT,
  variables: {
    input: { name, brand, price, stock, categoryId },
  },
});
```

### Benefits of GraphQL:

- ✅ **Efficient data fetching** - Get exactly what you need
- ✅ **Type safety** - Auto-generated types from schema
- ✅ **Single endpoint** - All operations through `/graphql`
- ✅ **Built-in playground** - Test queries at `/graphql`
