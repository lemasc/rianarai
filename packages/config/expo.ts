import { ExpoConfig } from "expo/config";
import { join } from "path";

import { ConfigEnv, parseProcessEnv } from "./env";

require("dotenv").config();

const ENV: ConfigEnv = parseProcessEnv();

const path = (file: string) => join(__dirname, file);

const assets = (file: string) => require.resolve(file);

const config: ExpoConfig = {
  name: "RianArai",
  slug: "rianarai",
  scheme: "rianarai",
  icon: assets("assets/images/icon.png"),
  userInterfaceStyle: "automatic",
  splash: {
    image: assets("assets/images/splash.png"),
    resizeMode: "contain",
    backgroundColor: "#ffd46e",
  },
  android: {
    package: "com.lemasc.rianarai",
    googleServicesFile: path("./platform/google-services.json"),
    adaptiveIcon: {
      foregroundImage: assets("assets/images/adaptive-icon.png"),
      backgroundColor: "#ffd46e",
    },
  },
  web: {
    bundler: "metro",
    favicon: assets("assets/images/favicon.png"),
  },
  plugins: [
    "@react-native-firebase/app",
    "expo-community-flipper",
    "expo-build-properties",
    "@react-native-google-signin/google-signin",
  ],
  extra: {
    ENV,
  },
};

export default config;
