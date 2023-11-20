import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Space,
  Typography,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Loading } from "./Loading";

export const InventoryForm: React.FC = () => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<object>();
  const [loading, setLoading] = useState(true);

  const getFormValues = async () => {
    const values = await fetch("/admin/inventory", {
      method: "GET",
    }).then((data) => data.json());
    setFormValues(values.length ? values[0].json : []);
    setLoading(false);
  };

  useEffect(() => {
    getFormValues();
  }, []);

  const [messageApi, contextHolder] = message.useMessage();
  const success = useCallback(() => {
    messageApi.open({
      type: "success",
      content: "Inventory saved!",
    });
  }, []);

  const onSubmit = async (values) => {
    await fetch("/admin/inventory", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    success();
    setLoading(true);
    getFormValues();
  };

  return (
    <>
      {contextHolder}
      {loading ? (
        <Loading />
      ) : (
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          form={form}
          name="inventory-form"
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
          initialValues={formValues}
          onFinish={onSubmit}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: "flex",
                  rowGap: 16,
                  flexDirection: "column",
                }}
              >
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Item ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item
                      label="Product name"
                      name={[field.name, "product"]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Category #"
                      name={[field.name, "category"]}
                    >
                      <InputNumber />
                    </Form.Item>

                    <Form.Item label="Product link" name={[field.name, "link"]}>
                      <Input />
                    </Form.Item>

                    <Form.Item label="Image links">
                      <Form.List name={[field.name, "images"]}>
                        {(subFields, subOpt) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 16,
                            }}
                          >
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, "link"]}
                                >
                                  <Input />
                                </Form.Item>
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => subOpt.add()}
                              block
                            >
                              + Add image link
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>

                    <Form.Item
                      label="Retail price"
                      name={[field.name, "price_retail"]}
                    >
                      <InputNumber />
                    </Form.Item>

                    <Form.Item label="Variants">
                      <Form.List name={[field.name, "items"]}>
                        {(subFields, subOpt) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 16,
                            }}
                          >
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item
                                  label="Color"
                                  name={[subField.name, "color"]}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "sizes-check"]}
                                  label="Size Checkbox"
                                >
                                  <Checkbox.Group>
                                    <Row>
                                      <Col span={8}>
                                        <Checkbox
                                          value="A"
                                          style={{ lineHeight: "32px" }}
                                        >
                                          A
                                        </Checkbox>
                                      </Col>
                                      <Col span={8}>
                                        <Checkbox
                                          value="B"
                                          style={{ lineHeight: "32px" }}
                                          disabled
                                        >
                                          B
                                        </Checkbox>
                                      </Col>
                                      <Col span={8}>
                                        <Checkbox
                                          value="C"
                                          style={{ lineHeight: "32px" }}
                                        >
                                          C
                                        </Checkbox>
                                      </Col>
                                      <Col span={8}>
                                        <Checkbox
                                          value="D"
                                          style={{ lineHeight: "32px" }}
                                        >
                                          D
                                        </Checkbox>
                                      </Col>
                                      <Col span={8}>
                                        <Checkbox
                                          value="E"
                                          style={{ lineHeight: "32px" }}
                                        >
                                          E
                                        </Checkbox>
                                      </Col>
                                      <Col span={8}>
                                        <Checkbox
                                          value="F"
                                          style={{ lineHeight: "32px" }}
                                        >
                                          F
                                        </Checkbox>
                                      </Col>
                                    </Row>
                                  </Checkbox.Group>
                                </Form.Item>
                                <Form.Item label="Sizes">
                                  <Form.List name={[subField.name, "sizes"]}>
                                    {(subSubFields, subSubOpt) => (
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          rowGap: 16,
                                        }}
                                      >
                                        {subSubFields.map((subSubField) => (
                                          <Space key={subSubField.key}>
                                            <Form.Item
                                              noStyle
                                              name={[subSubField.name, "size"]}
                                            >
                                              <Input />
                                            </Form.Item>
                                            <CloseOutlined
                                              onClick={() => {
                                                subSubOpt.remove(
                                                  subSubField.name
                                                );
                                              }}
                                            />
                                          </Space>
                                        ))}
                                        <Button
                                          type="dashed"
                                          onClick={() => subSubOpt.add()}
                                          block
                                        >
                                          + Add size
                                        </Button>
                                      </div>
                                    )}
                                  </Form.List>
                                </Form.Item>
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => subOpt.add()}
                              block
                            >
                              + Add variant
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}

                <Button type="dashed" onClick={() => add()} block>
                  + Add Item
                </Button>
              </div>
            )}
          </Form.List>

          <Form.Item shouldUpdate>
            {() => (
              <>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!form.isFieldsTouched()}
                >
                  Save
                </Button>
                <Button
                  onClick={() => form.setFieldsValue(formValues)}
                  disabled={!form.isFieldsTouched()}
                >
                  Restore last saved
                </Button>
              </>
            )}
          </Form.Item>

          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        </Form>
      )}
    </>
  );
};
