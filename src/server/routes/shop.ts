import express = require("express");
import { Request, Response, urlencoded } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { Cart, CartItemPost, Product } from "../../types";
import sgMail = require("@sendgrid/mail");
import { API_TOKEN, API_URI, SG_API_KEY } from "../config";
import qs = require("qs");
import { CartFragment, ItemFragment, ProductFragment } from "../queryFragments";
import { resolveCart, resolveProduct } from "../resolvers";

const router = express.Router();
router.use(express.json());

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

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
  console.log(req.body);
  const data = await addCartItem(req.body)
    .then((data) => {
      return data.json();
    })
    .then((json) => json.data);
  res.status(200).json(data);
});

function addCartItem(cartItem: CartItemPost) {
  return fetch(API_URI + `/cart-items`, {
    method: "POST",
    body: JSON.stringify({ data: cartItem }),
    headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
  });
}

module.exports = router;
