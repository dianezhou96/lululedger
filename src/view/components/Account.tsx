import React, { useEffect, useState } from "react";
import { Buyer } from "../../types";
import { useSearchParams } from "react-router-dom";
import { AccountForm } from "./AccountForm";
import { Button, Card } from "antd";
import { Loading } from "./Loading";
import { AdminView } from "./AdminView";

export const Account: React.FC = () => {
  const [buyer, setBuyer] = useState<Buyer>();
  const [loading, setLoading] = useState(true);
  const [adminView, setAdminView] = useState(false);

  const getAccountInfo = async () => {
    const buyer = await fetch("/auth/user", {
      method: "GET",
    }).then((data) => data.json());
    setBuyer(buyer);
    setLoading(false);
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  const logout = async () => {
    await fetch("/auth/logout", {
      method: "GET",
    });
    location.reload();
  };

  return loading ? (
    <Loading />
  ) : adminView ? (
    <AdminView />
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
              contact Diane at dianez.sfit@gmail.com.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {buyer?.admin && (
                <Button
                  style={{ marginBottom: "1em" }}
                  type="primary"
                  onClick={() => setAdminView(true)}
                >
                  Go to admin view
                </Button>
              )}
              <Button type="primary" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <AccountForm />
        )}
      </Card>
    </div>
  );
};
