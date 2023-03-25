import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "RianArai",
  slug: "rianarai",
  scheme: "rianarai",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffd46e",
  },
  android: {
    package: "com.lemasc.rianarai",
    googleServicesFile: "./config/platform/google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffd46e",
    },
  },
  web: {
    bundler: "metro",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [],
  extra: {},
};

export default config;
