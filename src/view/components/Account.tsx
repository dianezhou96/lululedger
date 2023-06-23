import React, { useEffect, useState } from "react";
import { Buyer } from "../../types";
import { useSearchParams } from "react-router-dom";
import { AccountForm } from "./AccountForm";
import { Card } from "antd";
import { Loading } from "./Loading";

export const Account: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [buyer, setBuyer] = useState<Buyer>();
  const [loading, setLoading] = useState(true);
  const credential = searchParams.get("credential");

  const getAccountInfo = async () => {
    const buyer = await fetch("/auth/user", {
      method: "GET",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    }).then((data) => data.json());
    setBuyer(buyer);
    setLoading(false);
  };

  useEffect(() => {
    if (credential) getAccountInfo();
    else setLoading(false);
  }, [credential]);
  console.log("BUYER", buyer);

  return loading ? (
    <Loading />
  ) : (
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Card style={{ maxWidth: 410, margin: "auto 10px", borderRadius: 20 }}>
        {buyer ? (
          <div style={{ textAlign: "center" }}>
            <h2>Your Account Information</h2>
            <div style={{ marginBottom: "2em" }}>
              <h3>Contact</h3>
              <p>{buyer.name}</p>
              <p>{buyer.email}</p>
            </div>
            <div style={{ marginBottom: "2em" }}>
              <h3>Affiliation with SFIT</h3>
              <p>Skater: {buyer.skater_name}</p>
              <p>Team: {buyer.skater_team}</p>
            </div>
            <h3>Thank you for contributing to our fundraiser!</h3>
            <p>
              If you need to modify any information or ask questions, please
              contact Diane at dianez.mit@gmail.com.
            </p>
          </div>
        ) : (
          <AccountForm />
        )}
      </Card>
    </div>
  );
};
