import { Ionicons } from "@expo/vector-icons";
import GoogleIcon from "mobile/components/icon/google";
import { signInWithGoogle } from "mobile/features/user/functions";
import { Link, HStack, VStack, Text, useToast, Icon } from "native-base";
import { Button } from "ui/components";

function SignInWithGoogleButton() {
  const toast = useToast();
  const signIn = async () => {
    try {
      await signInWithGoogle();
    } catch {
      const id = "signIn-error";
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: "ไม่สามารถเข้าสู่ระบบได้",
          mx: 8,
          maxW: "sm",
        });
      }
    }
  };

  return (
    <>
      <Button
        rounded="xl"
        py="3"
        borderWidth="1"
        w="full"
        leftIcon={
          <GoogleIcon width={24} height={24} size="sm" marginRight="2" />
        }
        onPress={signIn}
        _button={{
          pressed: ["gray.200", "gray.700"],
          default: ["gray.100", "gray.900"],
          border: ["gray.200", "gray.900"],
        }}
        _text={{
          color: ["gray.500", "gray.300"],
          fontWeight: "medium",
        }}
      >
        เข้าสู่ระบบด้วย Google
      </Button>
    </>
  );
}

function SignInWihEmailButton() {
  const toast = useToast();
  const signIn = async () => {
    try {
      await signInWithGoogle();
    } catch {
      const id = "signIn-error";
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: "ไม่สามารถเข้าสู่ระบบได้",
          mx: 8,
          maxW: "sm",
        });
      }
    }
  };
  return (
    <Button
      rounded="xl"
      py="3"
      borderWidth="1"
      w="full"
      leftIcon={
        <Icon
          as={Ionicons}
          name="mail"
          size="md"
          marginRight="2"
          color="dark.100"
        />
      }
      onPress={signIn}
      _button={{
        pressed: ["rianarai.600", "rianarai.700"],
        default: ["rianarai.500", "rianarai.800"],
      }}
      _text={{
        color: ["dark.100", "dark.600"],
        fontWeight: "medium",
      }}
    >
      เข้าสู่ระบบด้วยอีเมล
    </Button>
  );
}

export function SignIn() {
  return (
    <VStack space="3" px="8" py="6" alignItems="center">
      <SignInWithGoogleButton />
      <SignInWihEmailButton />
      <HStack py="2" space="4" flexDirection="row" flexWrap="wrap">
        <Link
          isExternal
          href={`${process.env.NEXT_PUBLIC_ENDPOINT}/docs/classroom`}
        >
          <Text color="blue.500" underline fontSize="xs">
            ข้อตกลงในการใช้งาน
          </Text>
        </Link>
        <Link
          isExternal
          href={`${process.env.NEXT_PUBLIC_ENDPOINT}/docs/classroom`}
        >
          <Text color="blue.500" underline fontSize="xs">
            นโยบายความเป็นส่วนตัว
          </Text>
        </Link>
      </HStack>
    </VStack>
  );
}
