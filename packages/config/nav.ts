import { HeaderOptions } from "@react-navigation/elements";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StyleProp, TextStyle } from "react-native";

type GlobalHeaderOptions = Pick<HeaderOptions, "headerTintColor"> & {
  headerTitleStyle: Pick<TextStyle, "fontFamily">;
};

export const headerOptions: GlobalHeaderOptions = {
  headerTintColor: "black",
  headerTitleStyle: {
    fontFamily: "Kanit-700",
  },
};

export const drawerLabelStyle: StyleProp<TextStyle> = {
  fontFamily: "Kanit-400",
};

export const stackOptions: StackNavigationOptions = {
  ...headerOptions,
  headerBackTitleStyle: {
    fontFamily: "Kanit-700",
  },
};
