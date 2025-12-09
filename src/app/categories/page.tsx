"use client";

import { MainLayout } from "@/components/layout";
import CategoryList from "@/components/category/CategoryList";
import { Typography } from "antd";

const { Title } = Typography;

export default function CategoriesPage() {
  return (
    <MainLayout>
      <Title level={3} style={{ marginBottom: 24 }}>
        Category Management
      </Title>
      <CategoryList />
    </MainLayout>
  );
}
