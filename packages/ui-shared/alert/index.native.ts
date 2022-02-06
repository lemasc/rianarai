import { Alert } from "react-native";
import { AlertOptions } from "./types";

export function alertAsync<T>({
  title,
  message,
  buttons,
  cancelable,
  onDismiss,
}: AlertOptions<T>) {
  return new Promise<T | undefined>((resolve) =>
    Alert.alert(
      title,
      message,
      buttons.map((b) => ({
        ...b,
        onPress: () => {
          b.onPress && b.onPress();
          resolve(b.value);
        },
      })),
      { cancelable, onDismiss }
    )
  );
}
