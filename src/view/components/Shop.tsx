import { Alert } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Product, ProductCategory } from "../../types";
import { ShopConfigContext } from "../contexts/ShopConfigContext";
import { defaultProductSort } from "../utils";
import { CartProps } from "./App";
import { LinkOnlyCard } from "./LinkOnlyCard";
import { Loading } from "./Loading";
import { COVER_WIDTH, ProductCard } from "./ProductCard";

const GAP = 20;

export const Shop: React.FC<CartProps> = (props) => {
  const [products, setProducts] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const shopConfig = useContext(ShopConfigContext);

  const fetchProducts = async () => {
    const products = await fetch("/shop/products").then((data) => data.json());
    setProducts(products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const numUnsubmitted = props.carts.filter((cart) => !cart.submitted).length;
  const numSubmitted = props.carts.filter((cart) => cart.submitted).length;

  let announcement = <></>;
  switch (shopConfig?.status) {
    case "open":
      announcement = (
        <span>
          <b>Deadline to order: {shopConfig?.deadline}</b>
        </span>
      );
      break;
    case "preview":
      announcement = (
        <>
          Items offered in this fundraiser are still TBD and subject to
          availability. <b>Ordering begins on {shopConfig?.start_date}.</b>
        </>
      );
      break;
    case "closed":
      announcement = (
        <>
          The Lululemon order deadline has passed. You can be notified of the
          next fundraiser by filling out{" "}
          <a href="https://forms.gle/EUqCGE7G6GeuoNnC7" target="_blank">
            this form.
          </a>
        </>
      );
      break;
  }

  return loading ? (
    <Loading />
  ) : (
    <div style={{ margin: GAP }}>
      <Alert
        message={announcement}
        type="info"
        showIcon
        closable
        style={{
          width: "fit-content",
          margin: "auto",
          marginTop: 16,
        }}
      />
      {numUnsubmitted > 0 && shopConfig?.status === "open" && (
        <Alert
          message={
            <b>
              You have {numUnsubmitted} unsubmitted cart
              {numUnsubmitted > 1 && "s"}!
            </b>
          }
          type="warning"
          showIcon
          closable
          style={{
            width: "fit-content",
            margin: "auto",
            marginTop: 16,
          }}
        />
      )}
      {numSubmitted > 0 && shopConfig?.status === "open" && (
        <Alert
          message={
            <span>
              You have {numSubmitted} order{numSubmitted > 1 && "s"} submitted.
            </span>
          }
          type="success"
          showIcon
          closable
          style={{
            width: "fit-content",
            margin: "auto",
            marginTop: 16,
          }}
        />
      )}
      {products.map((category) =>
        shopConfig?.status === "closed" && !category.link_only ? (
          <></>
        ) : (
          <div key={category.id} style={{ padding: GAP }}>
            <div style={{ textAlign: "center", margin: "auto" }}>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fill, ${COVER_WIDTH}px)`,
                gridGap: GAP,
                justifyContent: "center",
                marginTop: GAP,
              }}
            >
              {(defaultProductSort(category.products) as Product[]).map(
                (product) =>
                  category.link_only ? (
                    <LinkOnlyCard key={product.id} product={product} />
                  ) : (
                    <ProductCard
                      key={product.id}
                      product={product}
                      {...props}
                    />
                  )
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};
