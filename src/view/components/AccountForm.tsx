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
          "Something went wrong with signing up, please refresh the page and try again",
        type: "error",
      });
    } else {
      setAlert({
        message:
          "We have sent a login link to your email, please use that to proceed",
        type: "success",
      });
    }
    form.resetFields();
  };

  const onSubmit = (values: BuyerPost) => {
    // console.log(values);
    signUp(values);
  };

  return (
    <div>
      <Form
        form={form}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email">
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input placeholder="Your name" />
        </Form.Item>
        <Form.Item label="Skater Name" name="skater_name">
          <Input placeholder="Which SFIT skater referred you? (FULLNAME)" />
        </Form.Item>
        <Form.Item label="Skater Team" name="skater_team">
          <Select
            placeholder="Which team is the skater on?"
            options={SKATER_TEAMS.map((team) => ({ value: team, label: team }))}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {showAlert ? (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setShowAlert(false)}
          closable
        />
      ) : (
        <></>
      )}
    </div>
  );
};
