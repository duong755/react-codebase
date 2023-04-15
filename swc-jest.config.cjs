const jestConfig = require("./jest.config.cjs");

module.exports = {
  ...jestConfig,
  transform: {
    "\\.[jt]sx?$": "@swc/jest",
  },
};
