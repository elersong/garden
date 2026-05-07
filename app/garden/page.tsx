import type { Metadata } from 'next'
import { getAllThreads, getStandaloneNotes } from '@/lib/garden'
import ThreadCard from '@/components/ThreadCard'
import StageEmoji from '@/components/StageEmoji'
import Link from 'next/link'
import { format } from 'date-fns'

export const metadata: Metadata = { title: 'Garden' }

export default function GardenPage() {
  const threads = getAllThreads()
  const standalone = getStandaloneNotes()

  return (
    <div>
      <p className="font-serif text-[22px] text-primary mb-1.5">/garden</p>
      <p className="text-[14px] text-secondary leading-relaxed max-w-lg mb-8">
        Threads of inquiry, notes in progress, and ideas at various stages of
        development. Everything here is either growing or waiting to be picked
        back up.
      </p>

      {/* Threads */}
      {threads.length > 0 && (
        <section className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-3">
            threads
          </p>
          {threads.map(thread => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </section>
      )}

      {/* Standalone notes */}
      {standalone.length > 0 && (
        <section>
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-3">
            standalone notes
          </p>
          <div>
            {standalone.map((note, i) => (
              <Link
                key={note.slug}
                href={`/garden/${note.slug}`}
                className={`grid grid-cols-[90px_1fr_auto] items-start gap-5 py-3.5 no-underline
                  border-b border-black/10 hover:text-primary group
                  ${i === 0 ? 'border-t border-black/10' : ''}`}
              >
                <span className="font-mono text-[11px] text-secondary opacity-70 pt-0.5 leading-relaxed">
                  {format(note.date, 'MMM d')}<br />{format(note.date, 'yyyy')}
                </span>
                <div>
                  <p className="text-[14px] font-medium text-secondary group-hover:text-primary mb-0.5 leading-snug transition-colors">
                    {note.frontmatter.q}
                  </p>
                  <div className="flex gap-1.5 flex-wrap mt-1.5">
                    {note.frontmatter.tags?.map(tag => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded border border-black/10 text-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <StageEmoji stage={note.frontmatter.stage} variant="icon" className="flex-shrink-0 pt-0.5" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {threads.length === 0 && standalone.length === 0 && (
        <p className="text-[14px] text-secondary italic">
          Nothing planted yet. Add .mdx files to content/garden/ to get started.
        </p>
      )}
    </div>
  )
}
