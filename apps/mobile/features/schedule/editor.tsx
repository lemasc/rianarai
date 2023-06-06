import {
  Box,
  Button,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";

import { ScheduleEditorModal } from "./editor/editor-modal";
import { ScheduleListItem } from "./list-item";

export function ScheduleEditor() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <VStack space={2}>
        <HStack pt="2">
          <Heading size="md" color="rianarai.700" flexGrow="1">
            ตารางเรียน
          </Heading>
          <Pressable
            onPress={() => {
              setShowForm(true);
            }}
          >
            <Text>เพิ่ม</Text>
          </Pressable>
        </HStack>
        <Box>
          <ScheduleListItem />
        </Box>
      </VStack>
      <ScheduleEditorModal open={showForm} onClose={() => setShowForm(false)} />
    </>
  );
}
