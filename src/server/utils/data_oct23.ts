type ProductObj = {
  product: string;
  category: number;
  link: string;
  images: string[];
  price_retail: number;
  items: { color: string; sizes: (number | string)[] }[];
};

export const data: ProductObj[] = [
  {
    product: "Pack It Down Jacket",
    category: 4,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Pack-It-Down-Jacket/_/prod9090082?color=0001",
    images: ["https://images.lululemon.com/is/image/lululemon/LW4BEKS_0001_1"],
    price_retail: 198,
    items: [{ color: "Black", sizes: [2, 4, 6, 8, 10, 12, 14] }],
  },
  {
    product: "Wunder Puff Cropped Vest",
    category: 4,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Wunder-Puff-Crop-Vest/_/prod9960896?color=26839",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW4CAES_026839_1",
    ],
    price_retail: 228,
    items: [{ color: "Medium Forest", sizes: [8, 10, 12] }],
  },
  {
    product: "Define Jacket *Luon",
    category: 4,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Define-Jacket/_/prod5020054",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3GQ6S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW4AWKS_0002_1",
      "https://images.lululemon.com/is/image/lululemon/LW3GQ6S_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LW4AWLS_035955_1",
      "https://images.lululemon.com/is/image/lululemon/LW3HN7S_061860_1",
    ],
    price_retail: 118,
    items: [
      { color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "White", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "True Navy", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "Nomad", sizes: [2, 4, 6, 8] },
      { color: "Meadowsweet Pink", sizes: [4, 6] },
    ],
  },
  {
    product: "Scuba Oversized Full-Zip Hoodie",
    category: 4,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Oversized-Full-Zip/_/prod10440041?color=0001",
    images: ["https://images.lululemon.com/is/image/lululemon/LW3EOZS_0001_1"],
    price_retail: 128,
    items: [{ color: "Black", sizes: ["XS/S", "M/L", "XL/XXL"] }],
  },
  {
    product: "Scuba Oversized Half Zip Hoodie",
    category: 4,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Oversized-12-Zip-Hoodie/_/prod9960807",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3DM4S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DM4S_031382_1",
    ],
    price_retail: 118,
    items: [
      { color: "Black", sizes: ["XS/S", "M/L"] },
      { color: "True Navy", sizes: ["XS/S"] },
    ],
  },
  {
    product: "Groove Super High Rise Flare Pant *Nulu 32.5”",
    category: 4,
    link: "https://shop.lululemon.com/p/women-pants/Groove-Pant-Flare-Nulu/_/prod9820425",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5FG2S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW5FG2S_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LW5FG2S_029824_1",
      "https://images.lululemon.com/is/image/lululemon/LW5FG2S_019746_1",
    ],
    price_retail: 118,
    items: [
      { color: "Black", sizes: [2, 4, 6, 8, 10, 12, 14] },
      { color: "True Navy", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "Dark Forest", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "Espresso", sizes: [2, 4, 6, 8, 10, 12] },
    ],
  },
  {
    product: "Down for it All Hoodie",
    category: 5,
    link: "https://shop.lululemon.com/p/mens-jackets-and-outerwear/Down-For-It-All-Hoodie/_/prod9200786",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LM4AMVS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LM4AMVS_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LM4AMVS_7398_1",
    ],
    price_retail: 228,
    items: [
      { color: "Black", sizes: ["S", "M", "XL", "XXL"] },
      {
        color: "True Navy",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      { color: "Pipe Dream Blue", sizes: ["S", "M", "L", "XL", "XXL"] },
    ],
  },
  {
    product: "Wonder Puff Vest",
    category: 5,
    link: "https://shop.lululemon.com/p/mens-jackets-and-outerwear/Wunder-Puff-Vest/_/prod9960899",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LM4AIHS_031382_1",
    ],
    price_retail: 248,
    items: [{ color: "True Navy", sizes: ["S", "M"] }],
  },
];
