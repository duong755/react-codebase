/**
 * @type {import("jest").Config}
 */
const config = {
  automock: false,
  cache: false,
  clearMocks: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/apis/",
    "<rootDir>/src/assets/",
    "<rootDir>/src/lib/",
    "<rootDir>/src/redux/",
    "<rootDir>/src/types/",
    "<rootDir>/src/typings/",
    "<rootDir>/src/utils/",
    "<rootDir>/src/index.tsx",
    "<rootDir>/src/app.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    }
  },
  expand: true,
  json: true,
  moduleNameMapper: {
    "\\.(css|less|scss|sass|styl)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|jfif|pjpeg|pjp|gif|svg|ico|webp|avif|mp4|webm|ogg|mp3|wav|flac|aac|woff2|woff|eot|ttf|otf)$": "<rootDir>/src/__mocks__/mock-file.ts",
    "#/(.*)": "<rootDir>/src/$1",
  },
  modulePaths: [
    "<rootDir>",
  ],
  setupFilesAfterEnv: [
    "jest-extended/all",
    "@testing-library/jest-dom",
  ],
  snapshotSerializers: [
    "@emotion/jest/serializer",
  ],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/apis/",
    "<rootDir>/src/assets/",
    "<rootDir>/src/lib/",
    "<rootDir>/src/redux/",
    "<rootDir>/src/types/",
    "<rootDir>/src/typings/",
    "<rootDir>/src/utils/",
  ],
  testTimeout: Infinity,
  transform: {
    "\\.[jt]sx?": "babel-jest",
  },
  transformIgnorePatterns: [
    "!<rootDir>/node_modules/rxjs",
  ],
  updateSnapshot: true,
  verbose: true,
  watchPathIgnorePatterns: [
    "<rootDir>/*.cjs",
  ],
};

module.exports = config;
