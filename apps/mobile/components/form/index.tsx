import { Checkbox, ICheckboxProps, IInputProps, ISelectProps } from 'native-base'
import Controller, { BaseControllerProps } from './controller'
import { Input, Select } from './input'

export type SelectItems = {
  label: string
  value: string
}

type BaseInputProps<T> = {
  controller: BaseControllerProps<T>
}

export function TextInput<T>({
  controller,
  keyboardType,
  ...rest
}: BaseInputProps<T> & Omit<IInputProps, 'onChangeText' | 'onBlur' | 'value'>) {
  const isNumber = keyboardType?.includes('pad') || keyboardType == 'numeric'
  return (
    <Controller
      {...controller}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          keyboardType={keyboardType}
          {...rest}
          onBlur={onBlur}
          onChangeText={(text) => {
            if (text && isNumber) {
              const int = parseInt(text.replace(/[^0-9]/g, ''))
              return onChange(isNaN(int) ? '' : int)
            }
            return onChange(text)
          }}
          value={isNumber ? value?.toString() : value}
        />
      )}
    />
  )
}

export function CheckBoxInput<T>({
  controller,
  ...rest
}: BaseInputProps<T> & Omit<ICheckboxProps, 'onChange' | 'value'>) {
  return (
    <Controller
      {...controller}
      render={({ field: { onChange, value } }) => (
        <Checkbox {...rest} onChange={onChange} value={value} />
      )}
    />
  )
}

export function SelectInput<T>({
  controller,
  items,
  ...rest
}: BaseInputProps<T> & { items: SelectItems[] } & Omit<ISelectProps, 'onChange' | 'value'>) {
  return (
    <Controller
      {...controller}
      render={({ field: { onChange, value } }) => (
        <Select
          selectedValue={value}
          onValueChange={(...args) => {
            onChange(...args)
          }}
          {...rest}
        >
          {items.map((i) => (
            <Select.Item key={i.value} value={i.value} label={i.label} />
          ))}
        </Select>
      )}
    />
  )
}
