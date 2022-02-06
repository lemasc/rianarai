import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { navigation } from './menubar'

export default function Title({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter()
  const isSubPage = () => {
    return navigation.findIndex((n) => n.href === router.pathname) === -1
  }
  return (
    <header
      className={`pt-8 text-3xl font-medium ${
        isSubPage() ? 'flex flex-row gap-8 items-start' : 'md:text-4xl '
      }`}
    >
      {isSubPage() && (
        <button className="focus:outline-none" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-8 w-8 mt-0.5" />
        </button>
      )}
      {children}
    </header>
  )
}
