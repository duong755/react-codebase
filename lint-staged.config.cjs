module.exports = {
  "*.{ts,tsx,js,jsx}": [
    () => "tsc --project tsconfig.json --noEmit",
    "prettier --write ./src/**/*.{ts,tsx,js,jsx}",
    "eslint . --cache"
  ],
};
