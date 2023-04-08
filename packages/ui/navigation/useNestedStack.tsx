import {
  DrawerNavigationOptions,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useNavigation, useSegments } from "expo-router";
import { useLayoutEffect, useMemo } from "react";
import { View } from "react-native";

const CustomDrawerButton = () => (
  <View
    style={{
      marginLeft: -16,
      marginRight: 16,
    }}
  >
    <DrawerToggleButton />
  </View>
);

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
  useLayoutEffect(() => {
    const options: DrawerNavigationOptions = {
      swipeEnabled: !isSubPage,
      headerShown: false,
    };
    navigation.setOptions(options);
  }, [isSubPage]);

  const screenOptions: Pick<NativeStackNavigationOptions, "headerLeft"> =
    useMemo(
      () => ({
        headerLeft: isSubPage ? undefined : CustomDrawerButton,
      }),
      [isSubPage]
    );
  return screenOptions;
};
