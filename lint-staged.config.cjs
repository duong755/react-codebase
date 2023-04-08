module.exports = {
  "*.{ts,tsx,js,jsx}": [
    () => "tsc --project tsconfig.json --noEmit",
    "eslint . --cache"
  ],
};
