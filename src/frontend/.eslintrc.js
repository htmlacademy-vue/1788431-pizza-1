module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "plugin:vue/strongly-recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
        },
      },
    ],
    "vue/prop-name-casing": ["error", "camelCase"],
    "vue/match-component-file-name": [
      "error",
      {
        extensions: ["vue"],
        shouldMatchCase: true,
      },
    ],
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "parent",
          "functional",
          "delimiters",
          "comments",
          "components",
          "directives",
          "filters",
          "extends",
          "mixins",
          "inheritAttrs",
          "model",
          "props",
          "propsData",
          "data",
          "computed",
          "watch",
          "beforeCreate",
          "created",
          "beforeMount",
          "mounted",
          "beforeUpdate",
          "updated",
          "activated",
          "deactivated",
          "beforeDestroy",
          "destroyed",
          "methods",
          "template",
          "render",
          "renderError",
        ],
      },
    ],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
