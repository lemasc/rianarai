import { StyleProp, TextStyle } from "react-native";

type GlobalHeaderOptions = {
  headerTitleStyle: Pick<TextStyle, "fontFamily">;
};

export const headerOptions: GlobalHeaderOptions = {
  headerTitleStyle: {
    fontFamily: "Kanit-800",
  },
};

export const drawerLabelStyle: StyleProp<TextStyle> = {
  fontFamily: "Kanit-400",
};
