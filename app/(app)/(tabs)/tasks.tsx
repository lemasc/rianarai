import { Text } from "@/theme/ui";
import { FlashList } from "@shopify/flash-list";
import {
  Header,
  LargeHeader,
  ScalingView,
  FlashListWithHeaders,
  FadingView,
} from "@codeherence/react-native-header";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const HeaderComponent = ({ showNavBar, scrollY }) => {
  // useDerivedValue(() => {
  //   console.log(scrollY.value);
  // });
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
      <FadingView opacity={showNavBar}>
        <Text style={{ color: "white" }} size="lg">
          สวัสดี <Text weight="bold">สานสา</Text>
        </Text>
        <Text style={{ color: "white" }} size="sm">
          ไหนเลื่อนใหม่ดิ๊
        </Text>
      </FadingView>
    </Animated.View>
  );
};

const LargeHeaderComponent = ({ scrollY }) => {
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
        <ScalingView scrollY={scrollY}>
          <Text style={{ color: "white" }} size="4xl">
            สวัสดี <Text weight="bold">สานสา</Text>
          </Text>
          <Text style={{ color: "white" }} size="lg">
            แอนิเมชั่นลื่นมาก สุดยอด
          </Text>
        </ScalingView>
      </FadingView>
    </LinearGradient>
  );
};

export default function Tasks() {
  return (
    <View style={{ height: "100%", backgroundColor: "#66BEEF" }}>
      <FlashListWithHeaders
        HeaderComponent={HeaderComponent}
        // absoluteHeader
        LargeHeaderComponent={LargeHeaderComponent}
        disableLargeHeaderFadeAnim
        data={new Array(100)}
        // disableAutoFixScroll
        // headerFadeInThreshold={0.}
        estimatedItemSize={49}
        contentContainerStyle={{ paddingTop: 0, backgroundColor: "white" }}
        renderItem={({ index }) => {
          if (index % 10 === 0) {
            return (
              <Text
                style={{
                  paddingTop: 20,
                  paddingBottom: 10,
                  paddingHorizontal: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "#bfbfbf",
                }}
                weight="bold"
                size="2xl"
              >
                Header {index}
              </Text>
            );
          }
          return (
            <Text style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              Index {index}
            </Text>
          );
        }}
      />
      <StatusBar style="light" translucent />
    </View>
  );
}
