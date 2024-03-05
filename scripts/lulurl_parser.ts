import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { chromium } from "playwright";

const BATCH_SIZE = 3;
async function run() {
  const inputs = readFileSync(
    path.join(__dirname, "lulurls.txt"),
    "utf-8"
  ).split("\n");
  const data: any[] = [];
  for (let i = 0; i < inputs.length; i += BATCH_SIZE) {
    // Process batch of 10 at a time
    console.log("Processing batch: ", `${i} - ${i + BATCH_SIZE}`);
    const batchPromises = inputs.slice(i, i + BATCH_SIZE).map((url) => {
      console.log("Parsing", url);
      return parse(url);
    });
    const results = await Promise.all(batchPromises);
    data.push(...results);
    writeFileSync(
      path.join(__dirname, "data.json"),
      JSON.stringify(data, null, 2)
    );
    console.log("Saved results to data.json...");
    // Wait 10 seconds so lulu doesn't block you
    await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
  }

  console.log("Done! View data.json.");
}

run();

function parseSrcSet(srcs: string) {
  const src = srcs.split(",")[0];
  const end = src.indexOf("?");
  return src.substring(0, end);
}

async function parse(url: string) {
  /**
   * On my local device:
   * - webkit doesn't work at all
   * - chromium works in heaadless:false mode only (fastest)
   * - firefox works always
   */
  const browser = await chromium.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(url);
  const title = await page
    .getByTestId("pdp-title")
    .textContent({ timeout: 2000 });
  const price = await page
    .locator("div.pdp-price-wrapper")
    .textContent({ timeout: 2000 });
  const swatchColors = await page
    .getByTestId("swatch-container")
    .getByTestId("button-tile-group__component_wrapper")
    .locator("div")
    .all();
  const colors: any[] = [];
  for (const color of swatchColors) {
    await color.click();
    const colorImg = await color.locator("img");
    // const colorSrcSet = await colorImg.getAttribute("srcset");
    const name = await color.getAttribute("aria-label");
    const img = await page
      .getByTestId("product-media-carousel")
      .locator("ul.react-multi-carousel-track")
      .locator("li:nth-child(3)")
      .locator("picture")
      .locator("img");
    const srcset = await img.getAttribute("srcset");
    const imgUrl = parseSrcSet(srcset!);
    colors.push({
      name,
      img: imgUrl,
    });
  }

  const data = {
    title,
    price,
    colors,
    url,
  };
  await browser.close();
  return data;
}
