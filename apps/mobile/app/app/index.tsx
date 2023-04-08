import { signOut } from "mobile/features/user";
import { Button, Text } from "native-base";
import { View } from "react-native";

export default function Home() {
  console.log("The index route at loaded.");
  return (
    <View>
      <Text>Hello สวัสดี</Text>
      <Button onPress={() => signOut()}>Log Out</Button>
    </View>
  );
}
