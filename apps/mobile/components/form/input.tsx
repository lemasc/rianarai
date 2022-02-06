import {
  IInputProps,
  CheckIcon,
  Input as NBInput,
  Select as NBSelect,
  ISelectProps,
} from 'native-base'
import { ISelectComponentType } from 'native-base/lib/typescript/components/primitives/Select'
import { useFontSize } from '../Text'

function Input(props: IInputProps) {
  const fontSize = useFontSize('sm')
  return (
    <NBInput
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      fontSize={fontSize}
      {...props}
    />
  )
}

const Select: ISelectComponentType = (props: ISelectProps) => {
  const fontSize = useFontSize('sm')
  return (
    <NBSelect
      fontSize={fontSize}
      _selectedItem={{
        endIcon: <CheckIcon size={5} />,
      }}
      _light={{
        bg: 'white',
        _item: {
          _pressed: {
            bg: 'rianarai.200',
          },
        },
        _selectedItem: {
          _text: {
            color: 'gray.900',
          },
          bg: 'rianarai.400',
        },
      }}
      _dark={{
        bg: 'gray.800',
        _item: {
          _pressed: {
            bg: 'rianarai.800',
          },
        },
        _selectedItem: {
          _text: {
            color: 'gray.900',
          },
          bg: 'rianarai.600',
        },
      }}
      {...props}
    />
  )
}

Select.Item = NBSelect.Item

export { Select, Input }
