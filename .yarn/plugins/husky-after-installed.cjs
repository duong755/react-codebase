const child_process = require("child_process");

module.exports = {
  name: "plugin-husky-after-installed",
  factory: (require) => ({
    hooks: {
      afterAllInstalled: (project, options) => {
        console.log(child_process.execSync("yarn postinstall", { cwd: project.cwd }));
      },
    },
  })
};
