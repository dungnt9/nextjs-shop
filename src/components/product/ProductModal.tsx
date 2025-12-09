"use client";

import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Switch, message } from "antd";
import { productService } from "@/services/productService";
import type { Product, ProductFormValues, Category } from "@/types";

interface ProductModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  product: Product | null;
  categories: Category[];
}

export default function ProductModal({
  visible,
  onCancel,
  onSuccess,
  product,
  categories,
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
          categoryId: product.categoryId || undefined,
          isActive: product.isActive,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ isActive: true });
      }
    }
  }, [visible, product, form, isEdit]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit && product) {
        await productService.update(product.id, {
          ...values,
          isActive: values.isActive ?? true,
        });
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
      width={600}
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

        <Form.Item name="categoryId" label="Category">
          <Select
            allowClear
            placeholder="Select category"
            showSearch
            optionFilterProp="children"
          >
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div style={{ display: "flex", gap: 16 }}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
            style={{ flex: 1 }}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter price"
              min={0}
              step={0.01}
              precision={2}
              prefix="$"
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please enter stock" }]}
            style={{ flex: 1 }}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter stock"
              min={0}
            />
          </Form.Item>
        </div>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>

        {isEdit && (
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
