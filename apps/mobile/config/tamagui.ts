import { createAnimations } from "@tamagui/animations-react-native";
import { createInterFont } from "@tamagui/font-inter";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createTamagui, createFont, isWeb } from "tamagui";

import { config as fontConfig } from "./fonts";

type CreateFontReturn = ReturnType<typeof createFont>;

const createFontEntries = () => {
  const config: Record<keyof typeof fontConfig, CreateFontReturn> = {} as any;

  for (const key in fontConfig) {
    config[key] = createFont({
      family: isWeb
        ? key +
          ', -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        : key,
      face: fontConfig[key],
      size: {
        sm: 14,
        base: 16,
        lg: 18,
      },
      lineHeight: {
        sm: 20,
        base: 24,
        lg: 28,
      },
      weight: {
        4: 400,
        normal: 400,
        medium: 500,
        bold: 600,
      },
      letterSpacing: {
        4: 0,
      },
    });
  }
  return config;
};

const fontEntries = createFontEntries();

const animations = createAnimations({
  bouncy: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: "spring",
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

const config = createTamagui({
  animations,
  defaultTheme: "dark",
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    ...fontEntries,
    heading: fontEntries["Kanit"],
    body: fontEntries["Sarabun"],
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  }),
});

export type AppConfig = typeof config;

declare module "tamagui" {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
