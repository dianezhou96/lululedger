import express = require("express");
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { BuyerCarts, Cart, FAQData, ProductCategory } from "../../types";
import sgMail = require("@sendgrid/mail");
import { API_TOKEN, API_URI, SG_API_KEY } from "../config";
import qs = require("qs");
import {
  BuyerCartsFragment,
  CartFragment,
  FAQFragment,
  ProductCategoryFragment,
  ProductCategoryWithQtyFragment,
} from "../utils/queryFragments";
import {
  resolveBuyerCarts,
  resolveCart,
  resolveFAQ,
  resolveProductCategory,
  resolveProductCategoryWithQtys,
} from "../utils/resolvers";
import { AuthorizedRequest } from "./auth";

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

module.exports = router;
