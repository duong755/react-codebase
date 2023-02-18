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
  expand: true,
  json: true,
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    "\\.(png|jpg|jpeg|jfif|pjpeg|pjp|gif|svg|ico|webp|avif|mp4|webm|ogg|mp3|wav|flac|aac|woff2|woff|eot|ttf|otf)$": "<rootDir>/src/__mocks__/mock-file.ts",
    "#/(.*)": "<rootDir>/src/$1",
  },
  modulePaths: [
    "<rootDir>"
  ],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/apis/",
    "<rootDir>/src/assets/",
    "<rootDir>/src/lib/",
    "<rootDir>/src/types/",
    "<rootDir>/src/typings/",
    "<rootDir>/src/utils/",
  ],
  transform: {
    "\\.[jt]sx?": "babel-jest",
  },
  updateSnapshot: true,
  watchPathIgnorePatterns: [
    "*.cjs"
  ],
};

module.exports = config;
