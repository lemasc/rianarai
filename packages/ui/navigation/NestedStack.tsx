import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { headerOptions } from "config/nav";
import { withLayoutContext } from "expo-router";
import React from "react";

import { useNestedStack } from "./useNestedStack";
import { useNestedStackScreens } from "./useNestedStackScreens";

const { Navigator } = createStackNavigator();

export const Stack = withLayoutContext<
  Omit<StackNavigationOptions, "presentation"> & {
    /**
     * Whether this screen should be presented as a modal or a regular card.
     *
     * Specifying this will configure several options:
     * - `card`: Use the default OS animations for iOS and Android screen transitions.
     * - `modal`: Use Modal animations. This changes a few things:
     *   - Sets `headerMode` to `screen` for the screen unless specified otherwise.
     *   - Changes the screen animation to match the platform behavior for modals.
     * - `transparentModal`: Similar to `modal`. This changes following things:
     *   - Sets `headerMode` to `screen` for the screen unless specified otherwise.
     *   - Sets background color of the screen to transparent, so previous screen is visible
     *   - Adjusts the `detachPreviousScreen` option so that the previous screen stays rendered.
     *   - Prevents the previous screen from animating from its last position.
     *   - Changes the screen animation to a vertical slide animation.
     * - `bottomSheet`: Similar to `transparentModal`.
     *   - Adds additional styles and should be use in combination with the "BottomSheetPage" component.
     *
     * Defaults to 'card'.
     */
    presentation?: StackNavigationOptions["presentation"] | "bottomSheet";
  },
  typeof Navigator
>(Navigator);

type StackProps = React.ComponentProps<typeof Stack>;

export const NestedStack = (props: StackProps) => {
  useNestedStack();
  const { childrens } = useNestedStackScreens(props.children);

  return (
    <Stack
      screenOptions={{
        ...(props.screenOptions ?? {}),
        ...headerOptions,
      }}
    >
      {childrens}
    </Stack>
  );
};

NestedStack.Screen = Stack.Screen;
