import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { useNavigation, useSegments } from "expo-router";
import { useEffect, useLayoutEffect, useMemo } from "react";

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
};
