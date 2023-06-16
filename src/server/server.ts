import express = require("express");
import { Request, Response, urlencoded } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { Cart, CartItemPost, Product } from "../types";
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
const router = express.Router();

app.use("/api", router);
app.use(express.static("public"));
app.use("/dist", express.static("dist"));
router.use(express.json());

router.get("/products", async (_: Request, res: Response) => {
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

router.get("/cart/:id", async (req: Request, res: Response) => {
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

router.post("/cart-items", async (req: Request, res: Response) => {
  const data = await addCartItem(req.body)
    .then((data) => {
      return data.json();
    })
    .then((json) => json.data);
  res.status(200).json(data);
});

// app.get("/email", async (req: Request, res: Response) => {
//   const msg = {
//     to: "dianezhou96@gmail.com",
//     from: "dianez.mit@gmail.com",
//     subject: "SFIT x lululemon",
//     text: "This is your secret login link to our shop! Please do not share it with those you do not wish to have access to your account.",
//   };
//   let code = 200;
//   try {
//     const response = await sgMail.send(msg);
//     code = response[0].statusCode;
//     console.log(code);
//   } catch (error) {
//     console.log(error);
//     code = 500;
//   }
//   res.sendStatus(code);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export function addCartItem(cartItem: CartItemPost) {
  return fetch(API_URI + `/cart-items`, {
    method: "POST",
    body: JSON.stringify({ data: cartItem }),
    headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
  });
}
