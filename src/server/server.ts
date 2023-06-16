import express = require("express");
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch"
import { API_TOKEN, API_URI } from "./config";
const fetch = (url: RequestInfo, init?: RequestInit) => import("node-fetch").then(({ default: fetch }) => fetch(url, init));
const app = express();
const port = 3123;

app.use(express.static("public"));
app.use("/dist", express.static("dist"));

app.get("/products", async (req: Request, res: Response) => {
  const data: Promise<any> = await fetch(API_URI + "/products?populate[product_images][fields][0]=link&populate[items][populate]=*",
    {
      method: "GET",
      headers: { Authorization: API_TOKEN },
    }).then((data) => data.json());
  res.json(data)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
