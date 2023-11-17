import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { CLOSED, PREVIEW, START_DATE } from "../../constants";

export const SignUpButton: React.FC = () => {
  return (
    <Button style={{ width: "fit-content" }} disabled={CLOSED}>
      {PREVIEW ? (
        `Ordering begins on ${START_DATE}`
      ) : CLOSED ? (
        "This fundraiser has ended."
      ) : (
        <Link to="/account">Sign up to order!</Link>
      )}
    </Button>
  );
};
