import {
  Text as RText,
  TextProps as RTextProps,
  StyleSheet,
} from "react-native";
import { FontSize, FontWeight, bodyFonts } from "../fonts";
import React, { memo } from "react";

export interface TextProps extends RTextProps {
  weight?: FontWeight;
  size?: FontSize;
}

// Borrow context method from NativeBase
// To have a RN compatible behaviour, we'll inherit parent text styles as base style
const TextAncestorContext = React.createContext(false);

const StyledText = ({ children, style, weight, size }: TextProps) => {
  const hasTextAncestor = React.useContext(TextAncestorContext);

  const props: RTextProps = {
    style: [
      hasTextAncestor && !weight
        ? undefined
        : {
            fontFamily: bodyFonts[weight ?? "regular"],
          },
      hasTextAncestor && !size ? undefined : fontSizes[size ?? "md"],
      style,
    ],
  };

  return hasTextAncestor ? (
    <RText {...props}>{children}</RText>
  ) : (
    <TextAncestorContext.Provider value={true}>
      <RText {...props}>{children}</RText>
    </TextAncestorContext.Provider>
  );
};

export const Text = memo(StyledText);

const fontSizes = StyleSheet.create({
  xs: { fontSize: 12 },
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 20 },
  "2xl": { fontSize: 24 },
  "3xl": { fontSize: 30 },
  "4xl": { fontSize: 36 },
  "5xl": { fontSize: 48 },
  "6xl": { fontSize: 64 },
  "7xl": { fontSize: 80 },
  "8xl": { fontSize: 96 },
  "9xl": { fontSize: 128 },
});
