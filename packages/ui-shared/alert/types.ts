import type {
  AlertOptions as NativeAlertOptions,
  AlertButton as NativeAlertButton,
} from "react-native";

type AlertButton<T> = NativeAlertButton & {
  value?: T;
};

export type AlertOptions<T> = {
  type: "none" | "info" | "error" | "question" | "warning";
  title: string;
  message: string;
  buttons: AlertButton<T>[];
} & NativeAlertOptions;
