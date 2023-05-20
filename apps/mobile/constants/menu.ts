import { Ionicons } from "@expo/vector-icons";
export type MenuEntry = {
  slug: string;
  name: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

export const othersMenu: MenuEntry[] = [
  {
    slug: "teachers",
    name: "ครูผู้สอน",
    description: "จัดการครูผู้สอน",
    icon: "people",
  },
];
