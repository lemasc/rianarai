import { DrawerToggleButton } from "@react-navigation/drawer";
import { StackNavigationOptions } from "@react-navigation/stack";
import { Screen } from "expo-router/src/views/Screen";
import { useMemo, Children, isValidElement, cloneElement } from "react";

export const bottomSheetOptions: StackNavigationOptions = {
  presentation: "transparentModal",
  detachPreviousScreen: false,
  headerShown: false,
};

type UseNestedStackScreens = {
  /**
   * The routes that are defined as bottom sheet screens.
   */
  bottomSheetRoutes: string[];
  /**
   * The React children that have been transformed with bottom sheet options.
   */
  childrens: React.ReactNode;
};

/**
 * Transforms the given React children into a list of nested stack routes and
 * Injects any necessary styles into the options to make headers and bottom sheet works.
 */
export const useNestedStackScreens = (
  children: React.ReactNode
): UseNestedStackScreens => {
  return useMemo(() => {
    const bottomSheetRoutes: string[] = [];
    const childrens = Children.map(children, (child) => {
      if (isValidElement(child) && child.type === Screen) {
        // Extract screens from the children with the name "index" and inject
        // the `DrawerToggleButton` into the options.
        if (child.props.name === "index") {
          return cloneElement(child, {
            ...child.props,
            options: {
              ...child.props.options,
              headerLeft: DrawerToggleButton,
            },
          });
        }
        // Extract screens from the children with the presentation "bottomSheet" prop
        // and inject custom styles into the options.
        if (child.props.options?.presentation === "bottomSheet") {
          bottomSheetRoutes.push(child.props.name);
          return cloneElement(child, {
            ...child.props,
            options: {
              ...child.props.options,
              ...bottomSheetOptions,
            },
          });
        }
      }
      return child;
    });
    return {
      bottomSheetRoutes,
      childrens,
    };
  }, [children]);
};
