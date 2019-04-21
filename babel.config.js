module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }],
    "@babel/preset-react"
  ],
  plugins: ["transform-export-extensions"],
};
