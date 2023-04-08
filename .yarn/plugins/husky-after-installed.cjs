const { execute } = require("@yarnpkg/shell");

module.exports = {
  name: "plugin-husky-after-installed",
  factory: (require) => ({
    hooks: {
      afterAllInstalled: async (project, options) => {
        await execute("yarn postinstall");
      },
    },
  })
};
