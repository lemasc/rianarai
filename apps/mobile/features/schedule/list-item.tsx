import { HStack, Text } from "native-base";

export function ScheduleListItem() {
  return (
    <HStack
      rounded="lg"
      bg="white"
      borderWidth="1"
      borderColor="gray.300"
      alignItems="center"
    >
      <Text px="4" py="2" fontWeight="bold" fontSize="md" w="12">
        M
      </Text>
      <Text p="3">08:00 - 09:00 น.</Text>
    </HStack>
  );
}
