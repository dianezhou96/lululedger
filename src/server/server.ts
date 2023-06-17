import express = require("express");
import { Request, Response, urlencoded } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { Cart, CartItemPost, Product } from "../types";
import sgMail = require("@sendgrid/mail");
import { API_TOKEN, API_URI, SG_API_KEY } from "./config";
import qs = require("qs");
import { CartFragment, ItemFragment, ProductFragment } from "./queryFragments";
import { resolveCart, resolveProduct } from "./resolvers";

const app = express();
const port = 3123;
const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));
sgMail.setApiKey(SG_API_KEY);

// import routes
const shop_routes = require("./routes/shop");
// set up routes
app.use("/shop", shop_routes);

// middleware
app.use(express.static("public"));
app.use("/dist", express.static("dist"));

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
