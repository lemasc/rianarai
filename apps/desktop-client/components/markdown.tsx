/* eslint-disable react/display-name */
import Link from 'next/link'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Markdown({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  const components: Components = {
    li: ({ node, ordered, children, ...props }) => (
      <li {...props}>
        <div className="content-sublist">{children}</div>
      </li>
    ),
    a: ({ node, href, ...props }) => {
      if (href && (href.charAt(0) === '/' || href.charAt(0) === '#')) {
        // Use next/link for client navigation
        return (
          <Link href={href}>
            <a {...props} />
          </Link>
        )
      }
      return <a target="_blank" {...props} />
    },
  }
  return (
    <div className={`content ${className}`}>
      <ReactMarkdown components={components} linkTarget="_blank" remarkPlugins={[remarkGfm]}>
        {children.replaceAll('\n', '\n\n')}
      </ReactMarkdown>
    </div>
  )
}
