module.exports = function (api) {
  api.cache(true);
  return {
    extends: "../../babel.config.js",
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      require.resolve("expo-router/babel"),
    ],
  };
};
