import logo from "assets/images/logo.png";
import { Box, IBoxProps, Image, Text } from "native-base";

export default function Brand(props: IBoxProps) {
  return (
    <Box
      {...props}
      flexDirection="row"
      alignItems="center"
      alignContent="center"
    >
      <Image alt="Logo" source={logo} style={{ width: 50, height: 50 }} />
      <Box px="4" flexDirection="row">
        <Text fontSize="2xl" fontFamily="brand" color="red.600">
          Rian
        </Text>
        <Text fontSize="2xl" fontFamily="brand" color="purple.600">
          Arai
        </Text>
      </Box>
    </Box>
  );
}
