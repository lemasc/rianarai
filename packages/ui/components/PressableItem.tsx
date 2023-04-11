import { IPressableProps, Pressable } from "./Pressable";

export function PressableItem(props: IPressableProps) {
  return (
    <Pressable
      borderBottomWidth="1"
      _dark={{
        borderColor: "gray.700",
        bgColor: "black",
      }}
      bgColor="white"
      borderColor="coolGray.200"
      {...props}
    >
      {props.children}
    </Pressable>
  );
}
