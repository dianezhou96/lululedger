/*
This is a helper script to populate the DB given a JSON representing our inventory like the following
[
  {
    product: "Define Jacket Luon",
    category: "Lululemon",
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Define-Jacket/_/prod5020054",
    image_links: [
      "https://images.lululemon.com/is/image/lululemon/LW4AWLS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW4AWKS_0002_1",
    ],
    price_retail: 118,
    items: [
      {
        color: "Black",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
      {
        color: "True Navy",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14],
      },
    ],
  },...
]
Each record should be broken down and upload to 2 different tables:`products`, `product-categories`, 
and item
*/

import { RequestInfo, RequestInit } from "node-fetch";
import { API_TOKEN, API_URI, SG_API_KEY } from "../config";
import { data } from "./data";
const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

interface ProductItem {
  color: string;
  size: string;
}

interface InputItem {
  color: string;
  sizes: Array<string | number>;
}

interface InputProduct {
  product: string;
  category: number;
  link: string;
  images: Array<string>;
  price_retail: number;
  items: Array<InputItem>;
}

// const input: Array<InputProduct> = [
//   {
//     product: "Define Jacket Luon",
//     category: 2,
//     link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Define-Jacket/_/prod5020054",
//     images: [
//       "https://images.lululemon.com/is/image/lululemon/LW4AWLS_0001_1",
//       "https://images.lululemon.com/is/image/lululemon/LW4AWKS_0002_1",
//     ],
//     price_retail: 118,
//     items: [
//       {
//         color: "Black",
//         sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
//       },
//       {
//         color: "True Navy",
//         sizes: [0, 2, 4, 6, 8, 10, 12, 14],
//       },
//     ],
//   },
//   {
//     product: "Scuba Oversized Full Zip",
//     category: 2,
//     link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Oversized-Full-Zip/_/prod10440041",
//     images: [
//       "https://images.lululemon.com/is/image/lululemon/LW3EOZS_0001_1",
//       "https://images.lululemon.com/is/image/lululemon/LW3ESQS_032493_1",
//     ],
//     price_retail: 128,
//     items: [
//       {
//         color: "Black",
//         sizes: ["XS/S", "M/L", "XL/XXL"],
//       },
//       {
//         color: "Heathered Core Ultra Light Grey",
//         sizes: ["XS/S", "M/L", "XL/XXL"],
//       },
//     ],
//   },
//   {
//     product: "lululemon Align™ Tank Top",
//     category: 2,
//     link: "https://shop.lululemon.com/p/women-tanks/Align-Tank/_/prod9600539",
//     images: [
//       "https://images.lululemon.com/is/image/lululemon/LW1DTWS_0001_1",
//       "https://images.lululemon.com/is/image/lululemon/LW1DUDS_0002_1",
//     ],
//     price_retail: 68,
//     items: [
//       { color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
//       { color: "White", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
//     ],
//   },
// ];

async function addItem(item: ProductItem, id: number) {
  try {
    const item_json = {
      color: item.color,
      size: String(item.size),
      product: id,
    };
    const response = await fetch(API_URI + `/items`, {
      method: "POST",
      body: JSON.stringify({ data: item_json }),
      headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
    });
    const json = await response.json();
    if (response.ok) uploaded += 1;
    else
      throw Error(
        `Ecountered error adding an item to product id ${id} with status code ${
          response.status
        } ${JSON.stringify(json)}`
      );
  } catch (error) {
    console.error(`Encountered ${error} adding item to product id ${id}`);
  }
}

async function addProduct(product) {
  try {
    const product_json = {
      name: product.product,
      link: product.link,
      price_retail: product.price_retail,
      product_category: product.category,
      images: product.images,
    };
    console.log(`Adding ${product.product}`);
    const response = await fetch(API_URI + `/products`, {
      method: "POST",
      body: JSON.stringify({ data: product_json }),
      headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
    });
    const json = await response.json();
    if (response.ok) {
      uploaded += 1;
    } else {
      throw Error(
        `Ecountered error adding ${product.product} status code ${
          response.status
        } ${JSON.stringify(json)}`
      );
    }
    const id = json.data.id;
    for (const item of product.items) {
      for (const size of item.sizes) {
        console.log(`Adding item to ${id}`);
        let count = 0;
        while (true) {
          try {
            addItem({ size: size, color: item.color }, id);
            break;
          } catch (e) {
            //try 10 times
            if (++count == 10) throw e;
          }
        }
      }
    }
  } catch (error) {
    console.error(`${error}`);
  }
}

let uploaded = 0;
function main() {
  for (const product of data) {
    addProduct(product);
  }
}

main();
