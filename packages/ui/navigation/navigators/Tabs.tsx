import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { labelStyle } from "config/nav";
import { Tabs as Navigator } from "expo-router";
import { merge } from "lodash-es";

export const tabBarOptions: BottomTabNavigationOptions = {
  tabBarStyle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 70,
    position: "absolute",
  },
  tabBarIconStyle: { marginTop: 5 },
  tabBarLabelStyle: { ...labelStyle, paddingBottom: 10, fontSize: 12 },
};

export const Tabs = (props: React.ComponentProps<typeof Navigator>) => {
  return (
    <Navigator
      {...props}
      screenOptions={merge(tabBarOptions, props.screenOptions)}
    />
  );
};

Tabs.Screen = Navigator.Screen;
