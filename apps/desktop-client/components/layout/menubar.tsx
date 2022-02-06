import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { ComponentProps } from 'react'
import { CogIcon, MenuIcon, NewspaperIcon, XIcon } from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/outline'
import { Transition } from '@headlessui/react'

export type Navigation = {
  href: string
  title: string
  icon?: (props: ComponentProps<'svg'>) => JSX.Element
}

export const navigation: Navigation[] = [
  {
    href: '/',
    title: 'หน้าหลัก',
    icon: HomeIcon,
  },
  {
    href: '/courses',
    title: 'รายวิชา',
    icon: NewspaperIcon,
  },
  /*
  {
    href: '/work',
    title: 'งานที่ได้รับ',
    icon: BriefcaseIcon,
  },*/
]

function Toolbar(): JSX.Element {
  const { push } = useRouter()
  return (
    <>
      <button
        title="การตั้งค่า"
        className="focus:outline-none"
        onClick={() => {
          push('/settings')
        }}
      >
        <CogIcon className="w-7 h-7" />
      </button>
    </>
  )
}

export function SidebarComponent(): JSX.Element {
  const router = useRouter()
  function isActive(route: string): string {
    return route == router.pathname ? 'bg-rianarai-300' : undefined
  }
  return (
    <>
      <div>
        <img src="/logo.svg" width={50} height={50} alt="Logo" draggable={false} />
      </div>
      <div className="menu">
        {navigation.map((n) => (
          <Link key={n.title} href={n.href}>
            <a
              draggable={false}
              title={n.title}
              className={isActive(n.href)}
              aria-current={n.href == router.pathname ? 'page' : undefined}
            >
              <n.icon className="sm:h-8 sm:w-8 h-6 w-6" />
              {n.title}
            </a>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-6 py-2 text-gray-700">
        <Toolbar />
      </div>
    </>
  )
}
/*
export function getUnreadAnnounce(
  announce: Document<Announcement>[],
  metadata: UserMetadata
): Document<Announcement>[] {
  if (!announce) return []
  return Object.values(announce.filter((a) => !(metadata && metadata.announceId?.includes(a.id))))
}
*/
export default function MenuBarComponent({
  docked,
  open,
  setOpen,
}: {
  docked: boolean
  open: boolean
  setOpen: (value: boolean) => void
}): JSX.Element {
  return (
    <Transition
      show={!docked}
      enter="transition duration-300 ease-in"
      enterFrom="transform-gpu opacity-0 -translate-y-full"
      enterTo="transform-gpu opacity-100"
      leave="transition duration-300 ease-out"
      leaveFrom="transform-gpu opacity-100"
      leaveTo="transform-gpu opacity-0 -translate-y-full"
      className="dark:bg-gray-900 dark:border-b dark:border-gray-600 bg-white shadow-md w-full flex flex-row items-center justify-start px-6 py-4"
      as="nav"
    >
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-gray-600 focus:outline-none"
      >
        <span className="sr-only hidden">Open main menu</span>
        {open ? (
          <XIcon className="block h-8 w-8" aria-hidden="true" />
        ) : (
          <MenuIcon className="block h-8 w-8" aria-hidden="true" />
        )}
      </button>
      <div title="RianArai" className="flex flex-row items-center h-10">
        <h1 className={'px-4 text-2xl header-font select-none'}>
          <span className={'text-red-500'}>เรียน</span>
          <span className={'text-purple-500'}>อะไร</span>
        </h1>
      </div>
    </Transition>
  )
}
