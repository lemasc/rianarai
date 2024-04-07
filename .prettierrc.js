module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "es5",
  singleQuote: false,
  semi: true,
  importOrder: [
    "^react(?:-native)?(?!-)|(@?expo)",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
