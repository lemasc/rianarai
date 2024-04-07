import {
  FadingView,
  ScrollHeaderProps,
} from "@codeherence/react-native-header";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderProps =
  | Partial<Record<keyof ScrollHeaderProps, never>>
  | ScrollHeaderProps;

export const Header = ({
  showNavBar: showNavBarValue,
  scrollY: scrollYValue,
  children,
}: {
  children: React.ReactNode;
} & HeaderProps) => {
  const scrollY = useDerivedValue(() =>
    typeof scrollYValue === "undefined" ? 183 : scrollYValue.value
  );
  const showNavBar = useDerivedValue(() =>
    typeof showNavBarValue === "undefined" ? 1 : showNavBarValue.value
  );
  const insets = useSafeAreaInsets();
  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollY.value,
      [80, 183],
      ["#66BEEF", "#026CA7"]
    ),
    elevation: interpolate(
      showNavBar.value,
      [0, 1],
      [0, 4],
      Extrapolation.CLAMP
    ),
  }));
  return (
    <Animated.View
      style={[
        backgroundStyle,
        {
          paddingHorizontal: 25,
          paddingBottom: 20,
          paddingTop: 10 + insets.top,
        },
      ]}
    >
      <FadingView opacity={showNavBar}>{children}</FadingView>
    </Animated.View>
  );
};
