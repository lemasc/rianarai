import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { drawerLabelStyle, headerOptions } from "config/nav";
import { Drawer } from "expo-router/drawer";
import { useColorModeValue } from "native-base";

export default function Layout() {
  const drawerTheme = useColorModeValue<DrawerNavigationOptions>(
    {
      drawerActiveBackgroundColor: "#ffe199",
      drawerActiveTintColor: "#262626",
      headerTintColor: "#000",
    },
    {
      drawerActiveBackgroundColor: "#D48D02",
      drawerActiveTintColor: "#f5f5f5",
      headerTintColor: "#fff",
    }
  );
  return (
    <Drawer
      screenOptions={{
        ...headerOptions,
        drawerLabelStyle,
        ...drawerTheme,
      }}
    >
      <Drawer.Screen name="index" options={{ title: "หน้าหลัก" }} />
      <Drawer.Screen name="courses" options={{ title: "รายวิชา" }} />
      <Drawer.Screen name="teachers" options={{ title: "ครูผู้สอน" }} />
    </Drawer>
  );
}
