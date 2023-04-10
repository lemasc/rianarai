import { FormControl, Text } from "native-base";
import {
  Controller as FormController,
  ControllerProps as Props,
  FieldValues,
  FieldPath,
} from "react-hook-form";

type ControllerProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>
> = Props<T, N> & {
  label: string;
  hintText?: string;
};

export type BaseControllerProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>
> = Omit<ControllerProps<T, N>, "render">;

const isRequired = <
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>
>(
  rules?: Props<T, N>["rules"]
): boolean => {
  if (!rules) return false;
  if (typeof rules.required === "object") {
    return Boolean(rules.required.value);
  }
  return typeof rules.required !== "undefined";
};

export default function Controller<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>
>({ control, label, render, hintText, ...rest }: ControllerProps<T, N>) {
  if (!control) throw new Error("Missing controller `control` prop.");
  return (
    <FormController
      {...rest}
      control={control}
      render={(props) => {
        const {
          fieldState: { error },
        } = props;
        return (
          <FormControl
            isRequired={isRequired(rest.rules)}
            isInvalid={error !== undefined}
          >
            <FormControl.Label>
              <Text fontWeight="medium">{label}</Text>
            </FormControl.Label>
            {render(props)}
            {error ? (
              <FormControl.ErrorMessage>
                <Text fontSize="xs" color="error.500">
                  Error
                </Text>
              </FormControl.ErrorMessage>
            ) : (
              hintText && (
                <FormControl.HelperText>
                  <Text fontSize="xs" color="gray.500">
                    {hintText}
                  </Text>
                </FormControl.HelperText>
              )
            )}
          </FormControl>
        );
      }}
    />
  );
}
