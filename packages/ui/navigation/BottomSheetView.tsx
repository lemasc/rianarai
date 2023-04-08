import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { View, Pressable } from "native-base";
import { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";

type BottomSheetViewProps = React.ComponentProps<typeof View> & {
  onClose?: () => void;
} & Partial<Pick<React.ComponentProps<typeof BottomSheet>, "snapPoints">>;

export const BottomSheetView: React.FC<BottomSheetViewProps> = ({
  snapPoints,
  onClose,
  children,
  ...props
}) => {
  const router = useRouter();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const close = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const defaultOnClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Pressable
        style={StyleSheet.absoluteFillObject}
        backgroundColor="rgba(0, 0, 0, 0.6)"
        onPress={close}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints ?? ["50%"]}
        enablePanDownToClose
        onClose={onClose ?? defaultOnClose}
      >
        <View {...props}>{children}</View>
      </BottomSheet>
    </View>
  );
};
