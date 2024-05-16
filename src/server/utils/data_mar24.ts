const dataJson = require("../../../scripts/data.json");

type ProductObj = {
  product: string;
  category: number;
  link?: string;
  images: string[];
  price_retail: number;
  items: { color: string; sizes: (number | string)[] }[];
};

export const data: ProductObj[] = [
  {
    product: "Swiftly Tech Long-Sleeve Shirt 2.0 Race Length",
    category: 2,
    link: "https://shop.lululemon.com/p/tops-long-sleeve/Swiftly-Tech-LS-2-Race/_/prod9750541",
    price_retail: "78",
    items: [
      {
        color: "Black/Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW3CCHS_4780_1",
        sizes: [4, 6, 8, 10, 12, 14, 16, 18],
      },
      {
        color: "White/White",
        img: "https://images.lululemon.com/is/image/lululemon/LW3FQFS_012826_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "Slate/White",
        img: "https://images.lululemon.com/is/image/lululemon/LW3FQFS_0572_1",
        sizes: [8, 10, 12],
      },
      {
        color: "Hot Heat/Hot Heat",
        img: "https://images.lululemon.com/is/image/lululemon/LW3DOBS_035162_1",
        sizes: [4, 8, 10, 12],
      },
    ],
  },
  {
    product: "Swiftly Tech Short-Sleeve Shirt 2.0 Race Length",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-t-shirts/Swiftly-Tech-Short-Sleeve-2-Race/_/prod9820343",
    price_retail: "68",
    items: [
      {
        color: "Black/Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW3HT1S_4780_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "White/White",
        img: "https://images.lululemon.com/is/image/lululemon/LW3DZBS_012826_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: "Swiftly Tech Racerback Tank Top 2.0 Race Length",
    category: 2,
    link: "https://shop.lululemon.com/p/women-tanks/Swiftly-Tech-RB-2-Race/_/prod9750460",
    price_retail: "58",
    items: [
      {
        color: "Black/Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW1CN3S_4780_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "White/White",
        img: "https://images.lululemon.com/is/image/lululemon/LW1DMJS_012826_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "Slate/White",
        img: "https://images.lululemon.com/is/image/lululemon/LW1DMJS_0572_1",
        sizes: [4, 6, 8, 10, 12],
      },
      {
        color: "Larkspur/Larkspur",
        img: "https://images.lululemon.com/is/image/lululemon/LW1CN3S_042749_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: "Swiftly Tech Cropped Short-Sleeve Shirt 2.0",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-t-shirts/Swiftly-Tech-Cropped-SS-Shirt-2/_/prod11520166",
    price_retail: "68",
    items: [
      {
        color: "Windmill/Windmill",
        img: "https://images.lululemon.com/is/image/lululemon/LW3GZHS_065011_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "Army Green/Army Green",
        img: "https://images.lululemon.com/is/image/lululemon/LW3GZHS_046722_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: "Wunder Train Strappy Racer Bra Light Support, A/B Cup",
    category: 2,
    link: "https://shop.lululemon.com/p/women-sports-bras/Wunder-Train-Strappy-Race-Bra-Light-AB/_/prod11520056",
    price_retail: "58",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW2DQ0S_0001_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: "Wunder Train High-Neck Cross-Back Tank Top",
    category: 2,
    link: "https://shop.lululemon.com/p/women-tanks/Wunder-Train-High-Neck-Cross-Back-Tank-Top/_/prod11560120",
    price_retail: "58",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW1EO1S_0001_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: "Define Jacket Luon",
    category: 2,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Define-Jacket/_/prod5020054",
    price_retail: "118",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW3GQ6S_0001_1",
        sizes: [0, 2, 4, 6, 8, 10, 12, 16, 18, 20],
      },
      {
        color: "White",
        img: "https://images.lululemon.com/is/image/lululemon/LW4AWKS_0002_1",
        sizes: [0, 2, 4, 6, 8, 10, 12, 20],
      },
    ],
  },
  {
    product: "Scuba Oversized Funnel-Neck Half Zip",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Oversized-Funnel-Neck-Shirt/_/prod10850250?color=27597",
    price_retail: "118",
    items: [
      {
        color: "Heathered Core Ultra Light Grey",
        img: "https://images.lululemon.com/is/image/lululemon/LW3HYXS_032493_1",
        sizes: ["XS/S", "M/L", "XL/XXL"],
      },
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW3HW0S_0001_1",
        sizes: ["XS/S", "M/L", "XL/XXL"],
      },
    ],
  },
  {
    product: "Scuba Oversized Half-Zip Hoodie",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Oversized-12-Zip-Hoodie/_/prod9960807",
    price_retail: "118",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW3DM4S_0001_1",
        sizes: ["XS/S", "M/L", "XL/XXL"],
      },
      {
        color: "True Navy",
        img: "https://images.lululemon.com/is/image/lululemon/LW3DM4S_031382_1",
        sizes: ["XS/S", "M/L", "XL/XXL"],
      },
      {
        color: "Heathered Core Ultra Light Grey",
        img: "https://images.lululemon.com/is/image/lululemon/LW3DUSS_032493_1",
        sizes: ["XS/S"],
      },
      {
        color: "Medium Forest",
        img: "https://images.lululemon.com/is/image/lululemon/LW3DM4S_026839_1",
        sizes: ["XS/S"],
      },
    ],
  },
  {
    product: "Scuba Full-Zip Cropped Hoodie",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Full-Zip-Cropped-Hoodie/_/prod11250551",
    price_retail: "118",
    items: [
      {
        color: "Heathered Core Ultra Light Grey",
        img: "https://images.lululemon.com/is/image/lululemon/LW3HMAS_032493_1",
        sizes: [4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: "Wunder Puff Cropped Vest",
    category: 2,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Wunder-Puff-Crop-Vest/_/prod9960896",
    price_retail: "228",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW4BTNS_0001_1",
        sizes: [0, 2, 4, 12, 14],
      },
    ],
  },
  {
    product: "Wunder Puff Jacket",
    category: 2,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Wunder-Puff-Jacket/_/prod9490219",
    price_retail: "298",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW4BTJS_0001_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "White",
        img: "https://images.lululemon.com/is/image/lululemon/LW4CACS_0002_1",
        sizes: [2, 4, 6, 12],
      },
      {
        color: "Trench",
        img: "https://images.lululemon.com/is/image/lululemon/LW4CACS_043731_1",
        sizes: [10, 12, 14],
      },
    ],
  },
  {
    product: "Cross Chill Jacket RepelShell",
    category: 2,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Cross-Chill-Jacket-RepelShell/_/prod10641618",
    price_retail: "198",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW4BOHS_0001_1",
        sizes: [0, 2, 4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: 'Speed Up High-Rise Lined Short 2.5"',
    category: 2,
    link: "https://shop.lululemon.com/p/women-shorts/Speed-Up-Short-Hi-Rise-2-5/_/prod8610610",
    price_retail: "68",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW7AY3S_0001_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: 'Hotty Hot High-Rise Lined Short 2.5"',
    category: 2,
    link: "https://shop.lululemon.com/p/women-shorts/Hotty-Hot-Short-HR/_/prod9250076",
    price_retail: "68",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW7AYYR_0001_1",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
      {
        color: "White",
        img: "https://images.lululemon.com/is/image/lululemon/LW7AY1R_0002_1",
        sizes: [2, 4, 6, 8, 10, 12, 14, 16, 18],
      },
      {
        color: "True Navy",
        img: "https://images.lululemon.com/is/image/lululemon/LW7AYYR_031382_1",
        sizes: [2, 4, 6, 8, 10, 12, 14, 16, 18],
      },
      {
        color: "Orange Flash",
        img: "https://images.lululemon.com/is/image/lululemon/LW7AYYR_033496_1",
        sizes: [6, 8, 10, 12, 14],
      },
      {
        color: "Strawberry Milkshake",
        img: "https://images.lululemon.com/is/image/lululemon/LW7AYYR_017441_1",
        sizes: [4, 6, 8, 10],
      },
    ],
  },
  {
    product: 'lululemon Align™ High-Rise Short 4"',
    category: 2,
    link: "https://shop.lululemon.com/p/women-shorts/Align-Short-4/_/prod9200594",
    price_retail: "64",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW7DDCS_0001_1",
        sizes: [2, 4, 6, 8, 10, 12, 14, 16, 18],
      },
    ],
  },
  {
    product: 'Wunder Train High-Rise Tight 25"',
    category: 2,
    link: "https://shop.lululemon.com/p/women-pants/Wunder-Train-HR-Tight-25/_/prod9750562",
    price_retail: "98",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW5GBJS_0001_1",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
      {
        color: "True Navy",
        img: "https://images.lululemon.com/is/image/lululemon/LW5CQDS_031382_1",
        sizes: [2, 4, 7, 8, 10, 12, 14, 18, 20],
      },
      {
        color: "Larkspur",
        img: "https://images.lululemon.com/is/image/lululemon/LW5CQDS_034115_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "Dark Oxide",
        img: "https://images.lululemon.com/is/image/lululemon/LW5CQDS_054392_1",
        sizes: [2, 4, 6, 12],
      },
    ],
  },
  {
    product: 'lululemon Align™ High-Rise Pant 25"',
    category: 2,
    link: "https://shop.lululemon.com/p/womens-leggings/Align-Pant-2/_/prod2020012",
    price_retail: "98",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW5CT3S_0001_1",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
      {
        color: "True Navy",
        img: "https://images.lululemon.com/is/image/lululemon/LW5DEPS_031382_1",
        sizes: [2, 4, 6, 8, 10, 12, 14, 16, 18],
      },
      {
        color: "College Crimson",
        img: "https://images.lululemon.com/is/image/lululemon/LW5CTBS_062325_1",
        sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
      {
        color: "Harbor Blue",
        img: "https://images.lululemon.com/is/image/lululemon/LW5CYFS_7381_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "Butternut Brown",
        img: "https://images.lululemon.com/is/image/lululemon/LW5CTAS_052147_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "Maize Yellow",
        img: "https://images.lululemon.com/is/image/lululemon/LW5CTCS_059067_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "Brier Rose",
        img: "https://images.lululemon.com/is/image/lululemon/LW5DRJS_045772_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "College Purple",
        img: "https://images.lululemon.com/is/image/lululemon/LW5CT3S_062328_1",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      {
        color: "Dark Olive",
        img: "https://images.lululemon.com/is/image/lululemon/LW5CT3S_026083_1",
        sizes: [4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: "Softstreme High-Rise Pant Regular",
    category: 2,
    link: "https://shop.lululemon.com/p/womens-sweatpants/Softstreme-HR-Pant/_/prod11020340",
    price_retail: "128",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LW5EGTS_0001_1",
        sizes: [2, 4, 6, 8],
      },
    ],
  },
  {
    product: "Men's ABC Jogger 30\"",
    category: 2,
    link: "https://shop.lululemon.com/p/men-joggers/Abc-Jogger/_/prod8530240",
    price_retail: "128",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LM5574S_0001_1",
        sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
      },
      {
        color: "True Navy",
        img: "https://images.lululemon.com/is/image/lululemon/LM5AMZS_031382_1",
        sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
      },
      {
        color: "Obsidian",
        img: "https://images.lululemon.com/is/image/lululemon/LM5A85S_032476_1",
        sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
      },
      {
        color: "Silver Drop",
        img: "https://images.lululemon.com/is/image/lululemon/LM5AJLS_033928_1",
        sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
      },
      {
        color: "Nomad",
        img: "https://images.lululemon.com/is/image/lululemon/LM5AMZS_035955_1",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        color: "Shale Blue",
        img: "https://images.lululemon.com/is/image/lululemon/LM5AMZS_065849_1",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
    ],
  },
  {
    product: "Everywhere Belt Bag 1L",
    category: 2,
    link: "https://shop.lululemon.com/p/bags/Everywhere-Belt-Bag/_/prod8900747",
    price_retail: "38",
    items: [
      {
        color: "True Navy",
        img: "https://images.lululemon.com/is/image/lululemon/LU9AX2S_031382_1",
        sizes: [""],
      },
      {
        color: "Silver Drop",
        img: "https://images.lululemon.com/is/image/lululemon/LU9AX2S_033928_1",
        sizes: [""],
      },
    ],
  },
  {
    product: "All Day Essentials Belt Bag 2.5L",
    category: 2,
    link: "https://shop.lululemon.com/p/bags/All-Day-Essentials-Belt-Bag/_/prod11520426",
    price_retail: "48",
    items: [
      {
        color: "Black",
        img: "https://images.lululemon.com/is/image/lululemon/LU9B13S_0001_1",
        sizes: [""],
      },
    ],
  },
  {
    product: "On My Level Barrel Duffle Bag 16L",
    category: 2,
    link: "https://shop.lululemon.com/p/bags/On-My-Level-Barrel-Duffle-Bag-16L/_/prod11680106",
    price_retail: "138",
    items: [
      {
        color: "Black/Gold",
        img: "https://images.lululemon.com/is/image/lululemon/LW9EVAS_3385_1",
        sizes: [""],
      },
    ],
  },
].map((product) => ({
  ...product,
  price_retail: parseInt(product.price_retail),
  images: product.items.map(({ img }) => img),
  items: product.items.map(({ color, sizes }) => ({ color: color, sizes })),
}));
