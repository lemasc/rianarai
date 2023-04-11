import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/core";
import { FlashList } from "@shopify/flash-list";
import { RealmContext } from "db/models";
import { Teacher } from "db/models/Teacher";
import { useRouter } from "expo-router";
import { userStore } from "mobile/features/user";
import { Avatar, Fab, HStack, Icon, Text, View, VStack } from "native-base";
import { useEffect, useMemo } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { PressableItem } from "ui/components";

const { useQuery, useRealm } = RealmContext;

type Router = ReturnType<typeof useRouter>;
type ExtraData = Pick<Router, "push">;

const TeacherItem = ({
  item: teacher,
  extraData: { push },
}: {
  item: Teacher;
  extraData: ExtraData;
}) => {
  return (
    <PressableItem
      onPress={() => {
        push({
          params: { id: teacher._id.toHexString() },
          pathname: "/app/teachers/view",
        });
      }}
    >
      <HStack px="6" py="4" space={6} alignItems="center">
        <Avatar
          bgColor="gray.300"
          _dark={{
            bgColor: "gray.600",
          }}
          size="50px"
        />
        <VStack space="0.5" flexGrow={1}>
          <Text bold fontSize="sm" isTruncated noOfLines={1}>
            {teacher.name}
          </Text>
          {teacher.description && (
            <Text fontSize="xs">{teacher.description}</Text>
          )}
        </VStack>
      </HStack>
    </PressableItem>
  );
};

export default function TeachersIndex() {
  const result = useQuery(Teacher);
  const teachers = useMemo(() => result.sorted("name"), [result]);
  const router = useRouter();
  const isFocused = useIsFocused();
  const extraData = useMemo(() => ({ push: router.push }), [router]);

  const realm = useRealm();
  const isSyncing = userStore((state) => state.isSyncing);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(realm.objects(Teacher));
    });
  }, [realm, result]);

  return (
    <View bgColor="gray.50" h="full">
      <FlashList
        estimatedItemSize={91}
        //keyExtractor={(item: Teacher) => item._id.toHexString()}
        data={teachers}
        // @ts-expect-error
        renderItem={TeacherItem}
        extraData={extraData}
        refreshControl={<RefreshControl refreshing={isSyncing} />}
      />
      {isFocused && (
        <Fab
          size="sm"
          icon={<Icon as={Ionicons} name="add" size="xl" />}
          colorScheme="rianarai"
          onPress={() => router.push("/app/teachers/add")}
        />
      )}
    </View>
  );
}
