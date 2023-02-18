/**
 * @type {import("@babel/core").ConfigFunction}
 */
module.exports = function (api) {
  console.log(api.version);
  return {
    plugins: [
      ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
    ],
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
    ],
  };
};
