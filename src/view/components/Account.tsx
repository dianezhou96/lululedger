import React, { useMemo } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { AccountPost, SKATER_TEAMS } from "../../types";
import { useSearchParams } from "react-router-dom";

export const Account: React.FC = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const credential = searchParams.get("credential");

  const signUp = async (account: AccountPost) => {
    const credential = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(account),
      headers: {
        "Content-Type": "application/json",
        Credential: searchParams.get("credential") ?? "",
      },
    }).then((data) => data.json());
    searchParams.set("credential", credential);
    setSearchParams(searchParams);
  };

  const onSubmit = (values: AccountPost) => {
    // console.log(values);
    signUp(values);
  };

  return credential ? (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome!</h2>
      <p>Your email: </p>
      <p>Skater: </p>
      <p>Team: </p>
      <p>Contact X if you have any questions or concerns.</p>
    </div>
  ) : (
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
