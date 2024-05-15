import express = require("express");
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import {
  BuyerCarts,
  Cart,
  FAQData,
  InventoryData,
  ProductCategory,
} from "../../types";
import sgMail = require("@sendgrid/mail");
import { API_TOKEN, API_URI, SG_API_KEY } from "../config";
import qs = require("qs");
import {
  BuyerCartsFragment,
  InventoryFragment,
  ProductCategoryWithQtyFragment,
} from "../utils/queryFragments";
import {
  resolveBuyerCarts,
  resolveInventory,
  resolveProductCategoryWithQtys,
} from "../utils/resolvers";
import { AuthorizedRequest } from "./auth";
import { send_invoice, send_order_received } from "../utils/email";

const user_authenticated = require("./auth").user_authenticated;

const router = express.Router();
router.use(express.json());

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

// Get all buyers
router.get(
  "/buyers",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer.admin) {
      console.log("unauthorized");
      return;
    }
    const query = BuyerCartsFragment;
    const data = await fetch(
      `${API_URI}/buyers?${qs.stringify(query)}&pagination[pageSize]=300`,
      {
        method: "GET",
        headers: { Authorization: API_TOKEN },
      }
    )
      .then((data) => data.json())
      .then((json) => json.data);
    const retVal: BuyerCarts[] = data.map(resolveBuyerCarts);
    res.json(retVal);
  }
);

// Get all items with quantities
router.get(
  "/items",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer.admin) {
      console.log("unauthorized");
      return;
    }
    const query = ProductCategoryWithQtyFragment;
    const data = await fetch(
      `${API_URI}/product-categories?${qs.stringify(query)}`,
      {
        method: "GET",
        headers: { Authorization: API_TOKEN },
      }
    )
      .then((data) => data.json())
      .then((json) => json.data);
    const retVal = data.map(resolveProductCategoryWithQtys);
    res.json(retVal);
  }
);

// Mark out of stock
router.put(
  "/out-of-stock/:id",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer.admin) {
      console.log("unauthorized");
      return;
    }
    const data = await fetch(`${API_URI}/cart-items/${req.params.id}`, {
      method: "PUT",
      body: JSON.stringify({ data: { status: "Out of stock" } }),
      headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
    })
      .then((data) => data.json())
      .then((json) => json.data);
    res.status(200).json(data);
  }
);

// Unmark out of stock
router.put(
  "/in-stock/:id",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer.admin) {
      console.log("unauthorized");
      return;
    }
    const data = await fetch(`${API_URI}/cart-items/${req.params.id}`, {
      method: "PUT",
      body: JSON.stringify({ data: { status: null } }),
      headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
    })
      .then((data) => data.json())
      .then((json) => json.data);
    res.status(200).json(data);
  }
);

// Update item notes
router.put(
  "/notes/:id",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer.admin) {
      console.log("unauthorized");
      return;
    }
    const data = await fetch(`${API_URI}/items/${req.params.id}`, {
      method: "PUT",
      body: JSON.stringify({ data: req.body }),
      headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
    })
      .then((data) => data.json())
      .then((json) => json.data);
    res.status(200).json(data);
  }
);

// Send order received email
router.post(
  "/send-order-received-email",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer.admin) {
      console.log("unauthorized");
      return;
    }
    for (const buyer of req.body) {
      const credential = {
        email: buyer.email,
        magic_token: buyer.magic_token,
      };
      send_order_received(
        buyer.name,
        buyer.email,
        btoa(JSON.stringify(credential)),
        buyer.skater,
        buyer.team
      );
    }
    res.status(200).end();
  }
);

// Send invoice email
router.post(
  "/send-invoice-email",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer.admin) {
      console.log("unauthorized");
      return;
    }
    for (const buyer of req.body) {
      send_invoice(
        buyer.name,
        buyer.email,
        buyer.order,
        buyer.total,
        buyer.skater,
        buyer.team
      );
    }
    res.status(200).end();
  }
);

router.post(
  "/inventory",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer.admin) {
      console.log("unauthorized");
      return;
    }
    const data = await fetch(API_URI + `/inventories`, {
      method: "POST",
      body: JSON.stringify({ data: { json: req.body } }),
      headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
    });
    res.status(200).end();
  }
);

router.get(
  "/inventory",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer.admin) {
      console.log("unauthorized");
      res.sendStatus(403);
      return;
    }
    const query = InventoryFragment;
    const data = await fetch(API_URI + `/inventories?${qs.stringify(query)}`, {
      method: "GET",
      headers: { Authorization: API_TOKEN },
    })
      .then((data) => data.json())
      .then((json) => json.data);
    const retVal: InventoryData[] = data.map(resolveInventory);
    res.json(retVal);
    res.status(200).end();
  }
);
module.exports = router;
