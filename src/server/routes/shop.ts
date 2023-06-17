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

// Get all products
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

// Get cart by id
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

// Add item to cart
router.post("/cart-items", async (req: Request, res: Response) => {
  const data = await fetch(API_URI + `/cart-items`, {
    method: "POST",
    body: JSON.stringify({ data: req.body }),
    headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
  })
    .then((data) => {
      return data.json();
    })
    .then((json) => json.data);
  res.status(200).json(data);
});

// Get carts by buyer
router.get("/carts", async (req: Request, res: Response) => {
  const query = {
    ...CartFragment,
    filters: {
      buyer: req.query.buyer, // TODO: Change this to be by email/token rather than id
    },
  };
  const data = await fetch(`${API_URI}/carts?${qs.stringify(query)}`, {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  })
    .then((data) => data.json())
    .then((json) => json.data);
  const retVal: Cart[] = data.map((cart) => resolveCart(cart));
  res.json(retVal);
});

module.exports = router;
