"use client";

import { MainLayout } from "@/components/layout";
import { OrderList } from "@/components/order";
import { Typography } from "antd";

const { Title } = Typography;

export default function OrdersPage() {
  return (
    <MainLayout>
      <Title level={3} style={{ marginBottom: 24 }}>
        Order Management
      </Title>
      <OrderList />
    </MainLayout>
  );
}
