import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { drawerLabelStyle, headerOptions } from "config/nav";
import { RealmContext } from "db/models";
import { Drawer } from "expo-router/drawer";
import { userStore } from "mobile/features/user";
import { useColorModeValue } from "native-base";
import { useEffect } from "react";

const { useRealm } = RealmContext;
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
  const realm = useRealm();
  useEffect(() => {
    const progressNotificationCallback: Realm.ProgressNotificationCallback = (
      transferred,
      transferable
    ) => {
      // Convert decimal to percent with no decimals
      // (e.g. 0.6666... -> 67)
      const percentTransferred =
        parseFloat((transferred / transferable).toFixed(2)) * 100;
      userStore.setState({ isSyncing: percentTransferred !== 100 });
    };
    // Listen for changes to connection state
    realm.syncSession?.addProgressNotification(
      "upload" as Realm.ProgressDirection.Upload,
      "reportIndefinitely" as Realm.ProgressMode.ReportIndefinitely,
      progressNotificationCallback
    );
    // Remove the connection listener when component unmounts
    return () =>
      realm.syncSession?.removeProgressNotification(
        progressNotificationCallback
      );
    // Run useEffect only when component mounts
  }, []);
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
