import { Button as NBButton, ITextProps } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
/**
 * Type for entering both light and dark colors in a single array.
 * The first element is the light color, the second is the dark color.
 *
 * @example
 * const color: FixedColor = ["red.500", "red.300"]
 *
 */
export type FixedColor<SecondField extends ColorType | null = ColorType> = [
  ColorType,
  // If we passed the type SecondField as null, we allow the dark color to be optional.
  ColorType | SecondField
];

type BaseProps = React.ComponentProps<typeof NBButton>;

export type ButtonProps = Omit<BaseProps, "_text"> & {
  _button: {
    /**
     * The background color of the button when it is pressed.
     */
    pressed: FixedColor<null>;
    /**
     * The default background color of the button.
     */
    default: FixedColor;
    /**
     * The border color of the button. If not specified, the border color will be the same as the default background color.
     */
    border?: FixedColor<null>;
  };
  _text: Omit<ITextProps, "color"> & {
    color: FixedColor;
  };
};

export const Button = ({ _text, _button, ...props }: ButtonProps) => {
  if (!_button || !_text)
    throw new Error(
      "To use this custom `Button` component, you must specify the color in _button and _text props."
    );
  return (
    <NBButton
      {...props}
      _hover={{
        ...(props?._hover ?? {}),
        backgroundColor: _button.pressed[0],
      }}
      _pressed={{
        ...(props?._pressed ?? {}),
        backgroundColor: _button.pressed[0],
      }}
      backgroundColor={_button.default[0]}
      borderColor={_button.border?.[0] ?? _button.default[0]}
      _dark={{
        backgroundColor: _button.default[1],
        borderColor: _button.border?.[1] ?? _button.default[1],
      }}
      _text={{
        ..._text,
        color: _text.color[0],
        _dark: {
          color: _text.color[1],
        },
      }}
    />
  );
};
