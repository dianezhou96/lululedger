// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
//const isProduction = process.env.NODE_ENV == 'development';
const isProduction = false;
const stylesHandler = "style-loader";
const CompressionPlugin = require("compression-webpack-plugin");
const ProgressBar = require("webpackbar");

module.exports = (env, argv) => {
  const mode = argv.mode;
  const config = {
    entry: "./src/view/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist/view"),
      filename: "bundle-view.js",
    },
    plugins: [
      // show a progress bar
      new ProgressBar(),
      // build gzipped version
      mode === "production" &&
        new CompressionPlugin({
          algorithm: "gzip",
          test: /.js$|.css$/,
        }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          loader: "ts-loader",
          exclude: ["/node_modules/"],
        },
        {
          test: /\.css$/i,
          use: [stylesHandler, "css-loader"],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: "asset",
        },

        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    },
  };
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
