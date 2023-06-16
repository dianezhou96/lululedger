import express = require("express");
import { Request, Response, urlencoded } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { Cart, Product } from "../types";
import sgMail = require("@sendgrid/mail");
import { API_TOKEN, API_URI, SG_API_KEY } from "./config";
import qs = require("qs");
import { CartFragment, ItemFragment, ProductFragment } from "./queryFragments";
import { resolveCart, resolveProduct } from "./resolvers";

sgMail.setApiKey(SG_API_KEY);

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));
const app = express();
const port = 3123;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/dist", express.static("dist"));

app.get("/products", async (req: Request, res: Response) => {
  const query = ProductFragment;
  const data = await fetch(API_URI + `/products?${qs.stringify(query)}`, {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  })
    .then((data) => data.json())
    .then((json) => json.data);
  const retVal: Product[] = data.map(resolveProduct);
  res.json(retVal);
});

app.get("/cart/:id", async (req: Request, res: Response) => {
  const query = CartFragment;
  const data = await fetch(
    `${API_URI}/carts/${req.params.id}?${qs.stringify(query)}`,
    {
      method: "GET",
      headers: { Authorization: API_TOKEN },
    }
  )
    .then((data) => data.json())
    .then((json) => json.data);
  const retVal: Cart = resolveCart(data);
  res.json(retVal);
});

app.post("/cart-item", async (req: Request, res: Response) => {
  const cartId = req.body.cartId;
  const itemId = req.body.itemId;
  const quantity = req.body.quantity;
  await addCartItem(cartId, itemId, quantity)
    .then((data) => data.json())
    .then((json) => json.data);
  res.send("Added item to cart!");
});

app.get("/email", async (req: Request, res: Response) => {
  const msg = {
    to: "dianezhou96@gmail.com",
    from: "dianez.mit@gmail.com",
    subject: "SFIT x lululemon",
    text: "This is your secret login link to our shop! Please do not share it with those you do not wish to have access to your account.",
  };
  let code = 200;
  try {
    const response = await sgMail.send(msg);
    code = response[0].statusCode;
    console.log(code);
  } catch (error) {
    console.log(error);
    code = 500;
  }
  res.sendStatus(code);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export function addCartItem(cartId: string, itemId: string, quantity: number) {
  const data = {
    cart: cartId,
    item: itemId,
    quantity: quantity,
  };
  return fetch(API_URI + `/cart-items`, {
    method: "POST",
    headers: { Authorization: API_TOKEN },
    data: data,
  });
}
