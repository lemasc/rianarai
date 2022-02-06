import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

export type SelectData<T> = T & {
  name: string
}

type SelectProps<T> = {
  data: SelectData<T>[]
  selected: SelectData<T>
  onChange: (value: SelectData<T>) => void
  className: string
}

export default function SelectBox<T = Record<string, unknown>>({
  onChange,
  selected,
  data,
  className,
}: SelectProps<T>): JSX.Element {
  return (
    <div className={className + ' my-1'}>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="cursor-pointer flex flex-row w-full py-2 pl-3 text-left bg-white dark:bg-gray-800 rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-white focus-visible:ring-offset-2 focus-visible:border-apple-500 sm:text-sm">
            <span className="block truncate flex-grow">{selected.name}</span>
            <span className="flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base dark:bg-gray-800 bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((item) => (
                <Listbox.Option
                  key={item.name}
                  className={({ active }) =>
                    `${
                      active ? 'cursor-pointer' : 'text-gray-900 dark:text-gray-100'
                    } cursor-default select-none relative py-2 pl-10 pr-4 dark:hover:bg-gray-900 hover:bg-gray-100 `
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate cursor-pointer`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={`text-apple-400 absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
