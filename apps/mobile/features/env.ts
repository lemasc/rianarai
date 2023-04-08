import { ConfigEnv, parseEnv } from "config/env";
import Constants from "expo-constants";

export const ENV: ConfigEnv = parseEnv(Constants.expoConfig?.extra?.ENV);
