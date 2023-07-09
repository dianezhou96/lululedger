import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCategoryWithQtys } from "../../types";
import { getProductQuantity } from "../utils";
import { BuyerTable } from "./BuyerTable";
import { ItemTable } from "./ItemTable";
import { Loading } from "./Loading";

type Mode = "Buyer" | "Item";

export const AdminView: React.FC = () => {
  const [mode, setMode] = useState<Mode>();

  // For item view
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<ProductCategoryWithQtys[]>();
  const [loading, setLoading] = useState(true);
  const fetchItems = async () => {
    const items = await fetch("/admin/items", {
      method: "GET",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    }).then((data) => data.json());
    setItems(items);
    setLoading(false);
  };
  useEffect(() => {
    if (mode === "Item") fetchItems();
  }, [mode]);

  const totalQtyLululemon =
    items
      ?.filter((item) => item.id === 2)[0]
      .products.reduce(
        (total, product) => total + getProductQuantity(product),
        0
      ) ?? "...";

  return (
    <>
      <Button onClick={() => setMode("Buyer")}>View by buyer</Button>
      <Button onClick={() => setMode("Item")}>View by item</Button>
      {mode === "Buyer" && <BuyerTable />}
      {mode === "Item" &&
        (loading ? (
          <Loading />
        ) : (
          <>
            {items?.map((category) => (
              <>
                <h3 style={{ textAlign: "center" }}>{category.name}</h3>
                {category.id === 2 && (
                  <p style={{ textAlign: "center" }}>
                    Total quantity of Lululemon: {totalQtyLululemon}
                  </p>
                )}
                <ItemTable category={category} key={category.id} />
              </>
            ))}
          </>
        ))}
    </>
  );
};
