import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/work'
import { ProjectStatus } from '@/lib/types'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Work' }

const statusLabel: Record<ProjectStatus, string> = {
  'in-progress': 'in progress',
  'shipped': 'shipped',
  'archived': 'archived',
}

const statusStyle: Record<ProjectStatus, string> = {
  'in-progress': 'border-teal-600 text-teal-600',
  'shipped': 'border-blue-500/50 text-blue-600',
  'archived': 'border-black/10 text-secondary opacity-50',
}

export default function WorkPage() {
  const projects = getAllProjects()

  return (
    <div>
      <p className="font-serif text-[22px] text-primary mb-1.5">selected /work</p>
      <p className="text-[14px] text-secondary leading-relaxed max-w-lg mb-8">
        A few things I've built, and what I actually learned from building them.
        The reflections matter more than the stack.
      </p>

      <div className="space-y-3">
        {projects.map(project => {
          const { name, tagline, stack, status, learned, reflection, github, thread, link } =
            project.frontmatter

          return (
            <div
              key={project.slug}
              className="border border-black/10 rounded-xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 pb-4 grid grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                  <p className="text-[16px] font-medium text-primary mb-1">{name}</p>
                  <p className="text-[13px] text-secondary leading-relaxed mb-3 max-w-xl">
                    {tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.map(s => (
                      <span
                        key={s}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`font-mono text-[10px] px-2.5 py-0.5 rounded border whitespace-nowrap self-start ${statusStyle[status]}`}
                >
                  {statusLabel[status]}
                </span>
              </div>

              {/* Story */}
              <div className="px-5 py-4 border-t border-black/10 bg-secondary">
                <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-2">
                  what I learned
                </p>
                <p className="text-[13px] text-secondary leading-[1.75] max-w-2xl mb-3">
                  {learned}
                </p>
                <p className="font-serif text-[14px] text-primary italic pl-3.5 border-l-2 border-black/20 leading-snug">
                  "{reflection}"
                </p>
              </div>

              {/* Links */}
              {(github || thread || link) && (
                <div className="px-5 py-2.5 border-t border-black/10 flex gap-5">
                  {github && (
                    <a
                      href={github}
                      className="font-mono text-[11px] text-secondary no-underline hover:text-primary transition-colors tracking-wide"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github →
                    </a>
                  )}
                  {link && (
                    <Link
                      href={link}
                      className="font-mono text-[11px] text-secondary no-underline hover:text-primary transition-colors tracking-wide"
                    >
                      see it live →
                    </Link>
                  )}
                  {thread && (
                    <Link
                      href={`/garden`}
                      className="font-mono text-[11px] text-secondary no-underline hover:text-primary transition-colors tracking-wide"
                    >
                      the thread it started →
                    </Link>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
