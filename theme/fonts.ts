import {
  IBMPlexSansThai_100Thin,
  IBMPlexSansThai_200ExtraLight,
  IBMPlexSansThai_300Light,
  IBMPlexSansThai_400Regular,
  IBMPlexSansThai_500Medium,
  IBMPlexSansThai_600SemiBold,
  IBMPlexSansThai_700Bold,
} from "@expo-google-fonts/ibm-plex-sans-thai";
import { useFonts as useExpoFonts } from "expo-font";

// Tokens

export type FontWeight =
  | "thin"
  | "extraLight"
  | "light"
  | "regular"
  | "medium"
  | "semiBold"
  | "bold";

export type FontSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export const bodyFonts = {
  thin: "IBMPlexSansThai_100Thin",
  extraLight: "IBMPlexSansThai_200ExtraLight",
  light: "IBMPlexSansThai_300Light",
  regular: "IBMPlexSansThai_400Regular",
  medium: "IBMPlexSansThai_500Medium",
  semiBold: "IBMPlexSansThai_600SemiBold",
  bold: "IBMPlexSansThai_700Bold",
} as const satisfies Record<FontWeight, string>;

export const useFonts = () => {
  return useExpoFonts({
    IBMPlexSansThai_100Thin,
    IBMPlexSansThai_200ExtraLight,
    IBMPlexSansThai_300Light,
    IBMPlexSansThai_400Regular,
    IBMPlexSansThai_500Medium,
    IBMPlexSansThai_600SemiBold,
    IBMPlexSansThai_700Bold,
  });
};
