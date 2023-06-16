import express = require("express");
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { API_TOKEN, API_URI } from "./config";
import { Product } from "../types";
import qs = require("qs");

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));
const app = express();
const port = 3123;

app.use(express.static("public"));
app.use("/dist", express.static("dist"));

app.get("/products", async (req: Request, res: Response) => {
  const query = {
    populate: {
      product_images: {
        fields: ["link"],
      },
      items: {
        fields: [
          { color: { populate: { fields: ["color"] } } },
          { size: { populate: { fields: ["size"] } } },
          "unavailable",
        ],
      },
    },
  };
  const data = await fetch(
    API_URI +
      "/products?populate[product_images][fields][0]=link&populate[items][populate]=*",
    // `/products?${qs.stringify(query)}`,
    {
      method: "GET",
      headers: { Authorization: API_TOKEN },
    }
  );
  const json = await data.json();
  const products = json.data;
  const retVal: Product[] = products.map((product) => ({
    id: product.id,
    name: product.attributes.name,
    link: product.attributes.link,
    price_actual: product.attributes.price_actual,
    price_retail: product.attributes.price_retail,
    product_images:
      product.attributes.product_images.data?.map(
        (img) => img.attributes.link
      ) ?? [],
    items:
      product.attributes.items.data?.map((item) => ({
        color: item.attributes.color.data?.attributes.color,
        size: item.attributes.size.data?.attributes.size,
        unavailable: item.attributes.unavailable,
      })) ?? [],
  }));
  res.json(retVal);
});

app.get("/cart/:id", async (req: Request, res: Response) => {
  const data: Promise<any> = await fetch(API_URI + "/cart", {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  }).then((data) => data.json());
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
