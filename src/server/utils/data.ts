type ProductObj = {
  product: string;
  category: 2;
  link: string;
  images: string[];
  price_retail: number;
  items: { color: string; sizes: (number | string)[] }[];
};

export const data: ProductObj[] = [
  {
    product: "The Mat 5mm",
    category: 2,
    link: "https://shop.lululemon.com/p/accessories/The-Mat-5mm/_/prod10990033",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LU9AKDS_0001_4",
      "https://images.lululemon.com/is/image/lululemon/LU9AKDS_062113_1",
    ],
    price_retail: 94,
    items: [
      { color: "Black", sizes: [null] },
      {
        color: "Silver Blue/Tidewater Teal",
        sizes: [null],
      },
    ],
  },
  {
    product: "Define Jacket Luon",
    category: 2,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Define-Jacket/_/prod5020054",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW4AWLS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW4AWLS_031382_1",
    ],
    price_retail: 118,
    items: [
      {
        color: "Black",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
      {
        color: "True Navy",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
    ],
  },
  {
    product: "Scuba Full-Zip Hoodie",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Hoodie-IV/_/prod8351133",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW4AWMS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW4AWNS_032493_1",
    ],
    price_retail: 118,
    items: [
      { color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      {
        color: "Heathered Core Ultra Light Grey",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
    ],
  },
  {
    product: "Scuba Oversized Full Zip",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Oversized-Full-Zip/_/prod10440041",
    images: ["https://images.lululemon.com/is/image/lululemon/LW3EOZS_0001_1"],
    price_retail: 128,
    items: [
      {
        color: "Black",
        sizes: ["XS/S", "M/L", "XL/XXL"],
      },
    ],
  },
  {
    product: "Scuba Oversized Half-Zip Hoodie",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Oversized-12-Zip-Hoodie/_/prod9960807",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3DM4S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DUSS_032493_1",
    ],
    price_retail: 118,
    items: [
      { color: "Black", sizes: ["XS/S", "M/L", "XL/XXL"] },
      {
        color: "Heathered Core Ultra Light Grey",
        sizes: ["XS/S", "M/L", "XL/XXL"],
      },
    ],
  },
  {
    product: "Swiftly Tech Long-Sleeve Shirt 2.0",
    category: 2,
    link: "https://shop.lululemon.com/p/tops-long-sleeve/Swiftly-Tech-LS-2/_/prod9750543",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3BQ3S_4780_1",
      "https://images.lululemon.com/is/image/lululemon/LW3F81S_0572_1",
    ],
    price_retail: 78,
    items: [
      { color: "Black/Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "Slate/White", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
    ],
  },
  {
    product: "Swiftly Tech Long-Sleeve Shirt 2.0 Race Length",
    category: 2,
    link: "https://shop.lululemon.com/p/tops-long-sleeve/Swiftly-Tech-LS-2-Race/_/prod9750541",
    images: ["https://images.lululemon.com/is/image/lululemon/LW3CCHS_4780_1"],
    price_retail: 78,
    items: [
      { color: "Black/Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
    ],
  },
  {
    product: "Swiftly Tech Short-Sleeve Shirt 2.0",
    category: 2,
    link: "https://shop.lululemon.com/p/tops-short-sleeve/Swiftly-Tech-SS-2/_/prod9750519",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3HHHS_4780_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DFNS_0572_1",
    ],
    price_retail: 68,
    items: [
      { color: "Black/Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "Slate/White", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
    ],
  },
  {
    product: "lululemon Align™ Tank Top",
    category: 2,
    link: "https://shop.lululemon.com/p/women-tanks/Align-Tank/_/prod9600539",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW1DTWS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW1DUDS_0002_1",
    ],
    price_retail: 68,
    items: [
      { color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "White", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
    ],
  },
  {
    product: "Free to Be Bra - Wild Light Support, A/B Cup",
    category: 2,
    link: "https://shop.lululemon.com/p/women-sports-bras/Free-To-Be-Bra-Wild/_/prod2810229",
    images: ["https://images.lululemon.com/is/image/lululemon/LW2670S_0001_1"],
    price_retail: 48,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12] }],
  },
  {
    product: "Like a Cloud Bra Light Support, B/C Cup",
    category: 2,
    link: "https://shop.lululemon.com/p/women-sports-bras/Like-a-Cloud-Bra/_/prod9960745",
    images: ["https://images.lululemon.com/is/image/lululemon/LW2BYCS_0001_1"],
    price_retail: 58,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12] }],
  },
  {
    product: "Hotty Hot High-Rise Lined Short 2.5″",
    category: 2,
    link: "https://shop.lululemon.com/p/women-shorts/Hotty-Hot-Short-HR/_/prod9250076",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW7AYYR_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW7AYYR_031382_1",
    ],
    price_retail: 68,
    items: [
      {
        color: "Black",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
      {
        color: "True Navy",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
    ],
  },
  {
    product: "Hotty Hot Low-Rise Lined Short 2.5″",
    category: 2,
    link: "https://shop.lululemon.com/p/women-shorts/Hotty-Hot-Short-II/_/prod8551591",
    images: ["https://images.lululemon.com/is/image/lululemon/LW7AUSR_0001_1"],
    price_retail: 68,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
  },
  {
    product: "Hotty Hot High-Rise Lined Short 4″",
    category: 2,
    link: "https://shop.lululemon.com/p/women-shorts/Hotty-Hot-Short-HR-Long/_/prod9250073",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW7AYXT_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW7ARIT_031382_1",
    ],
    price_retail: 68,
    items: [
      {
        color: "Black",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
      {
        color: "True Navy",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
    ],
  },
  {
    product: "lululemon Align™ High-Rise Short 6″",
    category: 2,
    link: "https://shop.lululemon.com/p/women-shorts/Align-Short-6/_/prod8351150",
    images: ["https://images.lululemon.com/is/image/lululemon/LW7CU9S_0001_1"],
    price_retail: 64,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
  },
  {
    product: "lululemon Align™ High-Rise Pant with Pockets 25″",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-leggings/Align-HighRise-Tight-25-Pockets/_/prod10370071",
    images: ["https://images.lululemon.com/is/image/lululemon/LW5EHBS_0001_1"],
    price_retail: 128,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
  },
  {
    product: "lululemon Align™ High-Rise Mini-Flared Pant 32″",
    category: 2,
    link: "https://shop.lululemon.com/p/women-pants/Align-HR-Mini-Flare-32/_/prod11250399",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5EUSS_036763_1",
      "https://images.lululemon.com/is/image/lululemon/LW5EUSS_054392_1i",
    ],
    price_retail: 118,
    items: [
      { color: "Grey Sage", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "Dark Oxide", sizes: [2, 4, 6, 8, 10, 12] },
    ],
  },
  {
    product: "Stretch High-Rise Jogger Full Length",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-joggers/Stretch-Lux-HR-Jogger/_/prod10440071",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5DQDS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CV4S_031382_1",
    ],
    price_retail: 118,
    items: [
      { color: "Black", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "True Navy", sizes: [2, 4, 6, 8, 10, 12] },
    ],
  },
  {
    product: "Fast and Free High-Rise Tight 25″",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-leggings/Fast-And-Free-Tight-II-NR/_/prod8960003",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5BXQS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW5ATIS_031382_1",
    ],
    price_retail: 128,
    items: [
      { color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "True Navy", sizes: [2, 4, 6, 8, 10, 12] },
    ],
  },
  {
    product: "Wunder Train High-Rise Tight 28″",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-leggings/Wunder-Train-HR-Tight-28/_/prod10440282",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5DJ0S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DJ0S_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DJ3S_047184_1",
    ],
    price_retail: 98,
    items: [
      { color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "True Navy", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      {
        color: "Heritage 365 Camo Deep Coal Multi",
        sizes: [2, 4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: "Groove Super-High-Rise Flared Pant Nulu",
    category: 2,
    link: "https://shop.lululemon.com/p/women-pants/Groove-Pant-Flare-Nulu/_/prod9820425",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5FG2S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW5FG2S_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LW5FG2S_036744_1",
    ],
    price_retail: 118,
    items: [
      { color: "Black", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "True Navy", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "Utility Blue", sizes: [2, 4, 6, 8, 10, 12] },
    ],
  },
  {
    product: "Metal Vent Tech Short-Sleeve Shirt Updated",
    category: 2,
    link: "https://shop.lululemon.com/p/men-tops/Metal-Vent-Tech-Short-Sleeve-Shirt-2/_/prod11380182",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LM3DOWS_0572_1",
      "https://images.lululemon.com/is/image/lululemon/LM3DOWS_039776_2",
      "https://images.lululemon.com/is/image/lululemon/LM3DOWS_033976_1",
    ],
    price_retail: 78,
    items: [
      { color: "Slate/White", sizes: ["S", "M", "L", "XL", "XXL"] },
      { color: "Mineral Blue/True Navy", sizes: ["S", "M", "L", "XL", "XXL"] },
      { color: "Graphite Grey/Black", sizes: ["S", "M", "L", "XL", "XXL"] },
    ],
  },
  {
    product: "Metal Vent Tech Long-Sleeve Shirt Updated",
    category: 2,
    link: "https://shop.lululemon.com/p/mens-t-shirts/Metal-Vent-Tech-Long-Sleeve-Shirt-2/_/prod11380483",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LM3DOYS_0572_1",
      "https://images.lululemon.com/is/image/lululemon/LM3DOYS_039776_1",
      "https://images.lululemon.com/is/image/lululemon/LM3DOYS_033976_2",
    ],
    price_retail: 88,
    items: [
      { color: "Slate/White", sizes: ["S", "M", "L", "XL", "XXL"] },
      { color: "Mineral Blue/True Navy", sizes: ["S", "M", "L", "XL", "XXL"] },
      { color: "Graphite Grey/Black", sizes: ["S", "M", "L", "XL", "XXL"] },
    ],
  },
];
