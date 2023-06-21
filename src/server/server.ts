import express = require("express");
import morgan = require("morgan");
import sgMail = require("@sendgrid/mail");
import moment = require("moment-timezone");
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { SG_API_KEY, LOG_LEVEL, PORT } from "./config";

const app = express();
const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));
sgMail.setApiKey(SG_API_KEY);

app.enable("trust proxy"); // allow us to deploy behind nginx proxy and log ips correctly
// logging
morgan.token("remote-user", (req) => (req.buyer ? req.buyer.email : undefined)); // get email if possible
morgan.token("date", () =>
  moment().tz("America/Los_Angeles").format("MM/DD/YYYY hh:mm:ssA z")
);
app.use(morgan(LOG_LEVEL));

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`lululedger listening on port ${PORT}`);
});
