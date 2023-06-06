import { Button, Heading, ITheme, Text, VStack } from "native-base";
import { VariantType } from "native-base/lib/typescript/components/types";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import { BottomSheetMethods } from "./BottomSheetModal";
import { BottomSheetPage } from "./BottomSheetPage";

export type AlertButton = {
  text: string;
  colorScheme?: keyof ITheme["colors"];
  variant?: VariantType<"Button">;
} & (
  | { type?: "button"; onPress: () => void; onClose?: () => void }
  | {
      type: "close";
    }
);

export type BottomSheetAlertPageProps = {
  title: string;
  message: string;
  buttons: AlertButton[];
};

export const BottomSheetAlertPage = forwardRef<
  BottomSheetMethods,
  BottomSheetAlertPageProps
>(function BottomSheetAlertPage({ title, message, buttons }, ref) {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const selectedButtonIndex = useRef(-1);

  useEffect(() => {
    selectedButtonIndex.current = -1;
  }, [buttons]);

  const closeAction = () => {
    bottomSheetRef.current?.close();
  };

  useImperativeHandle(ref, () => bottomSheetRef.current as BottomSheetMethods);

  return (
    <BottomSheetPage
      ref={bottomSheetRef}
      canClose
      px="6"
      py="4"
      snapPoints={["32%"]}
    >
      <VStack space={2}>
        <Heading>{title}</Heading>
        <Text>{message}</Text>
        <VStack space={2} py="2">
          {buttons.map((button, index) => (
            <Button
              key={index}
              onPress={() => {
                if (button.type !== "close") {
                  button.onPress();
                }
                closeAction();
              }}
              colorScheme={button.colorScheme}
              variant={button.variant}
            >
              {button.text}
            </Button>
          ))}
        </VStack>
      </VStack>
    </BottomSheetPage>
  );
});
