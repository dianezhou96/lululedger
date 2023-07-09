import express = require("express");
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { Buyer } from "../../types";
import { API_TOKEN, API_URI, SG_API_KEY } from "../config";
import qs = require("qs");
import { BuyerFragment } from "../utils/queryFragments";
import { resolveBuyer } from "../utils/resolvers";
import { send_magic_link } from "../utils/email";

const router = express.Router();
router.use(express.json());

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

/*
Registers the user, expects:
  - user is not signed up already
  - req.bodyemail: email is of valid format: user@domain.com
  Not meeting the above will result in HTTP 400, bad request
response:
  an HTTP code where 200 is successful addition of user, anything else is failure
  the base64 encoded string representing a valid credential pair will be returned
  where valid credential pairing looks like:
    {
      email: string representing email address
      magic_token: string representing token for account
    }
*/
router.post("/signup", async (req: Request, res: Response) => {
  const record = { ...req.body };
  // generate a UUID serving as the magic token for user
  record.magic_token = uuidv4();
  const response = await fetch(API_URI + `/buyers`, {
    method: "POST",
    body: JSON.stringify({ data: record }),
    headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
  });
  const data = await response.json();
  const credential = {
    email: record.email,
    magic_token: record.magic_token,
  };
  const status = response.status;
  if (status == 200)
    send_magic_link(
      record.name,
      record.email,
      btoa(JSON.stringify(credential))
    );
  res.status(status).end();
});

/*
Gets a user by email, expects:
  - req.params.email: a string representing email address
response:
  true if user exists in DB, false if not or if connection fails
  front end should explicitly check for status string for success

TODO: Figure out if GET is appropriate here since we're returning a json
and according to HTTP spec GET request responses shouldn't have body? 
*/
router.get("/user/:email", async (req: Request, res: Response) => {
  const { email } = req.params;
  const [status, user] = await get_user_record(email);
  res.status(status).json(user ? true : false);
});

/*
Checks whether a credential pairing is valid, expects
  - req.params.credentials: a base64 encoded string of an object like the following:
    {
      email: string representing email address
      magic_token: string representing token for account
    }
response:
  true if credentials match the DB record's, false if not or if connection fails
  front end should explicitly check for status string for success

TODO: Figure out if GET is appropriate here since we're returning a json
and according to HTTP spec GET request responses shouldn't have body? 
*/
router.get(
  "/authenticate/:credentials",
  async (req: Request, res: Response) => {
    const credentials = atob(req.params.credentials);
    if (!is_json(credentials)) {
      // end early
      res.status(200).json(false);
      return;
    }
    const { email, magic_token: token } = JSON.parse(credentials);
    const [status, user] = await get_user_record(email);
    res
      .status(status)
      .json(user ? user.attributes.magic_token === token : false);
  }
);

/*
Looks up an authenticated user in the DB and returns the record
*/
router.get(
  "/user",
  user_authenticated,
  async (req: AuthorizedRequest, res: Response) => {
    if (!req.buyer) {
      res.status(403).end();
      return;
    }
    const [status, user] = await get_user_record(req.buyer.email);
    const retVal: Buyer = resolveBuyer(user);
    res.status(status).json(retVal);
  }
);

/*
Resends a magic link email expects:
  - a valid email
triggers a backend action to resend magic link email if email is registered
*/
router.get("/resend/:email", async (req: Request, res: Response) => {
  console.log("got resend email requeset for", req.params.email);
  const [status, user] = await get_user_record(req.params.email);
  if (!user) {
    res.status(403).end();
    return;
  }
  console.log("resending email for", user.attributes.email);
  const credential = {
    email: user.attributes.email,
    magic_token: user.attributes.magic_token,
  };
  // const status = response.status;
  if (status == 200 && user)
    send_magic_link(
      user.attributes.name,
      user.attributes.email,
      btoa(JSON.stringify(credential))
    );
  res.status(status).end();
});

/*
Check whether a JSON string is valid, expects:
  - str: a string representing a JSON object
*/
function is_json(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/*
Queries API for user record, expects:
  - email: an string representing email address
returns:
  a tuple where the first element is the API fetch status code
  and the second element is a object of the user record 
*/
async function get_user_record(email) {
  const query = {
    filters: {
      email: {
        $eq: email ? email : "", // TODO make sure this is safe we MUST have email "" if input is invalid
      },
    },
    BuyerFragment,
  };
  const response = await fetch(API_URI + `/buyers?${qs.stringify(query)}`, {
    method: "GET",
    headers: { Authorization: API_TOKEN },
  });
  const json = await response.json();
  let result = []; // default to no results in case connection doesn't succeed
  result = json.data;
  console.log(result);
  return [response.status, result.length ? result[0] : null];
}

/*
Middleware for authenticating user, expects:
  - request must have a field called "Credential" in header with a string representing the credential
modifies
  - req by appending an email field with a validated email that exists in the DB
*/
async function user_authenticated(req, res, next) {
  console.log(req.headers);
  const credentials = atob(req.get("Credential")); //decode
  if (!is_json(credentials)) {
    console.log("Invalid credential encountered");
    // end early
    console.log("Authentication failed");
    res.status(403).json(false);
    res.end();
    return;
  }
  const { email, magic_token: token } = JSON.parse(credentials);
  const [status, user] = await get_user_record(email);
  console.log(user);
  if (status == 200 && (user ? user.attributes.magic_token === token : false)) {
    req.buyer = {
      email: email,
      id: user.id,
      admin: user.attributes.admin,
    };
    console.log("Authentication success!");
    next();
  } else {
    console.log("Authentication failed");
    res.status(403).json(false);
    res.end();
  }
}

/* 
This function checks whether a request is coming from an admin
*/
async function check_admin(req) {
  const credentials = atob(req.get("Credential")); //decode
  if (!is_json(credentials)) {
    // end early
    return false;
  }
  const { email, magic_token: token } = JSON.parse(credentials);
  const [status, user] = await get_user_record(email);
  if (status == 200 && (user ? user.attributes.magic_token === token : false)) {
    req.buyer = {
      email: email,
      id: user.id,
      admin: user.attributes.admin,
    };
    return user.attributes.admin ?? false;
  } else {
    return false;
  }
}

/*
A Request is upgraded to an AuthorizedRequest after passing through user_authenticated.
AuthorizedRequest looks identical to Request except it has a valid email that exists in the DB
*/
export interface AuthorizedRequest extends Request {
  buyer?: {
    email: string;
    id: number;
    admin: boolean;
  };
}

module.exports = {
  router: router,
  user_authenticated: user_authenticated,
  check_admin: check_admin,
};
