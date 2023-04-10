import { extendTheme } from "native-base";

import { config as fontConfig } from "./fonts";

export const theme = extendTheme({
  components: {
    Input: {
      baseStyle: () => ({
        _focus: {
          borderColor: "rianarai.600",
        },
      }),
    },
    Button: {
      defaultProps: {
        colorScheme: "rianarai",
      },
    },
  },
  colors: {
    rianarai: {
      DEFAULT: "#FDC04A",
      50: "#FFFFFF",
      100: "#FFF8EB",
      200: "#FEEAC3",
      300: "#FEDC9B",
      400: "#FDCE72",
      500: "#FDC04A",
      600: "#FCAD13",
      700: "#D48D02",
      800: "#9D6802",
      900: "#654301",
    },
    jaffa: {
      DEFAULT: "#F28131",
      50: "#FFFFFF",
      100: "#FEF6F1",
      200: "#FBD9C1",
      300: "#F8BC91",
      400: "#F59F61",
      500: "#F28131",
      600: "#E2660E",
      700: "#B2510B",
      800: "#823B08",
      900: "#522505",
    },
  },
  fontConfig,
  fonts: {
    heading: "Kanit",
    brand: "Pattaya",
    body: "Kanit",
    mono: "Roboto",
    content: "Sarabun",
  },
});

type CustomThemeType = typeof theme;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
