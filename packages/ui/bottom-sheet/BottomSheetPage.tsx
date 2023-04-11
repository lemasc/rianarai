import BottomSheet, { BottomSheetView as BSView } from "@gorhom/bottom-sheet";
import { useFocusEffect, useRouter } from "expo-router";
import { Factory, View } from "native-base";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { Pressable, StyleSheet } from "react-native";

const BottomSheetView = Factory(BSView);

type BottomSheetPageProps = React.ComponentProps<typeof BottomSheetView> & {
  onClose?: () => void;
  canClose?: boolean;
} & Partial<Pick<React.ComponentProps<typeof BottomSheet>, "snapPoints">>;

export type BottomSheetMethods = BottomSheet;
export const BottomSheetPage = forwardRef<BottomSheet, BottomSheetPageProps>(
  function BottomSheetPage(
    { snapPoints, onClose, canClose = true, ...props },
    ref
  ) {
    const router = useRouter();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const defaultOnClose = useCallback(() => {
      router.back();
    }, [router]);

    const close = useCallback(
      (...args: Parameters<BottomSheet["close"]>) => {
        if (!canClose) return;
        bottomSheetRef.current?.close(...args);
      },
      [canClose]
    );

    useImperativeHandle(ref, () =>
      Object.assign({}, bottomSheetRef.current, {
        close,
      })
    );

    /**
     * Expo Router rerender the component many times, which may call the onClose
     * callback multiple times too, giving unexpected behaviour.
     *
     * The workaround is to only allow the first attempt to call the onClose callback.
     */
    const closed_do_not_recall = useRef(false);

    const onBottomSheetClose = useCallback(() => {
      if (!closed_do_not_recall.current) {
        if (onClose) {
          onClose();
        } else {
          defaultOnClose();
        }
        closed_do_not_recall.current = true;
      }
    }, [onClose, defaultOnClose]);

    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Pressable style={styles.backdrop} onPress={() => close()} />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints ?? ["50%"]}
          enablePanDownToClose={canClose}
          keyboardBlurBehavior="restore"
          onClose={onBottomSheetClose}
        >
          <BottomSheetView focusHook={useFocusEffect} {...props} />
        </BottomSheet>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
