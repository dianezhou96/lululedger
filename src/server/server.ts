import express = require("express");
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { API_TOKEN, API_URI } from "./config";
import { Product } from "../types";
import qs = require("qs");
import { CartFragment, ItemFragment, ProductFragment } from "./queryFragments";
import { resolveProduct } from "./resolvers";

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));
const app = express();
const port = 3123;

app.use(express.static("public"));
app.use("/dist", express.static("dist"));

app.get("/products", async (req: Request, res: Response) => {
  const query = ProductFragment;
  const data = await fetch(API_URI + `/products?${qs.stringify(query)}`, {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  });
  const json = await data.json();
  const products = json.data;
  const retVal: Product[] = products.map(resolveProduct);
  res.json(retVal);
});

app.get("/cart/:id", async (req: Request, res: Response) => {
  const query = CartFragment;
  const data: Promise<any> = await fetch(API_URI + "/cart", {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  }).then((data) => data.json());
  console.log(req.params.id);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
