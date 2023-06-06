import { Portal } from "@gorhom/portal";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TimePicker } from "mobile/features/datetime-picker";
import { Heading, HStack, Pressable, VStack } from "native-base";
import { BottomSheetModal } from "ui/bottom-sheet";

export const ScheduleEditorModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Portal>
      <BottomSheetModal open={open} animateOnMount={false} onClose={onClose}>
        <VStack p="4" space="4">
          <Heading fontSize="2xl">เพิ่มคาบเรียน</Heading>
          <HStack>
            <VStack space="2">
              <Heading fontSize="md">เวลาเริ่มต้น</Heading>
              <TimePicker />
            </VStack>
            <VStack space="2">
              <Heading fontSize="md">เวลาเริ่มต้น</Heading>
              <TimePicker />
            </VStack>
          </HStack>
        </VStack>
      </BottomSheetModal>
    </Portal>
  );
};
