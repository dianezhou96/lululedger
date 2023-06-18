import React, { useEffect, useState } from "react";
import { Buyer } from "../../types";
import { useSearchParams } from "react-router-dom";
import { AccountForm } from "./AccountForm";

export const Account: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [buyer, setBuyer] = useState<Buyer>();
  const credential = searchParams.get("credential");

  const getAccountInfo = async () => {
    const buyer = await fetch("/auth/user", {
      method: "GET",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    }).then((data) => data.json());
    setBuyer(buyer);
  };

  useEffect(() => {
    if (credential) getAccountInfo();
  }, [credential]);
  console.log("BUYER", buyer);

  return buyer ? (
    <div style={{ textAlign: "center" }}>
      <h2>Thank you for joining our fundraiser!</h2>
      <p>Here is the information we have on file about you.</p>
      <h3>Contact email</h3>
      <p>{buyer.email}</p>
      <h3>Affiliation with SFIT</h3>
      <p>Skater: {buyer.skater_name}</p>
      <p>Team: {buyer.skater_team}</p>
      <p>Contact X if you have any questions or concerns.</p>
    </div>
  ) : (
    <AccountForm />
  );
};
