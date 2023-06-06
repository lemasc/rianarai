import { Ionicons } from "@expo/vector-icons";
import DrawerStatusContext from "@react-navigation/drawer/src/utils/DrawerStatusContext";
import { useIsFocused } from "@react-navigation/native";
import { Fab as NativeBaseFab, Icon } from "native-base";
import { useContext } from "react";

type FabProps = Omit<
  React.ComponentProps<typeof NativeBaseFab>,
  "renderInPortal" | "icon"
> & {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconSize?: React.ComponentProps<typeof Icon>["size"];
};

export const Fab = ({ icon, iconSize, ...props }: FabProps) => {
  const isFocused = useIsFocused();
  // We didn't use the `useDrawerStatus` hook because it throws an error when
  // the drawer is not found. The Fab may be rendered outside of the drawer.
  const drawerStatus = useContext(DrawerStatusContext);
  return isFocused && drawerStatus !== "open" ? (
    <NativeBaseFab
      {...props}
      icon={<Icon as={Ionicons} name={icon} size={iconSize ?? "xl"} />}
    />
  ) : null;
};
