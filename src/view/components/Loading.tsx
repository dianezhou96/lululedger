import { Spin } from "antd";
import React from "react";

export const Loading: React.FC = () => {
  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <Spin />
    </div>
  );
};
