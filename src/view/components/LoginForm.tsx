import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Alert, AlertProps } from "antd";
import { ShopConfigContext } from "../contexts/ShopConfigContext";

type AlertObject = {
  message: string;
  type: AlertProps["type"];
};

export const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [alert, setAlert] = useState<AlertObject>({
    message: "",
    type: undefined,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const shopConfig = useContext(ShopConfigContext);

  useEffect(() => {
    alert.message.length > 0 && alert.type
      ? setShowAlert(true)
      : setShowAlert(false);
  }, [alert]);

  const resendLoginLink = async (email: string) => {
    const response = await fetch(`/auth/resend/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setAlert({
        message:
          "Something went wrong with resending the login link. If you didn't sign up yet, click below to go to the signup form.",
        type: "error",
      });
    } else {
      setAlert({
        message:
          "We have resent the login link to your email, please use that to proceed!",
        type: "success",
      });
      setSubmittedSuccessfully(true);
    }
  };

  const onSubmit = (values: { email: string }) => {
    resendLoginLink(values.email.toLocaleLowerCase());
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onSubmit}
        style={{ margin: "auto" }}
        layout="horizontal"
        labelCol={{
          span: 8,
        }}
        requiredMark={false}
        disabled={submittedSuccessfully || !(shopConfig?.status === "open")}
      >
        <h3>Can't find your login link?</h3>
        <Form.Item label="Contact Email" name="email">
          <Input required />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Resend link
          </Button>
        </Form.Item>
        {showAlert && (
          <Form.Item>
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setShowAlert(false)}
              closable
            />
          </Form.Item>
        )}
      </Form>
    </>
  );
};
