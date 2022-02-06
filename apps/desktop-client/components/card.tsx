import { ReactNode, ReactNodeArray } from 'react'
import Link from 'next/link'

export default function Card({
  onClick,
  href,
  children,
  className,
  title,
}: {
  onClick?: () => void
  href?: string
  children: ReactNode | ReactNodeArray
  className: string
  title: string
}): JSX.Element {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        title={title}
        className={`rounded-lg hover:shadow border${className ? ` ${className}` : ''}`}
      >
        {children}
      </button>
    )
  }
  return (
    <Link href={href}>
      <a
        title={title}
        draggable={false}
        className={`rounded-lg hover:shadow border${className ? ` ${className}` : ''}`}
      >
        {children}
      </a>
    </Link>
  )
}
