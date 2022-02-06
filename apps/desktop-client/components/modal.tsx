import { Fragment, ReactNode, useRef } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

type ModalComponentProps = {
  closable: boolean
  show: boolean
  size: string
  onClose: () => void
  children: ReactNode
  title: string
  titleClass?: string
  description?: string
  descriptionClass?: string
}

export default function ModalComponent({
  closable,
  show,
  size,
  children,
  onClose,
  title,
  titleClass,
  description,
  descriptionClass,
}: ModalComponentProps): JSX.Element {
  const closeRef = useRef<HTMLButtonElement>(null)
  return (
    <Transition show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20"
        onClose={() => closable && onClose()}
        initialFocus={closeRef}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={
                size +
                ' inline-block w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg'
              }
            >
              <Dialog.Title
                as="h3"
                className={'flex flex-row px-4 py-4 text-lg leading-6 border-b ' + titleClass}
              >
                <div className="flex flex-grow">{title}</div>
                <button
                  title="ปิด"
                  className={'focus:outline-none' + (!closable ? ' hidden' : '')}
                  onClick={() => closable && onClose()}
                  ref={closeRef}
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </Dialog.Title>
              {description && (
                <Dialog.Description className={'px-6 py-3 ' + descriptionClass}>
                  {description}
                </Dialog.Description>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
