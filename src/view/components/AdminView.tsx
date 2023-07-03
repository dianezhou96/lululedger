import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BuyerTable } from "./BuyerTable";
import { ItemTable } from "./ItemTable";

type Mode = "Buyer" | "Item";

export const AdminView: React.FC = () => {
  const [mode, setMode] = useState<Mode>();
  return (
    <>
      <Button onClick={() => setMode("Buyer")}>View by buyer</Button>
      <Button onClick={() => setMode("Item")}>View by item</Button>
      {mode === "Buyer" && <BuyerTable />}
      {mode === "Item" && <ItemTable />}
    </>
  );
};
