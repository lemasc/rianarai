import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MenuEntry, othersMenu } from "mobile/constants/menu";
import { View, Text, VStack, HStack, Icon } from "native-base";
import { PressableItem } from "ui/components";

function Menu({ name, description, slug, icon }: MenuEntry) {
  const router = useRouter();
  return (
    <PressableItem onPress={() => router.push(`/app/${slug}`)}>
      <HStack py="4" px="4" alignItems="center" space="4">
        <View rounded="full" p="3" bg="gray.200">
          <Icon as={Ionicons} name={icon} size="lg" color="black" />
        </View>
        <VStack space="1">
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="xs" color="gray.600">
            {description}
          </Text>
        </VStack>
      </HStack>
    </PressableItem>
  );
}
export default function SettingsMenu() {
  return (
    <VStack>
      {othersMenu.map((menu) => (
        <Menu key={menu.slug} {...menu} />
      ))}
    </VStack>
  );
}
