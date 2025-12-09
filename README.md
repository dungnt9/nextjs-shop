# Next.js Shop Management System

Modern shop management system built with Next.js 15, TypeScript, and Ant Design.

## Features

- 📦 **Product Management**: Full CRUD operations for products
- 🛒 **Order Management**: Create and manage customer orders
- 🔔 **Real-time Notifications**: Socket.IO integration for instant updates
- 🎨 **Modern UI**: Ant Design components with responsive layout
- 🔒 **Type Safety**: Full TypeScript support
- ⚡ **App Router**: Next.js 15 App Router for optimal performance

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: Ant Design 5
- **HTTP Client**: Axios
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
│   └── orders/
│       └── page.tsx        # Orders page
├── components/             # React components
│   ├── layout/             # Layout components
│   ├── product/            # Product-related components
│   ├── order/              # Order-related components
│   └── notifications/      # Notification components
├── contexts/               # React contexts
│   └── SocketContext.tsx   # Socket.IO context
├── providers/              # App providers
│   ├── AntdProvider.tsx    # Ant Design provider
│   └── AppProvider.tsx     # Main app provider
├── services/               # API services
│   ├── productService.ts   # Product API calls
│   └── orderService.ts     # Order API calls
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
NEXT_PUBLIC_PRODUCT_API_URL=http://localhost:6001/api/products
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

The app connects to two backend services:

1. **Product Service** (`/api/products`)

   - GET / - List all products
   - GET /:id - Get product by ID
   - POST / - Create product
   - PUT /:id - Update product
   - DELETE /:id - Delete product

2. **Order Service** (`/api/orders`)
   - GET / - List all orders
   - GET /:id - Get order by ID
   - POST / - Create order
   - PUT /:id - Update order
   - DELETE /:id - Delete order

## Real-time Features

Socket.IO events:

- `ORDER_CREATED` - Notification when a new order is created
