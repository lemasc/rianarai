import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import { IInputProps, Input as NBInput } from "native-base";
import { useCallback } from "react";

function Input({ onFocus, onBlur, ...props }: IInputProps) {
  const bottomSheet = useBottomSheetInternal(true);

  const setKeyboardEvents = useCallback(
    (value) => {
      if (bottomSheet) {
        bottomSheet.shouldHandleKeyboardEvents.value = value;
      }
    },
    [bottomSheet]
  );

  const handleOnFocus = useCallback(
    (args) => {
      setKeyboardEvents(true);
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, setKeyboardEvents]
  );
  const handleOnBlur = useCallback(
    (args) => {
      setKeyboardEvents(false);
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, setKeyboardEvents]
  );

  return (
    <NBInput
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...props}
    />
  );
}

export { Input };
export type { IInputProps };
