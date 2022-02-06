import { ReactNode } from 'react'
import Skeleton from 'react-loading-skeleton'

export function WithSideBar({ children }: { children: ReactNode | ReactNode[] }) {
  return <div className="flex flex-col md:flex-row gap-8">{children}</div>
}
export function SideBar({ children }: { children: ReactNode | ReactNode[] }) {
  return <div className="hidden md:flex flex-col gap-4 flex-shrink-0">{children}</div>
}
export function SideBarWidget({ children }: { children: ReactNode[] }) {
  return (
    <div
      className={`rounded-xl border gap-2 py-6 px-6 xl:px-10 flex flex-col items-center justify-center`}
    >
      {children}
    </div>
  )
}
export function WidgetText({
  show,
  children,
  value,
  multiple,
  className,
}: {
  show?: boolean
  children?: ReactNode
  value?: string
  multiple: number
  className?: string
}) {
  return show || value ? (
    <span className={className}>{children ?? value}</span>
  ) : (
    <Skeleton width={50 * multiple} />
  )
}
