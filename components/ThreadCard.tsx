import Link from 'next/link'
import { Thread } from '@/lib/types'
import StageEmoji from './StageEmoji'
import { format } from 'date-fns'

interface Props {
  thread: Thread
}

export default function ThreadCard({ thread }: Props) {
  const { id, origin, latest, status, notes } = thread

  return (
    <Link
      href={`/garden/${origin.slug}`}
      className="block border border-black/10 rounded-xl mb-3 no-underline hover:border-black/20 transition-colors group"
    >
      <div className="p-5 grid grid-cols-[1fr_auto] gap-4 items-start">
        <div>
          <StageEmoji stage={origin.frontmatter.stage} variant="icon" className="mb-1.5 text-[14px]" />
          <p className="text-[15px] font-medium text-primary mb-1 leading-snug group-hover:text-primary">
            {id.replace(/-/g, ' ')}
          </p>
          <p className="text-[13px] text-secondary italic leading-relaxed mb-2.5 max-w-lg">
            "{origin.frontmatter.q}"
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {origin.frontmatter.tags?.map(tag => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2 py-0.5 rounded border border-black/10 text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span
            className={`font-mono text-[10px] px-2.5 py-0.5 rounded border whitespace-nowrap ${
              status === 'active'
                ? 'border-teal-600 text-teal-600'
                : 'border-black/10 text-secondary opacity-50'
            }`}
          >
            {status}
          </span>
          <span className="font-mono text-[10px] text-secondary opacity-60 whitespace-nowrap">
            {notes.length} note{notes.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="px-5 py-2.5 border-t border-black/10 bg-secondary rounded-b-xl flex items-center justify-between">
        <span className="text-[12px] text-secondary italic truncate max-w-md">
          latest: "{latest.frontmatter.q}"
        </span>
        <span className="font-mono text-[10px] text-secondary opacity-60 flex-shrink-0 ml-4">
          {format(latest.date, 'MMM d')}
        </span>
      </div>
    </Link>
  )
}
