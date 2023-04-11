import { WithObjectId, WithObjectIdProps } from "db/components";
import { RealmContext } from "db/models";
import { Teacher } from "db/models/Teacher";
import { userStore } from "mobile/features/user";
import { Avatar, Heading, Factory, Stack, Text, View } from "native-base";
import { useEffect } from "react";
import {
  RefreshControl,
  ScrollView as RNScrollView,
} from "react-native-gesture-handler";
const { useObject } = RealmContext;

const ScrollView = Factory(RNScrollView);

function TeacherViewPage({ objectId, showFallback }: WithObjectIdProps) {
  const isSyncing = userStore((state) => state.isSyncing);
  const teacher = useObject(Teacher, objectId);
  useEffect(() => {
    if (!teacher) {
      showFallback();
    }
  }, [showFallback, teacher]);

  if (!teacher) return null;

  return (
    <ScrollView
      bgColor="gray.50"
      refreshControl={<RefreshControl refreshing={isSyncing} />}
    >
      <View
        marginBottom="10%"
        position="relative"
        backgroundColor="rianarai.500"
        h="48"
        w="full"
      >
        <Avatar
          position="absolute"
          bgColor="gray.300"
          _dark={{
            bgColor: "gray.600",
          }}
          size="80px"
          left="5%"
          bottom="-20%"
        />
      </View>
      <Stack p="4">
        <Heading>{teacher.name}</Heading>
        <Text>{teacher.description}</Text>
      </Stack>
    </ScrollView>
  );
}

export default WithObjectId(TeacherViewPage, {
  fallbackRoute: "/app/teachers",
});
