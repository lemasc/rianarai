import hero from "assets/images/hero.jpg";
import Brand from "mobile/components/layout/brand";
import { SignIn } from "mobile/features/auth";
import {
  Text,
  Box,
  ScrollView,
  Stack,
  IStackProps,
  useBreakpointValue,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground, Keyboard } from "react-native";

interface ContentProps {
  children: React.ReactNode;
  title: string;
  desc: string;
}

function Content(props: ContentProps): JSX.Element {
  return (
    <Box>
      <ScrollView>
        <Box
          px="8"
          pt="8"
          pb="6"
          borderBottomColor="gray.200"
          _dark={{ borderBottomColor: "gray.600" }}
          borderBottomWidth="1"
        >
          <Brand pb="2" />
          <Text isTruncated py="2" fontSize="2xl" fontFamily="Kodchasan-700">
            {props.title}
          </Text>
          <Text fontSize="lg">{props.desc}</Text>
        </Box>
        {props.children}
        <Text textAlign="center" fontSize="xs" py="4">
          Version 3.0.0-beta.X
        </Text>
      </ScrollView>
    </Box>
  );
}

const SignInScreen = () => {
  const [kbShown, setKbShown] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKbShown(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKbShown(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  const stackProps = useBreakpointValue<IStackProps>({
    base: {
      w: "full",
      roundedTop: !kbShown ? "xl" : undefined,
    },
    lg: {
      h: "full",
      maxWidth: "2/5",
      roundedTop: "none",
    },
  });
  return (
    <ImageBackground
      source={hero}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        flex={1}
        flexDirection={useBreakpointValue({ base: "row", lg: "column" })}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Stack {...stackProps} bg="white" _dark={{ bg: "gray.800" }} shadow="1">
          <Box justifyContent="center">
            <Content title="เข้าสู่ระบบ" desc="ยินดีต้อนรับจ้า มาเขียนใหม่และ">
              <SignIn />
            </Content>
          </Box>
        </Stack>
      </Box>
    </ImageBackground>
  );
};

export default SignInScreen;
