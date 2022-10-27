const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const TerserPlugin = require("terser-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const DotenvWebpackPlugin = require("dotenv-webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

/**
 *
 * @returns {import("webpack").Configuration}
 */
module.exports = function (webpackEnv, argv) {
  const PORT = argv.port || "3000";
  const IS_DEVELOPMENT = argv.mode === "development";
  const IS_PRODUCTION = argv.mode === "production";
  const IS_PROFILE = argv.profile;

  return {
    mode: argv.mode,
    bail: IS_PRODUCTION,
    devtool: getWebpackDevtool(IS_PRODUCTION, IS_DEVELOPMENT),
    context: __dirname,
    entry: paths.appEntry,
    output: getWebpackOutput(IS_PRODUCTION),
    infrastructureLogging: {
      level: "none",
    },
    cache: getWebpackCache(),
    optimization: getWebpackOptimization(IS_PRODUCTION),
    resolve: getWebpackResolve(),
    module: getWebpackModule(IS_PRODUCTION, IS_DEVELOPMENT),
    plugins: getWebpackPlugins(IS_PRODUCTION, IS_PROFILE),
    parallelism: getWebpackParallelism(),
    performance: false,
    devServer: getWebpackDevServer(IS_DEVELOPMENT, PORT),
  };
};

const regexes = {
  css: /\.css$/,
  cssModule: /\.module\.css/,
  scss: /\.(scss|sass)/,
  scssModule: /\.module\.(scss|sass)/,
};
const paths = {
  appSrc: path.join(__dirname, "src"),
  appPackageJson: path.join(__dirname, "package.json"),
  appEntry: "./src/index.tsx",
  appNodeModules: path.join(__dirname, "node_modules"),
  appBuild: path.join(__dirname, "build"),
  appPublic: path.join(__dirname, "public"),
  appTsconfig: path.join(__dirname, "tsconfig.json"),
  appIndexHtml: path.join(__dirname, "public/index.html"),
  appFavicon: path.join(__dirname, "public/favicon.ico"),
  webpackCacheDir: path.join(__dirname, ".webpack"),
  env: path.join(__dirname, ".env"),
};

/**
 *
 * @param {boolean} development
 * @param {number | string} port
 * @return {import("webpack").Configuration["devServer"]}
 */
function getWebpackDevServer(development, port) {
  if (development) {
    return {
      allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      compress: true,
      client: {
        progress: true,
        reconnect: true,
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      static: {
        directory: paths.appPublic,
      },
      liveReload: true,
      hot: true,
      port: port,
      historyApiFallback: true,
    };
  }
  return void 0;
}

/**
 *
 * @param {boolean} production
 * @param {*} cssOptions
 * @param {string | undefined} preProcessor
 * @returns
 */
function getStyleLoaders(production, cssOptions, preProcessor) {
  const styleLoader = !production && require.resolve("style-loader");
  const cssExtractLoader = production && {
    loader: MiniCssExtractPlugin.loader,
    options: {},
  };
  const cssLoader = {
    loader: require.resolve("css-loader"),
    options: cssOptions,
  };
  const postcssLoader = {
    loader: require.resolve("postcss-loader"),
    options: {
      postcssOptions: {
        ident: "postcss", // Necessary for external CSS imports to work https://github.com/facebook/create-react-app/issues/2677
        config: false,
        plugins: [
          "tailwindcss",
          "postcss-flexbugs-fixes",
          [
            "postcss-preset-env",
            {
              autoprefixer: {
                flexbox: "no-2009",
              },
              stage: 3,
            },
          ],
        ],
      },
      sourceMap: production,
    },
  };
  const resolveUrlLoader = preProcessor && {
    loader: require.resolve("resolve-url-loader"),
    options: {
      sourceMap: production,
      root: paths.appSrc,
    },
  };
  const preProcessorLoader = preProcessor && {
    loader: require.resolve(preProcessor),
    options: {
      sourceMap: true,
    },
  };

  const loaders = [
    styleLoader,
    cssExtractLoader,
    cssLoader,
    postcssLoader,
    resolveUrlLoader,
    preProcessorLoader,
  ].filter(Boolean);

  return loaders;
}

/**
 *
 * @param {boolean} production
 * @param {boolean} development
 * @returns
 */
function getWebpackDevtool(production, development) {
  if (production) {
    // always go for "source-map" for production
    return "source-map";
  } else if (development) {
    return "eval-cheap-module-source-map";
  }
}

/**
 *
 * @param {boolean} production
 * @returns {import("webpack").Configuration["output"]}
 */
function getWebpackOutput(production) {
  return {
    path: paths.appBuild,
    pathinfo: false,
    publicPath: "/",
    filename: production ? "static/js/[name].[contenthash:8].js" : "static/js/bundle.js",
    chunkFilename: production ? "static/js/[name].[contenthash:8].chunk.js" : "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
  };
}

/**
 * @returns {import("webpack").Configuration["cache"]}
 */
function getWebpackCache() {
  return {
    type: "filesystem",
    cacheDirectory: paths.webpackCacheDir,
    store: "pack",
    compression: "gzip",
    buildDependencies: {
      defaultWebpack: ["webpack/lib/"],
      config: [__filename],
      tsconfig: [paths.appTsconfig],
    },
  };
}

/**
 *
 * @param {boolean} production
 * @returns {import("webpack").Configuration["optimization"]}
 */
function getWebpackOptimization(production) {
  const terserPlugin = new TerserPlugin({
    parallel: true,
    terserOptions: {
      compress: {
        ecma: 5,
        comparisons: false,
        inline: 2,
      },
      mangle: {
        safari10: true,
      },
      sourceMap: true,
    },
  });
  const cssMinimizerPlugin = new CssMinimizerPlugin({ parallel: true });

  return {
    minimize: production,
    minimizer: [terserPlugin, cssMinimizerPlugin],
    usedExports: true,
  };
}

/**
 *
 * @returns {import("webpack").Configuration["resolve"]}
 */
function getWebpackResolve() {
  // alias must be the same as "compilerOptions.paths" in tsconfig.json
  return {
    extensions: [".tsx", ".ts", ".js", ".json"],
    cacheWithContext: false,
    alias: {
      "#/assets": path.resolve(__dirname, "./src/assets"),
      "#/utils": path.resolve(__dirname, "./src/utils"),
      "#/redux": path.resolve(__dirname, "./src/redux"),
      "#/types": path.resolve(__dirname, "./src/types"),
      "#/screens": path.resolve(__dirname, "./src/screens"),
    },
  };
}

/**
 *
 * @param {boolean} production
 * @param {boolean} development
 * @returns {import("webpack").Configuration["module"]}
 */
function getWebpackModule(production, development) {
  return {
    strictExportPresence: true,
    rules: [
      {
        enforce: "pre",
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        loader: require.resolve("source-map-loader"),
      },
      {
        oneOf: [
          {
            test: [/\.avif$/],
            type: "asset",
            mimetype: "image/avif",
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            type: "asset",
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: require.resolve("@svgr/webpack"),
                options: {
                  prettier: false,
                  svgo: false,
                  svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                  },
                  titleProp: true,
                  ref: true,
                },
              },
              {
                loader: require.resolve("file-loader"),
                options: {
                  name: "static/media/[name].[hash].[ext]",
                },
              },
            ],
            issuer: {
              and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
            },
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              presets: [
                [require.resolve("@babel/preset-env")],
                [require.resolve("@babel/preset-react")],
                [require.resolve("@babel/preset-typescript")],
              ],
              plugins: [development && require.resolve("react-refresh/babel")].filter(Boolean),
              cacheDirectory: true, // feature of `babel-loader` for webpack, enable caching in ./node_modules/.cache/babel-loader/
              cacheCompression: false, // See #6846 (create-react-app) for context on why cacheCompression is disabled
              compact: production,
            },
          },
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              cacheDirectory: true,
              cacheCompression: false, // See #6846 for context on why cacheCompression is disabled
              sourceMaps: true, // required for debugging
              inputSourceMap: true, // required for debugging
            },
          },
          {
            test: regexes.css,
            exclude: regexes.cssModule,
            use: getStyleLoaders(production, {
              importLoaders: 1,
              sourceMap: production,
              modules: {
                mode: "icss",
              },
            }),
            sideEffects: true,
          },
          {
            test: regexes.cssModule,
            use: getStyleLoaders(production, {
              importLoaders: 1,
              sourceMap: production,
              modules: {
                mode: "local",
                getLocalIdent: getCSSModuleLocalIdent,
              },
            }),
          },
          {
            test: regexes.scss,
            exclude: regexes.scssModule,
            use: getStyleLoaders(
              production,
              {
                importLoaders: 3,
                sourceMap: production,
                modules: {
                  mode: "icss",
                },
              },
              "sass-loader"
            ),
            sideEffects: true,
          },
          {
            test: regexes.scssModule,
            use: getStyleLoaders(
              production,
              {
                importLoaders: 3,
                sourceMap: production,
                modules: {
                  mode: "local",
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              "sass-loader"
            ),
          },
          {
            exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            type: "asset/resource",
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  };
}

/**
 *
 * @param {boolean} production
 * @param {boolean} profile
 * @returns {import("webpack").Configuration["plugins"]}
 */
function getWebpackPlugins(production, profile) {
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    inject: true,
    template: paths.appIndexHtml,
    favicon: paths.appFavicon,
    minify: production
      ? {
          removeComments: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          html5: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
        }
      : undefined,
  });
  const inlineChunkHtmlPlugin = production && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]);
  const copyWebpackPlugin = new CopyWebpackPlugin({
    patterns: [
      {
        from: paths.appPublic,
        to: paths.appBuild,
        filter: (filePath) => {
          const excludeRegexp = /(\.html|favicon\.ico)$/;
          if (excludeRegexp.test(filePath)) {
            return false;
          }
          return true;
        },
      },
    ],
  });
  const manifestPlugin = new WebpackManifestPlugin({
    generate(seed, files, entrypoints) {
      const manifestFiles = files.reduce((manifest, file) => {
        return {
          ...manifest,
          [file.name]: file.path,
        };
      }, seed);
      const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith(".map"));
      return {
        files: manifestFiles,
        entrypoints: entrypointFiles,
      };
    },
  });
  const moduleNotFoundPlugin = new ModuleNotFoundPlugin();
  const reactRefreshPlugin =
    !production &&
    new ReactRefreshWebpackPlugin({
      overlay: false,
    });
  const caseSensitivePathsPlugin = !production && new CaseSensitivePathsPlugin();
  const miniCssExtractPlugin =
    production &&
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    });
  const tsWebpackPlugin = new ForkTsCheckerWebpackPlugin({
    async: !production,
    logger: {
      infrastructure: "silent",
    },
  });
  // In order to view the profile file:
  // - Run webpack with ProfilingPlugin (webpack --profile)
  // - Go to Chrome, open DevTools, and go to the Performance tab (formerly Timeline).
  // - Drag and drop generated file, or upload (events.json by default) into the profiler.
  const profilingPlugin =
    profile &&
    new webpack.debug.ProfilingPlugin({
      outputPath: path.join(__dirname, "build/events.json"),
    });
  const bundleAnalyzerPlugin =
    !production &&
    new BundleAnalyzerPlugin({
      statsOptions: {
        cachedModules: true,
        chunkGroups: true,
        chunkModules: true,
        all: true,
        env: true,
        performance: true,
        modules: true,
        nestedModules: true,
        usedExports: true,
        builtAt: true,
        hash: true,
        source: true,
        reasons: true,
        children: true,
        optimizationBailout: true,
        colors: true,
      },
      openAnalyzer: false,
      analyzerMode: "static",
      generateStatsFile: true,
    });

  const dotenvWebpackPlugin = new DotenvWebpackPlugin({
    allowEmptyValues: true,
    path: paths.env,
    systemvars: true,
  });

  return [
    htmlWebpackPlugin,
    inlineChunkHtmlPlugin,
    copyWebpackPlugin,
    manifestPlugin,
    moduleNotFoundPlugin,
    reactRefreshPlugin,
    caseSensitivePathsPlugin,
    miniCssExtractPlugin,
    tsWebpackPlugin,
    profilingPlugin,
    dotenvWebpackPlugin,
    bundleAnalyzerPlugin,
  ].filter(Boolean);
}

function getWebpackParallelism() {
  return 100;
}
