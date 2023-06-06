import { useRouter } from "expo-router";
import { forwardRef, useCallback, useRef } from "react";

import {
  BottomSheetMethods,
  BottomSheetModal,
  BottomSheetModalProps,
} from "./BottomSheetModal";

type BottomSheetPageProps = Omit<BottomSheetModalProps, "onClose"> & {
  onClose?: () => void;
};

export const BottomSheetPage = forwardRef<
  BottomSheetMethods,
  BottomSheetPageProps
>(function BottomSheetPage({ onClose, ...props }, ref) {
  const router = useRouter();

  const defaultOnClose = useCallback(() => {
    router.back();
  }, [router]);

  /**
   * Expo Router rerenders the component many times, which may call the onClose
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
    <BottomSheetModal
      ref={ref as any}
      onClose={onBottomSheetClose}
      {...props}
    />
  );
});
