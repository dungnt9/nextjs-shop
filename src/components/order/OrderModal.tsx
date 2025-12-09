"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, message } from "antd";
import { orderService } from "@/services/orderService";
import { productService } from "@/services/productService";
import type { Order, OrderFormValues, Product } from "@/types";

interface OrderModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  order: Order | null;
}

export default function OrderModal({
  visible,
  onCancel,
  onSuccess,
  order,
}: OrderModalProps) {
  const [form] = Form.useForm<OrderFormValues>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const isEdit = !!order;

  useEffect(() => {
    if (visible) {
      fetchProducts();

      if (isEdit && order) {
        form.setFieldsValue({
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          productId: order.productId,
          quantity: order.quantity,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, order, form, isEdit]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      message.error("Failed to fetch products");
    }
    setLoadingProducts(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit && order) {
        await orderService.update(order.id, values);
        message.success("Order updated successfully");
      } else {
        await orderService.create(values);
        message.success("Order created successfully");
      }

      onSuccess();
    } catch (error) {
      console.error("Operation failed:", error);
      message.error("Operation failed");
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit Order" : "Add Order"}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={isEdit ? "Update" : "Create"}
      destroyOnClose
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input placeholder="Enter customer name" />
        </Form.Item>

        <Form.Item
          name="customerEmail"
          label="Customer Email"
          rules={[
            { required: true, message: "Please enter customer email" },
            { type: "email", message: "Please enter valid email" },
          ]}
        >
          <Input placeholder="Enter customer email" />
        </Form.Item>

        <Form.Item
          name="productId"
          label="Product"
          rules={[{ required: true, message: "Please select a product" }]}
        >
          <Select
            placeholder="Select a product"
            loading={loadingProducts}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {products.map((product) => (
              <Select.Option key={product.id} value={product.id}>
                {product.name} - ${product.price.toFixed(2)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please enter quantity" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter quantity"
            min={1}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
