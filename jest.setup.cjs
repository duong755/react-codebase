const { cleanup } = require("@testing-library/react");

require("#/configs/dayjs");
require("#/configs/i18next");

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
