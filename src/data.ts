type ProductObj = {
  product: string;
  category: 2;
  link: string;
  images: string[];
  price_retail: number;
  items: { color: string; sizes: (number | string)[] }[];
};

const data: ProductObj[] = [
  {
    product: "Define Jacket Luon",
    category: 2,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Define-Jacket/_/prod5020054",
    images: [
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
  },
  {
    product: "Scuba Oversized Full Zip",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Oversized-Full-Zip/_/prod10440041",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3EOZS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW3ESQS_032493_1",
    ],
    price_retail: 128,
    items: [
      {
        color: "Black",
        sizes: ["XS/S", "M/L", "XL/XXL"],
      },
      {
        color: "Heathered Core Ultra Light Grey",
        sizes: ["XS/S", "M/L", "XL/XXL"],
      },
    ],
  },
  {
    product: "Scuba Full-Zip Hoodie",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Hoodie-IV/_/prod8351133",
    images: ["https://images.lululemon.com/is/image/lululemon/LW4AWMS_0001_1"],
    price_retail: 118,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14] }],
  },
  {
    product: "Scuba Oversized Half-Zip Hoodie",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Oversized-12-Zip-Hoodie/_/prod9960807",
    images: ["https://images.lululemon.com/is/image/lululemon/LW3DM4S_0001_1"],
    price_retail: 118,
    items: [{ color: "Black", sizes: ["XS/S", "M/L", "XL/XXL"] }],
  },
  {
    product: "Down for It All Vest",
    category: 2,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Down-For-It-Vest/_/prod9200030",
    images: ["https://images.lululemon.com/is/image/lululemon/LW4BY8S_0001_1"],
    price_retail: 148,
    items: [{ color: "Black", sizes: [0, 2, 4, 6] }],
  },
  {
    product: "Swiftly Tech Long-Sleeve Shirt 2.0 Online Only",
    category: 2,
    link: "https://shop.lululemon.com/p/tops-long-sleeve/Swiftly-Tech-LS-2/_/prod9750543",
    images: [
      "https://shop.lululemon.com/p/tops-long-sleeve/Swiftly-Tech-LS-2/_/prod9750543",
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
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3CCHS_4780_1",
      "https://images.lululemon.com/is/image/lululemon/LW3FQFS_0572_1",
    ],
    price_retail: 78,
    items: [
      { color: "Black/Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "Slate/White", sizes: [4, 6, 8, 10, 12, 14, 16, 18, 20] },
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
      { color: "Black/Black", sizes: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "Slate/White", sizes: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
    ],
  },
  {
    product: "High-Neck Running and Training Long-Sleeve Shirt Online Only",
    category: 2,
    link: "https://shop.lululemon.com/p/tops-long-sleeve/High-Neck-Running-and-Training-LS/_/prod10641668",
    images: ["https://images.lululemon.com/is/image/lululemon/LW3GQPS_0001_1"],
    price_retail: 68,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
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
    product: "Wunder Train Strappy Tank Top",
    category: 2,
    link: "https://shop.lululemon.com/p/women-tanks/Wunder-Train-Strappy-Tank-Top/_/prod11450251",
    images: ["https://images.lululemon.com/is/image/lululemon/LW1EDXS_0001_1"],
    price_retail: 68,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14] }],
  },
  {
    product: "Free to Be Bra - Wild Light Support, A/B Cup",
    category: 2,
    link: "https://shop.lululemon.com/p/women-sports-bras/Free-To-Be-Bra-Wild/_/prod2810229",
    images: ["https://images.lululemon.com/is/image/lululemon/LW2670S_0001_1"],
    price_retail: 48,
    items: [{ color: "Black", sizes: [4, 6, 8, 10, 12, 14] }],
  },
  {
    product: "Like a Cloud Bra Light Support, B/C Cup",
    category: 2,
    link: "https://shop.lululemon.com/p/women-sports-bras/Like-a-Cloud-Bra/_/prod9960745",
    images: ["https://images.lululemon.com/is/image/lululemon/LW2BYCS_0001_1"],
    price_retail: 58,
    items: [{ color: "Black", sizes: [2, 4, 6, 8, 10, 12] }],
  },
  {
    product: "Envital Bra Medium Support B/C Cup",
    category: 2,
    link: "https://shop.lululemon.com/p/women-sports-bras/Envital-Bra/_/prod11450024",
    images: ["https://images.lululemon.com/is/image/lululemon/LW2DD7S_0001_1"],
    price_retail: 48,
    items: [{ color: "Black", sizes: [2, 4, 6, 8, 10, 12, 14] }],
  },
  {
    product: "Hotty Hot High-Rise Lined Short 2.5",
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
        sizes: [6, 8, 10, 12, 14, 16, 18, 20],
      },
    ],
  },
  {
    product: "Hotty Hot Low-Rise Lined Short 2.5",
    category: 2,
    link: "https://shop.lululemon.com/p/women-shorts/Hotty-Hot-Short-II/_/prod8551591",
    images: ["https://images.lululemon.com/is/image/lululemon/LW7AUSR_0001_1"],
    price_retail: 68,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14] }],
  },
  {
    product: "Hotty Hot High-Rise Lined Short 4",
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
        sizes: [0, 2, 4, 6, 8, 10, 14, 18, 20],
      },
    ],
  },
  {
    product: "lululemon Align™ High-Rise Short 6",
    category: 2,
    link: "https://shop.lululemon.com/p/women-shorts/Align-Short-6/_/prod8351150",
    images: ["https://images.lululemon.com/is/image/lululemon/LW7CU9S_0001_1"],
    price_retail: 64,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
  },
  {
    product: "lululemon Align™ High-Rise Pant with Pockets 25",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-leggings/Align-HighRise-Tight-25-Pockets/_/prod10370071",
    images: ["https://images.lululemon.com/is/image/lululemon/LW5EHBS_0001_1"],
    price_retail: 128,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
  },
  {
    product: "lululemon Align™ High-Rise Mini-Flared Pant 32",
    category: 2,
    link: "https://shop.lululemon.com/p/women-pants/Align-HR-Mini-Flare-32/_/prod11250399",
    images: ["https://images.lululemon.com/is/image/lululemon/LW5EUSS_0001_1"],
    price_retail: 118,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
  },
  {
    product: "Stretch High-Rise Jogger Full Length",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-joggers/Stretch-Lux-HR-Jogger/_/prod10440071",
    images: ["https://images.lululemon.com/is/image/lululemon/LW5DQDS_0001_1"],
    price_retail: 118,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
  },
  {
    product: "Fast and Free High-Rise Tight 25",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-leggings/Fast-And-Free-Tight-II-NR/_/prod8960003",
    images: ["https://images.lululemon.com/is/image/lululemon/LW5BXQS_0001_1"],
    price_retail: 128,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
  },
  {
    product: "Wunder Train High-Rise Tight 28",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-leggings/Wunder-Train-HR-Tight-28/_/prod10440282",
    images: ["https://images.lululemon.com/is/image/lululemon/LW5DJ0S_0001_1"],
    price_retail: 98,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
  },
  {
    product: "Dance Studio Mid-Rise Pant Full Length",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-sweatpants/Dance-Studio-Pant-III-R-Lined/_/prod1520006",
    images: ["https://images.lululemon.com/is/image/lululemon/LW5ENOR_0001_1"],
    price_retail: 118,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14] }],
  },
  {
    product: "Groove Super-High-Rise Flared Pant Nulu",
    category: 2,
    link: "https://shop.lululemon.com/p/women-pants/Groove-Pant-Flare-Nulu/_/prod9820425",
    images: ["https://images.lululemon.com/is/image/lululemon/LW5FG2S_0001_1"],
    price_retail: 118,
    items: [{ color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }],
  },
  {
    product: "Restfeel Women's Slide",
    category: 2,
    link: "https://shop.lululemon.com/p/shoes/W-Restfeel-Slide/_/prod11021003",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW9EF2S_043646_1",
    ],
    price_retail: 58,
    items: [{ color: "Black/Graphite Gray", sizes: [6, 7, 8, 9, 10, 11, 12] }],
  },
  {
    product: "Metal Vent Tech Short-Sleeve Shirt Updated",
    category: 2,
    link: "https://shop.lululemon.com/p/men-tops/Metal-Vent-Tech-Short-Sleeve-Shirt-2/_/prod11380182",
    images: ["https://images.lululemon.com/is/image/lululemon/LM3DOWS_0572_1"],
    price_retail: 78,
    items: [
      { color: "Slate/White", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    ],
  },
];
