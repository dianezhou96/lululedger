import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Alert, AlertProps } from "antd";
import { BuyerPost, SKATER_TEAMS } from "../../types";

type AlertObject = {
  message: string;
  type: AlertProps["type"];
};

export const AccountForm: React.FC = () => {
  const [form] = Form.useForm();
  const [alert, setAlert] = useState<AlertObject>({
    message: "",
    type: undefined,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  useEffect(() => {
    alert.message.length > 0 && alert.type
      ? setShowAlert(true)
      : setShowAlert(false);
  }, [alert]);

  const signUp = async (account: BuyerPost) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(account),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setAlert({
        message:
          "Something went wrong with signing up. If you already signed up with this email address before, please check your inbox for your magic link to login.",
        type: "error",
      });
    } else {
      setAlert({
        message:
          "We have sent a login link to your email, please use that to proceed!",
        type: "success",
      });
      setSubmittedSuccessfully(true);
    }
  };

  const onSubmit = (values: BuyerPost) => {
    signUp(values);
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
        disabled={submittedSuccessfully}
      >
        <h3>
          Thanks for checking out our fundraiser! Please fill out this form to
          start shopping.
        </h3>
        <Form.Item label="Your Name" name="name">
          <Input required />
        </Form.Item>
        <Form.Item label="Contact Email" name="email">
          <Input required />
        </Form.Item>
        <b>Which SFIT skater brought you here?</b>
        <p>
          We will contact this skater in case we cannot reach you, and also
          thank them for referring you to our fundraiser!
        </p>
        <Form.Item label="Skater Name" name="skater_name">
          <Input placeholder="Include first and last name" required />
        </Form.Item>
        <Form.Item
          label="Team"
          name="skater_team"
          rules={[{ required: true, message: "Please select a team" }]}
        >
          <Select
            options={SKATER_TEAMS.map((team) => ({
              value: team,
              label: team,
            }))}
            style={{ textAlign: "left" }}
          />
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
