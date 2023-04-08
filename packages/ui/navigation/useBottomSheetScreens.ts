import { StackNavigationOptions } from "@react-navigation/stack";
import { Screen } from "expo-router/src/views/Screen";
import { useMemo, Children, isValidElement, cloneElement } from "react";

export const bottomSheetOptions: StackNavigationOptions = {
  presentation: "transparentModal",
  detachPreviousScreen: false,
  headerShown: false,
};

type UseBottomSheetScreens = {
  /**
   * The routes that are defined as bottom sheet screens.
   */
  routes: string[];
  /**
   * The React children that have been transformed with bottom sheet options.
   */
  childrens: React.ReactNode;
};

/**
 * Transforms the given React children into a list of bottom sheet routes and
 * injects any necessary styles into the options to make bottom sheet works.
 */
export const useBottomSheetScreens = (
  children: React.ReactNode
): UseBottomSheetScreens => {
  // Extract screens from the children with the presentation "bottomSheet" prop
  // and inject custom styles into the options.
  return useMemo(() => {
    const bottomSheetRoutes: string[] = [];
    const childrens = Children.map(children, (child) => {
      if (
        isValidElement(child) &&
        child.type === Screen &&
        child.props.options?.presentation === "bottomSheet"
      ) {
        bottomSheetRoutes.push(child.props.name);
        return cloneElement(child, {
          ...child.props,
          options: {
            ...child.props.options,
            ...bottomSheetOptions,
          },
        });
      }
      return child;
    });
    return {
      routes: bottomSheetRoutes,
      childrens,
    };
  }, [children]);
};
