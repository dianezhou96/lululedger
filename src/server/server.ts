import express = require("express");
import morgan = require("morgan");
import sgMail = require("@sendgrid/mail");
import moment = require("moment-timezone");
import path = require("path");
import expressStaticGZip = require("express-static-gzip");
import livereload = require("livereload");
import connectLivereload = require("connect-livereload");
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { SG_API_KEY, LOG_LEVEL, PORT } from "./config";
import { CLOSED } from "../constants";
import { AuthorizedRequest } from "./routes/auth";

const app = express();
const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));
sgMail.setApiKey(SG_API_KEY);
app.enable("trust proxy"); // allow us to deploy behind nginx proxy and log ips correctly

// live reloading only for dev
if (process.env.NODE_ENV !== "prod") {
  const liveReloadServer = livereload.createServer({ delay: 25 });
  liveReloadServer.watch(path.join(__dirname, "..")); // watch the whole dist directory
  app.use(connectLivereload()); // injects neccesary HTML so our client can connect to our livereload server
  liveReloadServer.server.once("connection", () => {
    // when server starts/restarts, trigger a browser reload after 50
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 50);
  });
}

// logging
if (process.env.NODE_ENV === "prod") {
  console.log = function () {}; // remove logging in prod
}
morgan.token<AuthorizedRequest>("remote-user", (req) =>
  req.buyer ? req.buyer.email : undefined
); // get email if possible
morgan.token<AuthorizedRequest>("date", () =>
  moment().tz("America/Los_Angeles").format("MM/DD/YYYY hh:mm:ssA z")
);
morgan.token<AuthorizedRequest>("body", (req, res) => {
  const jsonString = JSON.stringify(req.body);
  return jsonString === "{}" ? "" : jsonString;
});
app.use(morgan(LOG_LEVEL));

// shop closed gatekeeping
const check_admin = require("./routes/auth").check_admin;
if (CLOSED)
  app.use(async (req, res, next) => {
    if (await check_admin(req)) {
      next(); // admins can do whatever they want
    } else if (req.method === "GET") {
      // allow read only requests to go through, in our case GETs
      next();
    } else {
      res.status(403).end();
    }
  });

// import routes
const shop_routes = require("./routes/shop");
const auth_routes = require("./routes/auth").router;
const admin_routes = require("./routes/admin");
// set up routes
app.use("/shop", shop_routes);
app.use("/auth", auth_routes);
app.use("/admin", admin_routes);

// middleware
app.use(express.static("public"));
app.use(
  "/view",
  process.env.NODE_ENV === "prod"
    ? expressStaticGZip("dist/view", {})
    : express.static("dist/view")
);

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
  console.info(`lululedger listening on port ${PORT}`);
});

process
  .on("unhandledRejection", (err) => {
    console.error(err);
  })
  .on("uncaughtException", (err) => {
    console.error(err);
  });
