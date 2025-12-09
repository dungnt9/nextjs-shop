"use client";

import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, message } from "antd";
import { productService } from "@/services/productService";
import type { Product, ProductFormValues } from "@/types";

interface ProductModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  product: Product | null;
}

export default function ProductModal({
  visible,
  onCancel,
  onSuccess,
  product,
}: ProductModalProps) {
  const [form] = Form.useForm<ProductFormValues>();
  const isEdit = !!product;

  useEffect(() => {
    if (visible) {
      if (isEdit && product) {
        form.setFieldsValue({
          name: product.name,
          brand: product.brand,
          price: product.price,
          description: product.description,
          stock: product.stock,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, product, form, isEdit]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit && product) {
        await productService.update(product.id, values);
        message.success("Product updated successfully");
      } else {
        await productService.create(values);
        message.success("Product created successfully");
      }

      onSuccess();
    } catch (error) {
      console.error("Operation failed:", error);
      message.error("Operation failed");
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit Product" : "Add Product"}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={isEdit ? "Update" : "Create"}
      destroyOnClose
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please enter brand" }]}
        >
          <Input placeholder="Enter brand" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter price"
            min={0}
            step={0.01}
            precision={2}
          />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: "Please enter stock" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter stock"
            min={0}
          />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
