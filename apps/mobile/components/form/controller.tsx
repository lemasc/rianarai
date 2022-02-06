import { FormControl } from 'native-base'
import {
  Controller as FormController,
  ControllerProps,
  FieldValues,
  Control,
} from 'react-hook-form'
import Text from '../Text'

export type BaseControllerProps<T> = {
  control: Control<T>
  name: ControllerProps<T>['name']
  label: string
  hintText?: string
  test?: keyof T
  rules?: ControllerProps<T>['rules']
}

export default function Controller<T extends FieldValues>({
  control,
  label,
  render,
  hintText,
  ...rest
}: BaseControllerProps<T> & Omit<ControllerProps, 'control'>) {
  return (
    <FormController
      {...rest}
      control={control}
      render={(props) => {
        const {
          fieldState: { error },
        } = props
        return (
          <FormControl isRequired isInvalid={error !== undefined}>
            <FormControl.Label>
              <Text fontWeight={'semibold'}>{label}</Text>
            </FormControl.Label>
            {/* @ts-expect-error We manually render here. */}
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
        )
      }}
    />
  )
}
