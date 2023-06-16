import express = require("express");
import sgMail = require("@sendgrid/mail");
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { API_TOKEN, API_URI, SG_API_KEY } from "./config";
import { Product } from "../types";
import qs = require("qs");

sgMail.setApiKey(SG_API_KEY);

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));
const app = express();
const port = 3123;

app.use(express.static("public"));
app.use("/dist", express.static("dist"));

app.get("/products", async (req: Request, res: Response) => {
  const query = {
    populate: {
      product_images: {
        fields: ["link"],
      },
      items: {
        fields: ["unavailable"],
        populate: {
          color: {
            fields: ["color"],
          },
          size: { fields: ["size"] },
        },
      },
    },
  };
  const data = await fetch(API_URI + `/products?${qs.stringify(query)}`, {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  });
  const json = await data.json();
  const products = json.data;
  const retVal: Product[] = products.map((product) => ({
    id: product.id,
    name: product.attributes.name,
    link: product.attributes.link,
    price_actual: product.attributes.price_actual,
    price_retail: product.attributes.price_retail,
    product_images:
      product.attributes.product_images.data?.map(
        (img) => img.attributes.link
      ) ?? [],
    items:
      product.attributes.items.data?.map((item) => ({
        color: item.attributes.color.data?.attributes.color,
        size: item.attributes.size.data?.attributes.size,
        unavailable: item.attributes.unavailable,
      })) ?? [],
  }));
  res.json(retVal);
});

app.get("/cart/:id", async (req: Request, res: Response) => {
  const data: Promise<any> = await fetch(API_URI + "/cart", {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  }).then((data) => data.json());
  console.log(req.params.id);
  res.json(data);
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
