"use client";

import { MainLayout } from "@/components/layout";
import { ProductList } from "@/components/product";
import { Typography } from "antd";

const { Title } = Typography;

export default function ProductsPage() {
  return (
    <MainLayout>
      <Title level={3} style={{ marginBottom: 24 }}>
        Product Management
      </Title>
      <ProductList />
    </MainLayout>
  );
}
