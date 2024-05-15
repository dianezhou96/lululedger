import express = require("express");
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { Cart, FAQData, ProductCategory } from "../../types";
import sgMail = require("@sendgrid/mail");
import { API_TOKEN, API_URI, SG_API_KEY } from "../config";
import qs = require("qs");
import {
  CartFragment,
  FAQFragment,
  ProductCategoryFragment,
} from "../utils/queryFragments";
import {
  resolveCart,
  resolveFAQ,
  resolveProductCategory,
} from "../utils/resolvers";
import { AuthorizedRequest } from "./auth";
import { send_order_received } from "../utils/email";

const user_authenticated = require("./auth").user_authenticated;

const router = express.Router();
router.use(express.json());

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

// Get all products
router.get("/products", async (_: Request, res: Response) => {
  const query = ProductCategoryFragment;
  const data = await fetch(
    API_URI + `/product-categories?${qs.stringify(query)}`,
    {
      method: "GET",
      headers: { Authorization: API_TOKEN },
    }
  )
    .then((data) => data.json())
    .then((json) => json.data);
  const retVal: ProductCategory[] = data.map(resolveProductCategory);
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

// Submit a cart
router.put(
  "/carts/submit/:id",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer) return; // terminate early if not authorized TODO: might not be needed since user_authenticated ends request
    const authorized = await buyer_has_cart(req.buyer.id, req.params.id);
    if (!authorized) {
      res.status(403).end();
      return;
    }
    console.log("Found cart for user", req.buyer.email, "- submitting cart");
    // submit cart if good
    const data = await fetch(API_URI + `/carts/${req.params.id}`, {
      method: "PUT",
      body: JSON.stringify({ data: { submitted: true } }),
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
    const authorized = await buyer_has_cart(req.buyer.id, req.body.cart);
    if (!authorized) {
      res.status(403).end();
      return;
    }
    console.log(
      "Found cart for user",
      req.buyer.email,
      "- adding item to cart"
    );
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

// Update quantity in a CartItem
router.put(
  "/cart-items/:id",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer) return; // terminate early if not authorized TODO: might not be needed since user_authenticated ends request
    const authorized = await buyer_has_item(req.buyer.id, req.params.id);
    if (!authorized) {
      res.status(403).end();
      return;
    }
    console.log(
      "Found cart item for user",
      req.buyer.email,
      "- updating item in cart"
    );
    // update item if good
    const data = await fetch(API_URI + `/cart-items/${req.params.id}`, {
      method: "PUT",
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

// Delete a CartItem
router.delete(
  "/cart-items/:id",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer) return; // terminate early if not authorized TODO: might not be needed since user_authenticated ends request
    const authorized = await buyer_has_item(req.buyer.id, req.params.id);
    if (!authorized) {
      res.status(403).end();
      return;
    }
    console.log(
      "Found cart item for user",
      req.buyer.email,
      "- deleting item from cart"
    );
    // delete item if good
    const data = await fetch(API_URI + `/cart-items/${req.params.id}`, {
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

// Delete a cart
// TODO IDEALLY: Also delete the CartItems associated with the cart
router.delete(
  "/carts/:id",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer) return;
    const authorized = await buyer_has_cart(req.buyer.id, req.params.id);
    if (!authorized) {
      res.status(403).end();
      return;
    }
    console.log("Found cart for user", req.buyer.email, "- deleting cart");
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

// Get FAQs pertaining to the shop
router.get("/faqs", async (_: Request, res: Response) => {
  const query = FAQFragment;
  const data = await fetch(API_URI + `/faqs?${qs.stringify(query)}`, {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  })
    .then((data) => data.json())
    .then((json) => json.data);
  const retVal: FAQData[] = data.map(resolveFAQ);
  res.json(retVal);
});

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

async function buyer_has_cart(buyer_id, cart_id) {
  const query = {
    filters: {
      buyer: buyer_id ?? -1,
      id: cart_id ?? -1,
    },
  };
  const response = await fetch(`${API_URI}/carts?${qs.stringify(query)}`, {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  });
  const json = await response.json();
  const data = json.data;
  return data.length === 1;
}

async function buyer_has_item(buyer_id, cart_item_id) {
  const query = {
    populate: ["cart"],
  };
  const response = await fetch(
    `${API_URI}/cart-items/${cart_item_id}?${qs.stringify(query)}`,
    {
      method: "GET",
      headers: { Authorization: API_TOKEN },
    }
  );
  const data = await response.json().then((json) => json.data);
  const cartId = data.attributes.cart?.data.id;
  return cartId && buyer_has_cart(buyer_id, cartId);
}

// Send order received email
router.post(
  "/send-order-received-email",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (req.buyer.email !== req.body.email) {
      console.log("unauthorized");
      return;
    }
    send_order_received(
      req.body.name,
      req.body.email,
      req.body.credential,
      req.body.skater,
      req.body.team
    );
    res.status(200).end();
  }
);

module.exports = router;
