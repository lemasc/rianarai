import { Pressable as NBPressable, IPressableProps } from "native-base";

export const Pressable = ({
  android_ripple,
  _dark,
  ...props
}: IPressableProps) => {
  return (
    <NBPressable
      android_ripple={{ ...(android_ripple ?? {}), color: "#e5e5e5" }}
      _dark={{
        ...(_dark ?? {}),
        android_ripple: {
          color: "#404040",
        },
      }}
      {...props}
    />
  );
};

export { IPressableProps } from "native-base";
