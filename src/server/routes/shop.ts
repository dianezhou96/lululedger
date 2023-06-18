import express = require("express");
import { Request, Response, urlencoded } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { Cart, CartItemPost, Product } from "../../types";
import sgMail = require("@sendgrid/mail");
import { API_TOKEN, API_URI, SG_API_KEY } from "../config";
import qs = require("qs");
import {
  CartFragment,
  ItemFragment,
  ProductFragment,
} from "../utils/queryFragments";
import { resolveCart, resolveProduct } from "../utils/resolvers";
import { AuthorizedRequest } from "./auth";

const user_authenticated = require("./auth").user_authenticated;

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
// router.get("/cart/:id", async (req: Request, res: Response) => {
//   const query = CartFragment;
//   const data = await fetch(
//     `${API_URI}/carts/${req.params.id}?${qs.stringify(query)}`,
//     {
//       method: "GET",
//       headers: { Authorization: API_TOKEN },
//     }
//   )
//     .then((data) => data.json())
//     .then((json) => json.data);
//   const retVal: Cart = resolveCart(data);
//   res.json(retVal);
// });

// Add a new cart
router.post(
  "/carts",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer) {
      res.status(403).end();
      return;
    }
    const valid =
      (typeof req.body.name === "string" || req.body.name instanceof String) &&
      req.body.name.length > 0;
    if (!valid) {
      res.status(400).end();
    }
    req.body.buyer = req.buyer.id;
    const data = await fetch(API_URI + `/carts`, {
      method: "POST",
      body: JSON.stringify({ data: req.body }), // TODO: Add buyer relationship
      headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
    })
      .then((data) => {
        return data.json();
      })
      .then((json) => json.data);
    res.status(200).json(data);
  }
);

// Add item to cart
router.post(
  "/cart-items",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer) return; // terminate early if not authorized TODO: might not be needed since user_authenticated ends request
    const carts = await get_carts(req.buyer.id);
    // check cart ID belongs to buyer
    const search = carts.find((x) => x.id === req.body.cart);
    if (!search) {
      res.status(403).end();
      return;
    }
    console.log("Found cart for user", req.buyer.email, "adding item to cart");
    // add item if good
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
  }
);

router.delete(
  "/carts/:id",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer) return;
    const carts = await get_carts(req.buyer.id);
    // check cart ID belongs to buyer
    const search = carts.find((x) => x.id.toString() === req.params.id);
    if (!search) {
      res.status(403).end();
      return;
    }
    console.log("Found cart for user", req.buyer.email, "- deleting cart");
    // delete cart if good
    const data = await fetch(API_URI + `/carts/${req.params.id}`, {
      method: "DELETE",
      headers: { Authorization: API_TOKEN },
    })
      .then((data) => {
        return data.json();
      })
      .then((json) => json.data);
    res.status(200).json(data);
  }
);

// Get carts by buyer
router.get(
  "/carts",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    console.log(
      "Request from",
      req.buyer
        ? `${req.buyer.email}, whose id is ${req.buyer.id}`
        : "unauthorized"
    );
    if (!req.buyer) return;
    const carts = await get_carts(req.buyer.id);
    console.log(carts);
    res.json(carts);
  }
);

/*
Gets a list of carts belonging to a user requires:
  - a valid user id
returns:
  - a list of cart records
*/
async function get_carts(id) {
  const query = {
    ...CartFragment,
    filters: {
      buyer: id,
    },
  };
  const response = await fetch(`${API_URI}/carts?${qs.stringify(query)}`, {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  });
  const json = await response.json();
  const data = json.data;
  const retVal: Cart[] = data.map((cart) => resolveCart(cart));
  return retVal;
}

module.exports = router;
