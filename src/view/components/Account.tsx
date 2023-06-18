import React, { useEffect, useState } from "react";
import { Buyer } from "../../types";
import { useSearchParams } from "react-router-dom";
import { AccountForm } from "./AccountForm";
import { Spin } from "antd";

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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {loading ? (
        <Spin />
      ) : buyer ? (
        <>
          <h2>Your Account Info</h2>
          <p>Here is the information we have on file about you.</p>
          <br />
          <h3>Contact</h3>
          <p>{buyer.name}</p>
          <p>{buyer.email}</p>
          <br />
          <h3>Affiliation with SFIT</h3>
          <p>Skater: {buyer.skater_name}</p>
          <p>Team: {buyer.skater_team}</p>
          <br />
          <h3>Thank you for contributing to our fundraiser!</h3>
          <p>
            If you need to modify any information or have any questions, please
            contact Diane at dianez.mit@gmail.com.
          </p>
        </>
      ) : (
        <AccountForm />
      )}
    </div>
  );
};
