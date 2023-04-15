const { cleanup } = require("@testing-library/react");

require("#/lib/dayjs");
require("#/lib/i18next");

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
