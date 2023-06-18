import { Spin } from "antd";
import React from "react";

export const Loading: React.FC = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" style={{ transform: "scale(2.5)" }} />
      </div>
    </div>
  );
};
