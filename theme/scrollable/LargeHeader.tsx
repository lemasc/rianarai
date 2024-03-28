import {
  ScalingView,
  FadingView,
  ScrollLargeHeaderProps,
} from "@codeherence/react-native-header";
import { LinearGradient } from "expo-linear-gradient";
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
} from "react-native-reanimated";

type LargeHeaderProps =
  | Partial<Record<keyof ScrollLargeHeaderProps, never>>
  | ScrollLargeHeaderProps;

export const LargeHeader = ({
  children,
  scrollY: scrollYValue,
}: LargeHeaderProps & {
  children: React.ReactNode;
}) => {
  const scrollY = useDerivedValue(() =>
    typeof scrollYValue === undefined ? 140 : scrollYValue.value
  );
  const opacity = useDerivedValue(() =>
    interpolate(scrollY.value, [40, 140], [1, 0], Extrapolation.CLAMP)
  );
  return (
    <LinearGradient
      style={{
        paddingHorizontal: 25,
        paddingBottom: 40,
        paddingTop: 60,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}
      locations={[0.4, 1]}
      colors={["#66BEEF", "#026CA7"]}
    >
      <FadingView opacity={opacity}>
        <ScalingView scrollY={scrollY}>{children}</ScalingView>
      </FadingView>
    </LinearGradient>
  );
};
