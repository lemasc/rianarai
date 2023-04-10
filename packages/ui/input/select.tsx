import { CheckIcon, Select as NBSelect, ISelectProps } from "native-base";
import { ISelectComponentType } from "native-base/lib/typescript/components/primitives/Select";

const Select: ISelectComponentType = (props: ISelectProps) => {
  return (
    <NBSelect
      _selectedItem={{
        endIcon: <CheckIcon size={5} />,
      }}
      _light={{
        bg: "white",
        _item: {
          _pressed: {
            bg: "rianarai.200",
          },
        },
        _selectedItem: {
          _text: {
            color: "gray.900",
          },
          bg: "rianarai.400",
        },
      }}
      _dark={{
        bg: "gray.800",
        _item: {
          _pressed: {
            bg: "rianarai.800",
          },
        },
        _selectedItem: {
          _text: {
            color: "gray.900",
          },
          bg: "rianarai.600",
        },
      }}
      {...props}
    />
  );
};

Select.Item = NBSelect.Item;

export { Select };
export type { ISelectProps };
