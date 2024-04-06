import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/theme/ui";

export default function Home() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ backgroundColor: "#EAEDF2", height: "100%" }}>
      <LinearGradient
        style={{
          paddingHorizontal: 25,
          paddingBottom: 40,
          paddingTop: 60 + insets.top,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
        locations={[0.2, 1]}
        colors={["#66BEEF", "#026CA7"]}
      >
        <Text style={{ color: "white" }} size="4xl">
          สวัสดี <Text weight="bold">สานสา</Text>
        </Text>
        <Text style={{ color: "white" }} size="lg">
          วันนี้เป็นอย่างไรบ้าง?
        </Text>
      </LinearGradient>
      <View style={{ padding: 25, gap: 20 }}>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Text weight="bold">คาบเรียนถัดไป</Text>
          <Text size="sm">{`ภาษาอังกฤษเพื่อการสื่อสาร\n10:30-11:30 น.`}</Text>
        </View>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Text weight="bold">คาบเรียนถัดไป</Text>
          <Text size="sm">{`ภาษาอังกฤษเพื่อการสื่อสาร\n10:30-11:30 น.`}</Text>
        </View>
      </View>
      <StatusBar style="light" translucent />
    </View>
  );
}
