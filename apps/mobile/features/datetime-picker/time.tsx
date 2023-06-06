import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { HStack, Pressable, Text } from "native-base";
import { forwardRef, useImperativeHandle, useState } from "react";

type TimePickerRef = {
  value: Date;
};

export const TimePicker = forwardRef<TimePickerRef>((props, ref) => {
  const [value, setValue] = useState(new Date());
  useImperativeHandle(ref, () => ({
    value,
  }));

  return (
    <Pressable
      onPress={() => {
        DateTimePickerAndroid.open({
          value,
          mode: "time",
          onChange: (_, date) => {
            date && setValue(date);
          },
        });
      }}
      px="4"
      py="2"
      borderWidth="1"
      borderColor="gray.300"
      rounded="lg"
      _pressed={{
        bgColor: "gray.100",
      }}
    >
      <HStack space="2" bgColor="red.100">
        <Text w="8" fontSize="2xl" textAlign="center" fontWeight="bold">
          {value.getHours()}
        </Text>
        <Text w="8" fontSize="2xl" textAlign="center" fontWeight="bold">
          {value.getMinutes()}
        </Text>
      </HStack>
    </Pressable>
  );
});
