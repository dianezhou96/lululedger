export const API_URI = "https://<link>/api";
export const API_TOKEN = "bearer <token>";
export const SG_API_KEY = "SG.<key>";
export const GMAIL_TOKEN = "<token>";
export const SHOP_URL = "<link>/shop";
export const ORDERS_URL = "<link>/orders";
export const LOG_LEVEL = function developmentFormatLine(tokens, req, res) {
  // get the status code if response written
  var status = headersSent(res) ? res.statusCode : undefined;

  // get status color
  var color =
    status >= 500
      ? 31 // red
      : status >= 400
      ? 33 // yellow
      : status >= 300
      ? 36 // cyan
      : status >= 200
      ? 32 // green
      : 0; // no color

  // get colored function
  var fn = developmentFormatLine[color];

  if (!fn) {
    // compile
    fn = developmentFormatLine[color] = compile(
      "\x1b[0m\x1b[33m:remote-addr\x1b[0m \x1b[35m:remote-user\x1b[0m [:date] \x1b[45m:method\x1b[0m \x1b[33m:url\x1b[0m \x1b[" +
        color +
        "m:status\x1b[0m :response-time ms :res[content-length]\x1b[0m"
    );
  }

  return fn(tokens, req, res);
};
export const PORT = 3123;

function compile(format) {
  if (typeof format !== "string") {
    throw new TypeError("argument format must be a string");
  }

  var fmt = String(JSON.stringify(format));
  var js =
    '  "use strict"\n  return ' +
    fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (_, name, arg) {
      var tokenArguments = "req, res";
      var tokenFunction = "tokens[" + String(JSON.stringify(name)) + "]";

      if (arg !== undefined) {
        tokenArguments += ", " + String(JSON.stringify(arg));
      }

      return (
        '" +\n    (' + tokenFunction + "(" + tokenArguments + ') || "-") + "'
      );
    });

  // eslint-disable-next-line no-new-func
  return new Function("tokens, req, res", js);
}

function headersSent(res) {
  // istanbul ignore next: node.js 0.8 support
  return typeof res.headersSent !== "boolean"
    ? Boolean(res._header)
    : res.headersSent;
}
