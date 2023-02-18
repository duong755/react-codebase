/**
 * @type {import("jest").Config}
 */
const config = {
  automock: false,
  clearMocks: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}"
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/apis/",
    "<rootDir>/src/assets/",
    "<rootDir>/src/lib/",
    "<rootDir>/src/types/",
    "<rootDir>/src/typings/",
    "<rootDir>/src/utils/",
  ],
};

module.exports = config;
