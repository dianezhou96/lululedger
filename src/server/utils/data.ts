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
    product: 'Wunder Train High-Rise Tight 28"',
    category: 3,
    link: "https://shop.lululemon.com/p/womens-leggings/Wunder-Train-HR-Tight-28/_/prod10440282",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5DJ0S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DJ0S_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DJ0S_030210_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DJ3S_047184_1",
      "https://images.lululemon.com/is/image/lululemon/LW5EOLS_054428_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DJ2S_043639_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DJ0S_026083_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DJ0S_055138_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DJ0S_063407_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DJ0S_045720_1",
    ],
    price_retail: 98,
    items: [
      { color: "Black", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "True Navy", sizes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { color: "Graphite Grey", sizes: [2, 4, 6, 8, 10, 12, 14, 16] },
      {
        color: "Heritage 365 Camo Deep Coal Multi",
        sizes: [2, 4, 6, 8, 10, 12],
      },
      { color: "Magenta Purple", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "Heathered Graphite Grey", sizes: [2, 4, 6, 8, 10, 12, 14] },
      { color: "Dark Olive", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "Twilight Rose", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "Storm Teal", sizes: [2, 4, 6, 8, 10, 12] },
      { color: "Violet Verbena", sizes: [4, 6, 8, 10] },
    ],
  },
  {
    items: [
      {
        color: "Black",
        sizes: ["0", "2", "4", "6", "8", "10", "12", "14"],
      },
      {
        color: "Graphite Grey",
        sizes: ["2", "4", "8", "6", "10", "12"],
      },
      {
        color: "Terra Orange",
        sizes: ["2", "6", "8", "10", "12"],
      },
      {
        color: "Magenta Purple",
        sizes: ["2", "4", "6", "10", "8", "12"],
      },
    ],
    product: 'Wunder Train High-Rise Tight with Pockets 25"',
    category: 3,
    link: "https://shop.lululemon.com/p/womens-leggings/Wunder-Train-HR-Tight-Pockets-25/_/prod11140036",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5EPSS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW5EPSS_030210_1",
      "https://images.lululemon.com/is/image/lululemon/LW5EPSS_062283_1",
      "https://images.lululemon.com/is/image/lululemon/LW5EYKS_054428_1",
    ],
    price_retail: 128,
  },
  {
    product: 'Align High-Rise Pant 25"',
    category: 3,
    link: "https://shop.lululemon.com/p/womens-leggings/Align-Pant-2/_/prod2020012",
    price_retail: 98,
    items: [
      {
        color: "Black",
        sizes: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20"],
      },
      {
        color: "True Navy",
        sizes: ["2", "4", "6", "8", "10", "12", "14", "16", "18"],
      },
      {
        color: "Pipe Dream Blue",
        sizes: ["8", "10", "12"],
      },
      {
        color: "Wild Berry",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Heathered Graphite Grey",
        sizes: ["14", "16", "18", "20"],
      },
      {
        color: "Butternut Brown",
        sizes: ["2", "4", "6", "10", "8", "12"],
      },
      {
        color: "Iridescent Floral Multi",
        sizes: ["2", "4", "6", "12"],
      },
      {
        color: "Grey Sage",
        sizes: ["6", "8", "10", "12"],
      },
      {
        color: "Vintage Rose",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Dark Olive",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Ether Green",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Java",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Purple Ash",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
    ],
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5CT3S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CT3S_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CTBS_7398_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CTBS_047862_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CZOS_043639_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CTAS_052147_1",
      "https://images.lululemon.com/is/image/lululemon/LW5DMSS_063280_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CT3S_036763_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CT3S_033142_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CT3S_026083_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CT3S_064195_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CT3S_052868_1",
      "https://images.lululemon.com/is/image/lululemon/LW5CTAS_055841_1",
    ],
  },
  {
    product: "Fast and Free High-Rise Tight 25” Pockets",
    category: 3,
    link: "https://shop.lululemon.com/p/womens-leggings/Nulux-5-Pocket-HR-Running-Tight-25/_/prod11380247",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5FARS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW5FARS_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LW5FARS_026375_1",
    ],
    price_retail: 128,
    items: [
      {
        color: "Black",
        sizes: ["0", "2", "4", "6", "10", "8", "12", "14"],
      },
      {
        color: "True Navy",
        sizes: ["2", "4", "6", "8", "10", "12", "14", "18", "20"],
      },
      {
        color: "Moonlit Magenta",
        sizes: ["2", "4", "6", "10", "12"],
      },
    ],
  },
  {
    product: "Align High-Rise Mini-Flared Pant 32”",
    category: 3,
    link: "https://shop.lululemon.com/p/women-pants/Align-HR-Mini-Flare-32/_/prod11250399",
    price_retail: 118,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5EUSS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW5EUSS_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LW5FDPS_037125_1",
    ],
    items: [
      {
        color: "Black",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "True Navy",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Palm Court",
        sizes: ["2", "6", "8", "10", "12"],
      },
    ],
  },
  {
    product: 'Align Rib Mini-Flare 32"',
    category: 3,
    price_retail: 128,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW5GA8S_063407_1",
    ],
    items: [
      {
        color: "Storm Teal",
        sizes: [2, 4, 6, 8, 10, 12],
      },
    ],
  },
  {
    product: "Define Jacket *Luon",
    category: 3,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Define-Jacket/_/prod5020054",
    price_retail: 118,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW4AWLS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW4AWLS_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LW4AWKS_0002_1",
    ],
    items: [
      {
        color: "Black",
        sizes: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20"],
      },
      {
        color: "True Navy",
        sizes: ["2", "4", "6", "8", "10", "12", "14"],
      },
      {
        color: "White",
        sizes: ["2", "4", "6", "8", "10", "12", "14", "16", "20", "18", "0"],
      },
    ],
  },
  {
    product: "Define Cropped Jacket *Nulu",
    category: 3,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Nulu-Cropped-Define-Jacket/_/prod10930188",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3FFHS_0001_1?",
      "https://images.lululemon.com/is/image/lululemon/LW3FFHS_019746_1",
    ],
    price_retail: 118,
    items: [
      {
        color: "Black",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Espresso",
        sizes: ["8", "10", "12"],
      },
    ],
  },
  {
    product: "Scuba Oversized Full-Zip Hoodie",
    category: 3,
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
    product: "Scuba Full-Zip Cropped Hoodie",
    category: 3,
    link: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Full-Zip-Cropped-Hoodie/_/prod11250551",
    price_retail: 118,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3GZPS_032493_1",
    ],
    items: [
      {
        color: "Heathered Core Ultra Light Grey",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
    ],
  },
  {
    product: "Swiftly Tech Short-Sleeve Shirt 2.0",
    category: 3,
    link: "https://shop.lululemon.com/p/womens-t-shirts/Swiftly-Tech-SS-2/_/prod9750519",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3DFMS_4780_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DFMS_032664_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DFNS_012826_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DFNS_0572_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DFMS_032007_1",
    ],
    price_retail: 68,
    items: [
      {
        color: "Black",
        sizes: ["0", "2", "4", "6", "8", "10", "14", "16", "12", "20", "18"],
      },
      {
        color: "True Navy",
        sizes: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20"],
      },
      {
        color: "White",
        sizes: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20"],
      },
      {
        color: "Slate",
        sizes: ["2", "4", "6", "8", "10", "12", "16", "14", "18"],
      },
      {
        color: "Dark Red",
        sizes: ["2", "4", "6", "12", "10", "8"],
      },
    ],
  },
  {
    product: "Swiftly Tech Long-Sleeve Shirt 2.0",
    link: "https://shop.lululemon.com/p/tops-long-sleeve/Swiftly-Tech-LS-2/_/prod9750543",
    category: 3,
    price_retail: 78,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3DFKS_4780_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DFKS_032664_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DFLS_012826_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DFLS_0572_1",
      "https://images.lululemon.com/is/image/lululemon/LW3DFKS_032007_1",
    ],
    items: [
      {
        color: "Black",
        sizes: ["4", "2", "18", "20", "6", "8", "10", "12", "14", "16"],
      },
      {
        color: "True Navy",
        sizes: ["0", "2", "4", "6", "8", "10"],
      },
      {
        color: "White",
        sizes: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "20", "18"],
      },
      {
        color: "Slate",
        sizes: ["2", "6", "4", "8", "10", "12"],
      },
      {
        color: "Dark Red",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
    ],
  },
  {
    product: "Swiftly Tech Cropped Long Sleeve 2.0",
    category: 3,
    link: "https://shop.lululemon.com/p/tops-long-sleeve/Swiftly-Tech-Cropped-Long-Sleeve-Shirt-2/_/prod11380553",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3GH4S_062190_1",
    ],
    price_retail: 78,
    items: [
      {
        color: "Terra Orange",
        sizes: ["6", "8", "10", "12"],
      },
    ],
  },
  {
    product: "Swiftly Relaxed Long Sleeve",
    category: 3,
    link: "https://shop.lululemon.com/p/tops-long-sleeve/Swiftly-Tech-LS-Breeze/_/prod8510157",
    price_retail: 78,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW3FUPS_4780_1",
      "https://images.lululemon.com/is/image/lululemon/LW3FUQS_0572_1",
      "https://images.lululemon.com/is/image/lululemon/LW3FUPS_032007_1",
      "https://images.lululemon.com/is/image/lululemon/LW3FUPS_053774_1",
    ],
    items: [
      {
        color: "Black",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Slate",
        sizes: ["4", "6", "8", "10"],
      },
      {
        color: "Dark Red",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Blazer Blue Tone",
        sizes: ["2", "4", "6", "8", "10", "12", "14", "16"],
      },
    ],
  },
  {
    product: "Align Tank Top",
    category: 3,
    link: "https://shop.lululemon.com/p/women-tanks/Align-Tank/_/prod9600539",
    price_retail: 68,
    items: [
      {
        color: "Black",
        sizes: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20"],
      },
      {
        color: "Wjote",
        sizes: ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20"],
      },
      {
        color: "Twilight Rose",
        sizes: ["2", "4", "6", "10", "12"],
      },
      {
        color: "Purple Ash",
        sizes: ["4", "8"],
      },
      {
        color: "Vintage Rose",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Storm Teal",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
    ],
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW1DUVS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW1DUDS_0002_1?",
      "https://images.lululemon.com/is/image/lululemon/LW1DUDS_055138_1?",
      "https://images.lululemon.com/is/image/lululemon/LW1DTWS_055841_1",
      "https://images.lululemon.com/is/image/lululemon/LW1DTWS_033142_1",
      "https://images.lululemon.com/is/image/lululemon/LW1DTWS_063407_1",
    ],
  },
  {
    product: "Wunder Train Racerback Tank Top",
    category: 3,
    link: "https://shop.lululemon.com/p/women-tanks/Wunder-Train-Racerback-Tank/_/prod11380295",
    price_retail: 68,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW1EM7S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW1EM8S_0002_1",
      "https://images.lululemon.com/is/image/lululemon/LW1EM7S_036744_1",
      "https://images.lululemon.com/is/image/lululemon/LW1EM8S_061861_1",
    ],
    items: [
      {
        color: "Black",
        sizes: ["2", "10", "12", "14"],
      },
      {
        color: "White",
        sizes: ["0", "4", "2", "6", "8", "10", "12", "14"],
      },
      {
        color: "Utility Blue",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "Atomic Purple",
        sizes: ["4", "2", "6", "8", "10", "12"],
      },
    ],
  },
  {
    product: "Energy Bra *Medium Support, B–D Cups",
    category: 3,
    link: "https://shop.lululemon.com/p/women-sports-bras/Energy-Bra-Long-Line/_/prod9030660",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW2326S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW2540S_0002_1",
      "https://images.lululemon.com/is/image/lululemon/LW2326S_030867_1",
      "https://images.lululemon.com/is/image/lululemon/LW2540S_034668_1",
      "https://images.lululemon.com/is/image/lululemon/LW2540S_061860_1",
    ],
    price_retail: 58,
    items: [
      {
        color: "Black",
        sizes: ["2", "4", "6", "8", "10", "12", "14"],
      },
      {
        color: "White",
        sizes: ["2", "4", "6", "8", "10", "12", "14"],
      },
      {
        color: "Deep Luxe",
        sizes: ["2", "4", "6", "8", "12", "10"],
      },
      {
        color: "Hot Heat",
        sizes: ["6", "8", "10", "12"],
      },
      {
        color: "Meadowsweet Pink",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
    ],
  },
  {
    product: "Everlux with Mesh Train Bra Medium Support B/C Cup",
    category: 3,
    link: "https://shop.lululemon.com/p/women-sports-bras/Everlux-Mesh-Train-Bra-Med-BC-Cup/_/prod11520182",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW2DPZS_045720_1",
    ],
    price_retail: 68,
    items: [
      {
        color: "Violet Verbena",
        sizes: ["2", "6", "8", "10", "12"],
      },
    ],
  },
  {
    product: "Wunder Puff Jacket (Women's)",
    category: 3,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Wunder-Puff-Jacket/_/prod9490219",
    price_retail: 298,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW4BWRS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW4CACS_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LW4CACS_0002_1",
    ],
    items: [
      {
        color: "Black",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
      {
        color: "True Navy",
        sizes: ["2", "4", "6", "8", "10", "12", "14"],
      },
      {
        color: "White",
        sizes: ["2", "4", "6", "8", "10", "12"],
      },
    ],
  },
  {
    product: "Wunder Puff Cropped Vest",
    category: 3,
    price_retail: 228,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Wunder-Puff-Crop-Vest/_/prod9960896",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW4BWQS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW4CAES_0002_1",
    ],
    items: [
      {
        color: "Black",
        sizes: ["0", "2", "4", "6", "8", "10", "12", "14"],
      },
      {
        color: "White",
        sizes: ["4", "6", "8", "10", "12"],
      },
    ],
  },
  {
    product: "Pack It Down Vest",
    category: 3,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Pack-It-Down-Vest/_/prod9090557",
    images: ["https://images.lululemon.com/is/image/lululemon/LW4BOUS_0001_1"],
    price_retail: 148,
    items: [
      {
        color: "Black",
        sizes: ["2", "4", "6", "8", "10", "12", "14"],
      },
    ],
  },
  {
    product: "Cross Chill Jacket",
    category: 3,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Cross-Chill-Jacket-RepelShell/_/prod10641618",
    images: ["https://images.lululemon.com/is/image/lululemon/LW4BOHS_0001_1"],
    price_retail: 198,
    items: [
      {
        color: "Black",
        sizes: ["12"],
      },
    ],
  },
  {
    product: "Baller Hat *Soft",
    category: 3,
    price_retail: 38,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW9EBBS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW9EBBS_059290_1",
    ],
    items: [
      {
        color: "Black",
        sizes: [""],
      },
      {
        color: "Elixir/White",
        sizes: [""],
      },
    ],
  },
  {
    product: "New Crew Backpack",
    link: "https://shop.lululemon.com/p/bags/New-Crew-Backpack/_/prod9370190",
    category: 5,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LU9B15S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LU9B15S_031382_1",
    ],
    price_retail: 98,
    items: [
      {
        color: "Black",
        sizes: [""],
      },
      {
        color: "True Navy",
        sizes: [""],
      },
    ],
  },
  {
    product: 'Pace Breaker Short 5" *Lined',
    category: 4,
    link: "https://shop.lululemon.com/p/men-shorts/Pace-Breaker-Short-5-Lined-Update/_/prod11400108",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LM7B83S_063407_1",
      "https://images.lululemon.com/is/image/lululemon/LM7B85S_064330_1",
    ],
    items: [
      {
        color: "Storm Teal",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        color: "Crushed Granite Grey Multi",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
    ],
    price_retail: 78,
  },
  {
    product: 'Pace Breaker Lined Short 7"',
    category: 4,
    link: "https://shop.lululemon.com/p/men-shorts/Pace-Breaker-Short-NF-7-Lined-Update/_/prod11400110",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LM7B24S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LM7BCBS_061859_1",
    ],
    price_retail: 78,
    items: [
      {
        color: "Black",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      {
        color: "Pitch Blue",
        sizes: ["S", "M", "L", "XL"],
      },
    ],
  },
  {
    product: "License to Train Short-Sleeve Shirt ",
    category: 4,
    link: "https://shop.lululemon.com/p/men-ss-tops/License-To-Train-SS/_/prod10030206",
    images: [
      "https://images.lululemon.com/is/image/lululemon/LM3EJUS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LM3CXLS_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LM3EJUS_055841_1",
      "https://images.lululemon.com/is/image/lululemon/LM3EJUS_063407_1",
      "https://images.lululemon.com/is/image/lululemon/LM3EJUS_026188_1",
      "https://images.lululemon.com/is/image/lululemon/LM3EJUS_047809_1",
      "https://images.lululemon.com/is/image/lululemon/LM3EJUS_062325_1",
      "https://images.lululemon.com/is/image/lululemon/LM3EJUS_059068_1",
      "https://images.lululemon.com/is/image/lululemon/LM3CRXS_028395_1",
      "https://images.lululemon.com/is/image/lululemon/LM3CRXS_1966_1",
    ],
    price_retail: 78,
    items: [
      {
        color: "Black",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      {
        color: "True Navy",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        color: "Purple Ash",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        color: "Storm Teal",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        color: "True Red",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        color: "Red Merlot",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      {
        color: "College Crimsom",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        color: "Burnt Orange",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        color: "Heathered Iron Blue",
        sizes: ["S", "M", "L"],
      },
      {
        color: "Heathered Black",
        sizes: ["S", "M", "L", "XXL"],
      },
    ],
  },
  {
    product: "License To Train Featherweight Knit Tee",
    category: 4,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LM3ERRS_059164_1",
    ],
    price_retail: 78,
    items: [
      {
        color: "Heathered Bone",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
    ],
  },
  {
    product: "Wunder Puff Jacket (Men's)",
    category: 4,
    price_retail: 298,
    images: ["https://images.lululemon.com/is/image/lululemon/LM4AHUS_0001_1"],
    items: [
      {
        color: "Black",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
    ],
  },
  {
    link: "https://shop.lululemon.com/p/mens-jackets-and-outerwear/Wunder-Puff-Vest/_/prod9960899",
    category: 4,
    product: "Wunder Puff Vest",
    price_retail: 248,
    images: ["https://images.lululemon.com/is/image/lululemon/LM4AIHS_0001_1"],
    items: [
      {
        color: "Black",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
    ],
  },
  {
    product: "Down for It All Vest",
    link: "https://shop.lululemon.com/p/mens-jackets-and-outerwear/Down-For-It-All-Vest-M/_/prod9200640",
    category: 4,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LM4AMYS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LM4AMYS_031382_1",
    ],
    price_retail: 168,
    items: [
      {
        color: "Black",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        color: "True Navy",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
    ],
  },
  {
    product: "Pack It Down Jacket",
    category: 3,
    link: "https://shop.lululemon.com/p/jackets-and-hoodies-jackets/Pack-It-Down-Jacket/_/prod9090082",
    price_retail: 198,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LW4BOVS_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LW4BOVS_047780_1",
    ],
    items: [
      { color: "Black", sizes: [2, 4, 6, 8, 10, 12, 14] },
      { color: "Rhino Grey", sizes: [4, 6, 8, 12] },
    ],
  },
  {
    product: "ABC Jogger *Warpstreme 30",
    category: 4,
    link: "https://shop.lululemon.com/p/men-joggers/Abc-Jogger/_/prod8530240",
    price_retail: 128,
    images: [
      "https://images.lululemon.com/is/image/lululemon/LM5AW0S_0001_1",
      "https://images.lululemon.com/is/image/lululemon/LM5AW0S_031382_1",
      "https://images.lululemon.com/is/image/lululemon/LM5AJLS_026083_1",
      "https://images.lululemon.com/is/image/lululemon/LM5AW0S_033928_1",
      "https://images.lululemon.com/is/image/lululemon/LM5AJLS_026865_1",
      "https://images.lululemon.com/is/image/lululemon/LM5AMZS_035955_1",
      "https://images.lululemon.com/is/image/lululemon/LM5AMZS_029824_1",
    ],
    items: [
      { color: "Black", sizes: ["S", "M", "L", "XL", "XXL"] },
      { color: "True Navy", sizes: ["S", "M", "L", "XL", "XXL"] },
      { color: "Dark Olive", sizes: ["S", "M", "L", "XXL"] },
      { color: "Silver Drop", sizes: ["S", "M", "L", "XL", "XXL"] },
      { color: "Iron Blue", sizes: ["S", "M", "L", "XL", "XXL"] },
      { color: "Nomad", sizes: ["S", "M", "L", "XL", "XXL"] },
      { color: "Dark Forest", sizes: ["S", "M", "L", "XL", "XXL"] },
    ],
  },
];
