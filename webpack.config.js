/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// enable this for analyze
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "development",
  entry: "./index.tsx",
  devtool: "source-map",
  target: "web",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@assets": path.resolve(__dirname, "assets/")
    },
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /fonts[\\/].*\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: isDevelopment
              ? {
                  getCustomTransformers: () => ({
                    before: isDevelopment ? [ReactRefreshTypeScript()] : []
                  }),
                  // `ts-loader` does not work with HMR unless `transpileOnly` is used.
                  // If you need type checking, `ForkTsCheckerWebpackPlugin` is an alternative.
                  transpileOnly: isDevelopment
                }
              : undefined
          }
        ],
        exclude: "/node_modules/"
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: isDevelopment } }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: isDevelopment } },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
              implementation: require("sass"),
              prependData: `@import "./src/styles/variables.scss";`
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(webp)$/i,
        use: ["file-loader", "webp-loader"]
      }
    ]
  },
  devServer: {
    contentBase: "./public",
    port: 3000,
    writeToDisk: true,
    historyApiFallback: true,
    hot: true
  },
  output: {
    filename: "[name]-[contenthash].js",
    chunkFilename: "[name]-[contenthash].js",
    path: path.resolve(__dirname, "public/dist"),
    publicPath: "/"
  },
  optimization: {
    minimize: !isDevelopment,
    usedExports: true,
    sideEffects: true,
    removeEmptyChunks: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        extractComments: true
      }),
      new CssMinimizerPlugin({
        sourceMap: isDevelopment
      })
    ],
    splitChunks: {
      chunks: "async",
      minSize: 200000,
      minRemainingSize: 0,
      maxSize: 400000,
      minChunks: 2,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 5,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html")
      // favicon: "./assets/logo.ico"
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
      chunkFilename: "[name]-[contenthash].css",
      insert: (linkTag) => {
        const preloadLinkTag = document.createElement("link");
        preloadLinkTag.rel = "preload";
        preloadLinkTag.as = "style";
        preloadLinkTag.href = linkTag.href;
        document.head.appendChild(preloadLinkTag);
        document.head.appendChild(linkTag);
      }
    }),
    new RobotstxtPlugin({
      fliePath: "./robots.txt"
    }),
    new webpack.ProvidePlugin({
      process: "process/browser"
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin()
    // enable this for analyze
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean)
};
