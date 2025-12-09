"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Space, Tag, message, Popconfirm, Dropdown } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import dayjs from "dayjs";
import { orderService } from "@/services/orderService";
import OrderModal from "./OrderModal";
import type { Order, OrderStatus } from "@/types";

// Status color mapping
const statusColors: Record<OrderStatus, string> = {
  Pending: "gold",
  Processing: "blue",
  Shipped: "cyan",
  Completed: "green",
  Cancelled: "red",
};

// Status flow: what status can transition to what
const statusFlow: Record<OrderStatus, OrderStatus[]> = {
  Pending: ["Processing", "Cancelled"],
  Processing: ["Shipped", "Cancelled"],
  Shipped: ["Completed"],
  Completed: [],
  Cancelled: [],
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      message.error("Failed to fetch orders");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCreate = () => {
    setEditingOrder(null);
    setModalVisible(true);
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await orderService.delete(id);
      message.success("Order deleted successfully");
      fetchOrders();
    } catch (error) {
      console.error("Failed to delete order:", error);
      message.error("Failed to delete order");
    }
  };

  const handleModalSuccess = () => {
    setModalVisible(false);
    fetchOrders();
  };

  const handleUpdateStatus = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      message.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      message.error("Failed to update order status");
    }
  };

  const getStatusMenuItems = (order: Order): MenuProps["items"] => {
    const availableStatuses = statusFlow[order.status];
    if (availableStatuses.length === 0) return [];

    return availableStatuses.map((status) => ({
      key: status,
      label: status,
      onClick: () => handleUpdateStatus(order.id, status),
    }));
  };

  const columns: ColumnsType<Order> = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id: number) => `#${id}`,
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      ellipsis: true,
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      width: 60,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => (
        <span style={{ fontWeight: 500 }}>${amount.toFixed(2)}</span>
      ),
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: OrderStatus, record: Order) => {
        const menuItems = getStatusMenuItems(record);
        const tag = (
          <Tag color={statusColors[status] || "default"}>{status}</Tag>
        );

        if (!menuItems || menuItems.length === 0) {
          return tag;
        }

        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Button type="text" size="small" style={{ padding: 0 }}>
              {tag} <DownOutlined style={{ fontSize: 10 }} />
            </Button>
          </Dropdown>
        );
      },
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Processing", value: "Processing" },
        { text: "Shipped", value: "Shipped" },
        { text: "Completed", value: "Completed" },
        { text: "Cancelled", value: "Cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={
              record.status === "Completed" || record.status === "Cancelled"
            }
          />
          <Popconfirm
            title="Delete Order"
            description="Are you sure you want to delete this order?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              disabled={
                record.status === "Shipped" || record.status === "Completed"
              }
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add Order
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      <OrderModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={handleModalSuccess}
        order={editingOrder}
      />
    </div>
  );
}
