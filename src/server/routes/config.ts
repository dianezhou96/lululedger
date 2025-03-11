import express = require("express");
import { API_TOKEN, API_URI } from "../config";
import { Request, Response } from "express";

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

const router = express.Router();
router.use(express.json());

async function getShopConfig() {
  try {
    const response = await fetch(`${API_URI}/shop-configuration`, {
      method: "GET",
      headers: { Authorization: API_TOKEN },
    });

    if (!response.ok) {
      console.log("Shop config fetch failed with status:", response.status);
      return null;
    }
    const json = await response.json();
    return json.data.attributes;
  } catch (error) {
    console.log("Fetching shop config failed:", error);
    return null;
  }
}

/*
Middleware for getting shop configuration
*/
async function useShopConfig(req, res, next) {
  const shopConfig = await getShopConfig();
  if (!shopConfig) {
    console.log("Shop config fetch failed");
    return res.status(500).end();
  }
  req.shopConfig = shopConfig;
  console.log("Shop config fetched");
  next();
}

// Endpoint for getting shop configuration
router.get("/config", async (_: Request, res: Response) => {
  const shopConfig = await getShopConfig();
  if (!shopConfig) {
    console.log("Shop config fetch failed");
    return res.status(500).end();
  }
  res.json(shopConfig);
});

module.exports = {
  router: router,
  useShopConfig: useShopConfig,
  getShopConfig: getShopConfig,
};
