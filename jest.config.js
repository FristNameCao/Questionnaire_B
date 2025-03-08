/* eslint-disable no-undef */
// jest.config.js
module.exports = {
  // ...
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // 如果你的Node.js版本支持ESM，并且你想在Jest中使用它
  testEnvironmentOptions: {
    resources: "usable",
    experimentalVmSupport: true,
  },
  // ...
};
