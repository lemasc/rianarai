// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config')}
 */
const { getDefaultConfig } = require("@expo/metro-config");
const path = require("path");
const {
  getMetroAndroidAssetsResolutionFix,
} = require("react-native-monorepo-tools");

const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

config.resolver.disableHierarchicalLookup = true;

config.transformer = config.transformer || {};

config.transformer.publicPath = androidAssetsResolutionFix.publicPath;

config.transformer.minifierPath = require.resolve("metro-minify-terser");

config.server = config.server || {};
config.server.enhanceMiddleware = (middleware) => {
  return androidAssetsResolutionFix.applyMiddleware(middleware);
};

module.exports = config;
