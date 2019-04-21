module.exports = {
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  parser: "babel-eslint",
  env: {
    "jest": true,
    "browser": true,
    "node": true,
  },
  rules: {
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    "object-curly-newline": ["error", {
      "ObjectPattern": "never"
    }],
    "class-methods-use-this": ["error", {
      "exceptMethods": [
        "render"
      ]
    }]
  },
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  plugins: [
    "react"
  ],
  settings: {
    "react": {
      "pragma": "React",
      "version": "^16.17.0",
    },
  },
};