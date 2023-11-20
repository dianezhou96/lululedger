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
import { SizeSelector } from "./SizeSelector";

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
                              <div>
                                <Row>
                                  <Col className="testing" span={22}>
                                    <Form.Item
                                      label="Color"
                                      name={[subField.name, "color"]}
                                    >
                                      <Input />
                                    </Form.Item>
                                  </Col>
                                  <Col span={2}>
                                    <CloseOutlined
                                      onClick={() => {
                                        subOpt.remove(subField.name);
                                      }}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={24}>
                                    <Form.Item
                                      name={[subField.name, "sizes-test"]}
                                    >
                                      <SizeSelector></SizeSelector>
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </div>
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
