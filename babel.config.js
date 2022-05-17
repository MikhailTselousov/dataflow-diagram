module.exports = {
  presets: [
    ["@babel/preset-env", { modules: false }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
  ],
};
