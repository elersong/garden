'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/now', label: '/now' },
  { href: '/garden', label: '/garden' },
  { href: '/work', label: '/work' },
  { href: '/about', label: '/about' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between pb-10 border-b border-black/10 mb-10">
      <div className="flex flex-col gap-0.5">
        <Link
          href="/"
          className="font-mono text-[13px] font-medium tracking-wide text-primary no-underline hover:opacity-70 transition-opacity"
        >
          Grey Elerson
        </Link>
        <span className="font-mono text-[11px] text-secondary flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block flex-shrink-0" />
          available for hire · layton city, ut
        </span>
      </div>

      <ul className="flex gap-6 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`font-mono text-[12px] tracking-wide no-underline transition-colors ${
                pathname.startsWith(href)
                  ? 'text-primary'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
