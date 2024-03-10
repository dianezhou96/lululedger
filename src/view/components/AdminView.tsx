import { Button, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FUNDRAISER_CATEGORY_ID } from "../../constants";
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

  const [messageApi, contextHolder] = message.useMessage();
  const announceLoading = useCallback(() => {
    messageApi.open({
      type: "info",
      content: "Uploading and/or fetching data...",
      duration: 0,
    });
  }, []);

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
    announceLoading();
  }, [loading]);

  useEffect(() => {
    if (buyers && items) {
      setLoading(false);
    }
  }, [buyers, items]);

  const getTotalQtyLululemon = () => {
    return (
      items?.reduce(
        (total, category) =>
          total +
          (category.id === FUNDRAISER_CATEGORY_ID
            ? 0
            : category.products.reduce(
                (total, product) => total + getProductQuantity(product),
                0
              )),
        0
      ) ?? "..."
    );
  };

  return (
    <>
      <Button onClick={() => setMode("Buyer")}>View by buyer</Button>
      <Button onClick={() => setMode("Item")}>View by item</Button>
      {loading && contextHolder}
      {mode === "Buyer" ? (
        buyers ? (
          <BuyerTable buyers={buyers} />
        ) : (
          <Loading />
        )
      ) : mode === "Item" ? (
        items ? (
          <>
            <p style={{ textAlign: "center" }}>
              Total quantity of Lululemon: {getTotalQtyLululemon()}
            </p>
            {items.map((category) => (
              <div key={category.id}>
                <h3 style={{ textAlign: "center" }}>{category.name}</h3>
                <ItemTable
                  category={category}
                  refetch={() => setLoading(true)}
                />
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
