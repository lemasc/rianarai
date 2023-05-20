import { ThemeProvider, DefaultTheme, Theme } from "@react-navigation/native";
import { merge } from "lodash-es";
import { useTheme } from "native-base";

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const NavigationThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { colors } = useTheme();
  const theme: Theme = merge<Theme, DeepPartial<Theme>>(DefaultTheme, {
    colors: {
      background: colors.gray[50],
    },
  });
  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
};
