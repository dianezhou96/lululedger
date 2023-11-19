import { Alert } from "antd";
import React, { useEffect, useState } from "react";
import { CLOSED, DEADLINE, PREVIEW, START_DATE } from "../../constants";
import { Product, ProductCategory } from "../../types";
import { defaultProductSort } from "../utils";
import { CartProps } from "./App";
import { FundraiserCard } from "./FundraiserCard";
import { Loading } from "./Loading";
import { COVER_WIDTH, ProductCard } from "./ProductCard";

const GAP = 20;

export const Shop: React.FC<CartProps> = (props) => {
  const [products, setProducts] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

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

  const announcement = CLOSED ? (
    PREVIEW ? (
      <>
        Items offered in this fundraiser are still TBD and subject to
        availability. <b>Ordering begins on {START_DATE}.</b>
      </>
    ) : (
      <>This fundraiser has ended.</>
    )
  ) : (
    <span>
      <b>Deadline to order: </b>
      {/* <del>Friday, October 13</del>{" "} */}
      <b>{DEADLINE}</b>
    </span>
  );

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
      {numUnsubmitted > 0 && !CLOSED && (
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
      {numSubmitted > 0 && !CLOSED && (
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
      {products.map((category) => (
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
              (product) => (
                <ProductCard key={product.id} product={product} {...props} />
              )
            )}
            {category.id === 3 && <FundraiserCard />}
          </div>
        </div>
      ))}
    </div>
  );
};
