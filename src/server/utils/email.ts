import sgMail = require("@sendgrid/mail");
import { SG_API_KEY, GMAIL_TOKEN, SHOP_URL, ORDERS_URL } from "../config";
import nodemailer = require("nodemailer");
import { DEADLINE, SHOP_NAME } from "../../constants";

sgMail.setApiKey(SG_API_KEY);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dianez.sfit@gmail.com",
    pass: GMAIL_TOKEN,
  },
});

type Email = {
  to: string;
  cc?: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

export async function send_magic_link(name, email, credential, skater, team) {
  const text = `Hi ${name}, this is your secret login link to order from ${SHOP_NAME}! Use this link to view and edit your orders. Please do not share it with those you do not wish to have access to your account.
${SHOP_URL}?credential=${credential}`;
  const html = `
  <!DOCTYPE html>
<html>
<head>
  <title>Account Login</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 30px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
    }
    p {
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .login-link {
      display: inline-block;
      padding: 10px 20px;
      border: 2px solid #007bff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to ${SHOP_NAME}!</h1>
    <p>Hi ${name},</p>
    <p>Thanks for checking out our fundraiser! To access your account, please use the following link:</p>
    <p><b><a href="${SHOP_URL}?credential=${credential}" class="login-link">View and edit my orders</a></b></p>
    <p>Or copy and paste this link: ${SHOP_URL}?credential=${credential}</p>
    <p><b>This link does not expire; do not share it with those you do not wish to have access to your account.</b></p>
    <p>We have noted that you are affiliated with SFIT through ${skater} of the ${team} team.</p>
    <p>If you have any questions or need assistance, don't hesitate to contact Diane by replying to this email!</p>
    <p>Best regards,<br>San Francisco Ice Theatre</p>
  </div>
</body>
</html>
  `;
  const msg = {
    to: email,
    from: "SFIT Diane <dianez.sfit@gmail.com>",
    subject: SHOP_NAME,
    text: text,
    html: html,
  };
  // sendgrid_send(msg);
  gmail_send(msg);
}

export async function sendgrid_send(msg: Email) {
  const { to, from, subject, text, html } = msg;
  const message = {
    trackingSettings: {
      clickTracking: {
        enable: false,
        enableText: false,
      },
    },
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html,
  };
  let code = 200;
  try {
    const response = await sgMail.send(message);
    code = response[0].statusCode;
    console.log(code, "Email sent successfully with Sendgrid API!");
  } catch (error) {
    console.log(error, "Email send error with Sendgrid API");
    code = 500;
  }
}

export async function gmail_send(msg: Email) {
  const { to, cc, from, subject, text, html } = msg;
  try {
    const result = await transporter.sendMail({
      from: from,
      cc: cc,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    console.log(JSON.stringify(result, null, 4));
    console.log("Email sent successfully with Gmail API!");
  } catch (error) {
    console.log(error, "Email sent error with Gmail API");
  }
}

export async function send_order_received(
  name,
  email,
  credential,
  skater,
  team
) {
  const text = `Hi ${name}, your ${SHOP_NAME} order has been received! For your reference, you can view your order at this link: ${ORDERS_URL}?credential=${credential}`;
  const html = `
  <!DOCTYPE html>
<html>
<head>
  <title>Order Received</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 30px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    p {
      margin-bottom: 20px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="container">
    <p>Hi ${name},</p>
    <p>Thanks for ordering through our fundraiser! This email confirms that we received your order.</p>
    <p>For your reference, you can view your order at this link: ${ORDERS_URL}?credential=${credential}</p>
    <p>You may edit your order until the deadline: ${DEADLINE}. (If it's after the deadline and you received this email, your order still made it through!)</p>
    <p>We will do our best to fulfill as many items in your order as possible, but note that some items may be out of stock, or may not meet the minimum requirement for bulk discount, in which case we won't order the item and you won't be charged for it.</p>
    <p>You can expect an invoice and instructions for payment and pickup within a couple weeks after the deadline. Reminder: <b>We do NOT offer shipping or delivery directly to your location.</b> All items will be shipped to one location for the bulk discount and distributed via SFIT skaters; if this does not work for you, please cancel your order. We have noted that you are affiliated with SFIT through ${skater} of the ${team} team.</p>
    <p>Thank you for your patience and support!</p>
    <p>Best regards,<br>San Francisco Ice Theatre</p>
  </div>
</body>
</html>
  `;
  const msg = {
    to: email,
    from: "SFIT Diane <dianez.sfit@gmail.com>",
    subject: `${SHOP_NAME} Order Received`,
    text: text,
    html: html,
  };
  // sendgrid_send(msg);
  gmail_send(msg);
}

export async function send_invoice(name, email, order, total, skater, team) {
  const text = `Hi ${name}, your ${SHOP_NAME} order total is ${total}! You need html enabled in email to see your invoice and get payment instructions. Please contact us if you need help with this.`;
  const html = `
  <!DOCTYPE html>
<html>
<head>
  <title>Invoice & Payment Instructions</title>
  <style>
    p {
      margin-bottom: 20px;
      line-height: 1.5;
    }
    table {
      width: 100%;
    }
    .red {
      color: red;
    }
    .green {
      color: blue;
    }
  </style>
</head>
<body>
  <div>
    <p>Hi ${name},</p>
    <p>Thank you so much for supporting us through the ${SHOP_NAME}! See your invoice at the bottom of this email.</p>
    <p>Your total due is <b>${total}</b>. Please follow these instructions to make your payment:
      <ol>
        <li>Pay Jennifer Sung (CC'ed) via one of the following methods:
          <ul>
            <li>Paypal: wildcateyes7@yahoo.com</li>
            <li>Venmo: @JsungRetinacat (last 4 of phone #: 2623)</li>
          </ul>
        <li>Payment description: Include your name and SFIT skater's team (e.g. Jane Doe, Adult team).
        <li>Payment type: <b>Friends and Family</b> (NOT goods and services)
      </ol>
    </p>
    <p>Payment is due before pickup. Pickup will be ready in a few days and instructions will be sent in a separate email. We have noted that you are affiliated with SFIT through ${skater} of the ${team} team.</p>
    <p>Best regards,<br>San Francisco Ice Theatre</p>
    <h1>Invoice</h1>
    ${order}
  </div>
</body>
</html>
  `;
  const msg = {
    to: email,
    cc: "retinacat@yahoo.com",
    from: "SFIT Diane <dianez.sfit@gmail.com>",
    subject: `${SHOP_NAME} Invoice & Payment Instructions`,
    text: text,
    html: html,
  };
  gmail_send(msg);
}
