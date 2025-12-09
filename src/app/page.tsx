"use client";

import { MainLayout } from "@/components/layout";
import { Card, Typography, Row, Col, Statistic } from "antd";
import {
  ShoppingOutlined,
  ShopOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <MainLayout>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Title level={2}>Welcome to Shop Management System</Title>
        <Paragraph style={{ fontSize: 16, marginBottom: 32 }}>
          Manage your products and orders efficiently with our modern management
          system.
        </Paragraph>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={8}>
            <Link href="/products">
              <Card hoverable style={{ textAlign: "center" }}>
                <Statistic
                  title="Products"
                  value="Manage"
                  prefix={
                    <ShoppingOutlined
                      style={{ fontSize: 32, color: "#1890ff" }}
                    />
                  }
                />
                <Paragraph style={{ marginTop: 16, color: "#666" }}>
                  Add, edit, and manage your product inventory
                </Paragraph>
              </Card>
            </Link>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Link href="/orders">
              <Card hoverable style={{ textAlign: "center" }}>
                <Statistic
                  title="Orders"
                  value="Manage"
                  prefix={
                    <ShopOutlined style={{ fontSize: 32, color: "#52c41a" }} />
                  }
                />
                <Paragraph style={{ marginTop: 16, color: "#666" }}>
                  View and process customer orders
                </Paragraph>
              </Card>
            </Link>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card style={{ textAlign: "center" }}>
              <Statistic
                title="Real-time Updates"
                value="Active"
                prefix={
                  <DollarOutlined style={{ fontSize: 32, color: "#faad14" }} />
                }
              />
              <Paragraph style={{ marginTop: 16, color: "#666" }}>
                Get instant notifications for new orders
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
