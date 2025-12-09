"use client";

import React from "react";
import { Layout, Menu } from "antd";
import {
  ShoppingOutlined,
  ShopOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link href="/">Home</Link>,
    },
    {
      key: "/products",
      icon: <ShoppingOutlined />,
      label: <Link href="/products">Products</Link>,
    },
    {
      key: "/orders",
      icon: <ShopOutlined />,
      label: <Link href="/orders">Orders</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
          Management System
        </h1>
        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ flex: 1, border: "none" }}
        />
      </Header>

      <Content style={{ padding: "24px" }}>{children}</Content>
    </Layout>
  );
}
