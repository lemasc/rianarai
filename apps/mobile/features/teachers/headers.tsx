import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSearchParams } from "expo-router";
import { Icon, View } from "native-base";
import { Pressable } from "ui/components";

export const ViewHeaderButtons = () => {
  const params = useSearchParams();
  const router = useRouter();
  return (
    <View display="flex" flexDirection="row">
      <View overflow="hidden" rounded="full">
        <Pressable
          p="4"
          onPress={() =>
            router.push({ pathname: "/app/teachers/edit", params })
          }
        >
          <Icon as={Ionicons} color="black" name="pencil" size="sm" />
        </Pressable>
      </View>
      <View overflow="hidden" rounded="full">
        <Pressable
          p="4"
          onPress={() =>
            router.push({ pathname: "/app/teachers/delete", params })
          }
        >
          <Icon as={Ionicons} color="black" name="trash" size="sm" />
        </Pressable>
      </View>
    </View>
  );
};
