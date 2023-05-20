import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { useNavigation, useSegments } from "expo-router";
import { merge } from "lodash-es";
import { useLayoutEffect, useMemo } from "react";

import { tabBarOptions } from "./navigators";

/**
 * Uses to handle the stack navigation inside the drawer,
 * which cause the header to be shown twice.
 *
 * This hook will show a custom drawer button and conditionally allow user to toggle if the current screen isn't a sub page.
 * @returns {NativeStackNavigationOptions} screenOptions Screen options for the stack navigator.
 */

export const useNestedStack = () => {
  const segments = useSegments();
  const isSubPage = useMemo(() => segments.length > 2, [segments]);
  const navigation = useNavigation();
  const navigationType = useMemo(
    () => navigation.getState().type,
    [navigation],
  );
  useLayoutEffect(() => {
    const drawerOptions: DrawerNavigationOptions = {
      swipeEnabled: !isSubPage,
    };
    const tabOptions: BottomTabNavigationOptions = merge(tabBarOptions, {
      tabBarStyle: {
        display: isSubPage ? "none" : "flex",
      },
    });

    navigation.setOptions({
      headerShown: false,
      ...(navigationType === "drawer" ? drawerOptions : {}),
      ...(navigationType === "tab" ? tabOptions : {}),
    });
  }, [isSubPage, navigationType]);
};
