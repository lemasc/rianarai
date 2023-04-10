import { FieldPath, FieldValues } from "react-hook-form";
import {
  Checkbox,
  Input,
  Select,
  ICheckboxProps,
  IInputProps,
  ISelectProps,
} from "ui/input";

import Controller, { BaseControllerProps } from "./controller";

export type SelectItems = {
  label: string;
  value: string;
};

type OmittedProps = {
  TextInput: keyof Pick<IInputProps, "onChangeText" | "onBlur" | "value">;
  CheckboxInput: keyof Pick<ICheckboxProps, "onChange" | "value">;
  SelectInput: keyof Pick<ISelectProps, "onValueChange" | "selectedValue">;
};

type InputProps<
  Props extends object,
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>
> = Omit<
  Props,
  | OmittedProps["TextInput"]
  | OmittedProps["CheckboxInput"]
  | OmittedProps["SelectInput"]
> & {
  controller: BaseControllerProps<T, N>;
};

export function TextInput<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>
>(props: InputProps<IInputProps, T, N>) {
  const isNumber =
    props.keyboardType?.includes("pad") || props.keyboardType === "numeric";
  return (
    <Controller
      {...props.controller}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          keyboardType={props.keyboardType}
          {...props}
          onBlur={onBlur}
          onChangeText={(text) => {
            if (text && isNumber) {
              const int = parseInt(text.replace(/[^0-9]/g, ""), 10);
              return onChange(isNaN(int) ? "" : int);
            }
            return onChange(text);
          }}
          value={isNumber ? value?.toString() : value}
        />
      )}
    />
  );
}

export function CheckBoxInput<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>
>({ controller, ...rest }: InputProps<ICheckboxProps, T, N>) {
  return (
    <Controller
      {...controller}
      render={({ field: { onChange, value } }) => (
        <Checkbox {...rest} onChange={onChange} value={value} />
      )}
    />
  );
}

export const SelectInput = <
  T extends FieldValues,
  N extends FieldPath<T> = FieldPath<T>
>({
  controller,
  children,
  ...rest
}: InputProps<ISelectProps, T, N>) => {
  return (
    <Controller
      {...controller}
      render={({ field: { onChange, value } }) => (
        <Select
          selectedValue={value}
          onValueChange={(...args) => {
            onChange(...args);
          }}
          {...rest}
        >
          {children}
        </Select>
      )}
    />
  );
};

SelectInput.Item = Select.Item;
