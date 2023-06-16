import React from "react";
import { Button, Form, InputNumber, Popover, Table } from "antd";

interface AddToCartFormProps {
  product: any;
}
export const AddToCartForm: React.FC<AddToCartFormProps> = ({ product }) => {
  const items = product.attributes.items.data;
  return (
    <Form
      name="basic"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
      // initialValues={{
      //   remember: true,
      // }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {items.map((item, idx) => {
        const colorSizeString =
          item.attributes.color.data.attributes.color +
          " | " +
          item.attributes.size.data.attributes.size;
        return (
          <Form.Item key={idx} label={colorSizeString} name={colorSizeString}>
            <InputNumber placeholder="qty" />
          </Form.Item>
        );
      })}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
