import express = require("express");
import morgan = require("morgan");
import sgMail = require("@sendgrid/mail");
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { SG_API_KEY } from "./config";

const app = express();
const port = 3123;
const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));
sgMail.setApiKey(SG_API_KEY);

// logging
app.use(morgan("dev"));

// import routes
const shop_routes = require("./routes/shop");
const auth_routes = require("./routes/auth").router;
// set up routes
app.use("/shop", shop_routes);
app.use("/auth", auth_routes);

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
