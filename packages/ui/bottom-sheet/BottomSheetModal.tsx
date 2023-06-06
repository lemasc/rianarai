import BottomSheet, { BottomSheetView as BSView } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "expo-router";
import { Factory, View } from "native-base";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const BottomSheetView = Factory(BSView);

export type BottomSheetModalProps = React.ComponentProps<
  typeof BottomSheetView
> & {
  onClose: () => void;
  canClose?: boolean;
  open?: boolean;
  animateOnMount?: boolean;
} & Partial<Pick<React.ComponentProps<typeof BottomSheet>, "snapPoints">>;

export type BottomSheetMethods = BottomSheet;

const FADE_DURATION = 100;

export const BottomSheetModal = forwardRef<BottomSheet, BottomSheetModalProps>(
  function BottomSheetModal(
    {
      snapPoints,
      onClose,
      canClose = true,
      open = true,
      animateOnMount = true,
      ...props
    },
    ref,
  ) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const close = useCallback(
      (...args: Parameters<BottomSheet["close"]>) => {
        if (!canClose) return;
        bottomSheetRef.current?.close(...args);
      },
      [canClose],
    );

    useImperativeHandle(ref, () =>
      Object.assign({}, bottomSheetRef.current, {
        close,
      } as BottomSheetMethods),
    );

    const isRecentlyOpened = useRef(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const backdropOpacity = useSharedValue(0);

    const style = useAnimatedStyle(() => {
      return {
        opacity: withTiming(backdropOpacity.value, {
          duration: FADE_DURATION,
          easing: Easing.linear,
        }),
      };
    });

    useEffect(() => {
      if (open) {
        bottomSheetRef.current?.snapToIndex(0);
        backdropOpacity.value = 1;
        isRecentlyOpened.current = true;
      } else if (isRecentlyOpened.current) {
        isRecentlyOpened.current = false;
        backdropOpacity.value = 0;
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, FADE_DURATION);
      }
    }, [open]);

    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: isAnimating || open ? 100 : -1,
        }}
        flex={1}
        alignItems="center"
        justifyContent="center"
      >
        <Animated.View style={[styles.backdrop, style]}>
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={() => close()}
          />
        </Animated.View>
        <BottomSheet
          ref={bottomSheetRef}
          index={animateOnMount ? 0 : -1}
          snapPoints={snapPoints ?? ["50%"]}
          enablePanDownToClose={canClose}
          keyboardBlurBehavior="restore"
          onClose={onClose}
        >
          <BottomSheetView focusHook={useFocusEffect} {...props} />
        </BottomSheet>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
