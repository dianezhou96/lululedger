import React, { useMemo } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import {
  AccountPost,
  CartItemPost,
  SkaterTeam,
  SKATER_TEAMS,
} from "../../types";
import { useSearchParams } from "react-router-dom";
import { CartSelector } from "./CartSelector";

export const AccountForm: React.FC = () => {
  const [form] = Form.useForm();
  //   const [searchParams] = useSearchParams();

  const signUp = async (account: AccountPost) => {
    await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(account),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const onSubmit = (values: AccountPost) => {
    console.log(values);
    // signUp(values);
  };

  return (
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
      <Form.Item label="Skater Name" name="skater_name">
        <Input placeholder="Which SFIT skater referred you?" />
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
  );
};
