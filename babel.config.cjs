module.exports = {
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      { runtime: "automatic", importSource: "@emotion/react" },
    ],
    "@emotion/babel-plugin",
  ],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@emotion/babel-preset-css-prop",
  ],
};
