import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BuyerCarts, ProductCategoryWithQtys } from "../../types";
import { getProductQuantity } from "../utils";
import { BuyerTable } from "./BuyerTable";
import { ItemTable } from "./ItemTable";
import { Loading } from "./Loading";

type Mode = "Buyer" | "Item";

export const AdminView: React.FC = () => {
  const [mode, setMode] = useState<Mode>();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const [buyers, setBuyers] = useState<BuyerCarts[]>();
  const fetchBuyers = async () => {
    const buyers = await fetch("/admin/buyers", {
      method: "GET",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    }).then((data) => data.json());
    setBuyers(buyers);
  };

  const [items, setItems] = useState<ProductCategoryWithQtys[]>();
  const fetchItems = async () => {
    const items = await fetch("/admin/items", {
      method: "GET",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    }).then((data) => data.json());
    setItems(items);
  };

  useEffect(() => {
    fetchBuyers();
    fetchItems();
  }, []);

  useEffect(() => {
    if (buyers && items) {
      setLoading(false);
    }
  }, [buyers, items]);

  const getTotalQtyLululemon = (category) => {
    return (
      category.products.reduce(
        (total, product) => total + getProductQuantity(product),
        0
      ) ?? "..."
    );
  };

  useEffect(() => console.log("ITEMS", items), [items]);
  useEffect(() => console.log("BUYERS", buyers), [buyers]);

  return (
    <>
      <Button onClick={() => setMode("Buyer")}>View by buyer</Button>
      <Button onClick={() => setMode("Item")}>View by item</Button>
      {mode === "Buyer" ? (
        buyers ? (
          <BuyerTable buyers={buyers} />
        ) : (
          <Loading />
        )
      ) : mode === "Item" ? (
        items ? (
          <>
            {items.map((category) => (
              <div key={category.id}>
                <h3 style={{ textAlign: "center" }}>{category.name}</h3>
                {category.id === 2 && (
                  <p style={{ textAlign: "center" }}>
                    Total quantity of Lululemon:{" "}
                    {getTotalQtyLululemon(category)}
                  </p>
                )}
                <ItemTable category={category} />
              </div>
            ))}
          </>
        ) : (
          <Loading />
        )
      ) : (
        loading && <Loading />
      )}
    </>
  );
};
