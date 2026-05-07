'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Note } from '@/lib/types'
import StageEmoji from './StageEmoji'

interface ThreadTOCProps {
  notes: Note[]
  currentSlug: string
  threadId: string
  collapseAfter?: number
}

export default function ThreadTOC({
  notes,
  currentSlug,
  threadId,
  collapseAfter = 5,
}: ThreadTOCProps) {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? notes : notes.slice(0, collapseAfter)
  const hiddenCount = notes.length - collapseAfter
  const hasOverflow = notes.length > collapseAfter

  return (
    <div className="bg-secondary rounded-lg p-3 mb-8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-2.5">
        thread · {threadId.replace(/-/g, ' ')}
      </p>

      <div>
        {visible.map((note, i) => {
          const isCurrent = note.slug === currentSlug

          return (
            <TOCItem
              key={note.slug}
              note={note}
              index={i + 1}
              isCurrent={isCurrent}
            />
          )
        })}
      </div>

      {hasOverflow && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-black/10 w-full text-left bg-transparent border-l-0 border-r-0 border-b-0 cursor-pointer"
        >
          <span
            className="font-mono text-[10px] text-secondary opacity-50 transition-transform duration-150"
            style={{ display: 'inline-block', transform: expanded ? 'rotate(180deg)' : 'none' }}
          >
            ▾
          </span>
          <span className="font-mono text-[10px] text-secondary tracking-wide">
            {expanded ? 'collapse thread' : 'show full thread'}
          </span>
          {!expanded && (
            <span className="font-mono text-[10px] text-secondary opacity-50">
              +{hiddenCount} more
            </span>
          )}
        </button>
      )}
    </div>
  )
}

function TOCItem({
  note,
  index,
  isCurrent
}: {
  note: Note
  index: number
  isCurrent: boolean
}) {
  const inner = (
    <div className={`flex items-start gap-2.5 py-1.5 text-[13px] ${isCurrent ? 'text-primary font-medium' : 'text-secondary'}`}>
      <span className={`font-mono text-[10px] flex-shrink-0 pt-0.5 min-w-[16px] ${isCurrent ? 'text-primary' : 'text-secondary opacity-50'}`}>
        {index}
      </span>
      <span className="flex-1 leading-relaxed" style={{ fontStyle: isCurrent ? 'normal' : 'italic' }}>
        {note.frontmatter.q}
      </span>
      <StageEmoji stage={note.frontmatter.stage} variant="icon" className="flex-shrink-0 pt-0.5 opacity-75" />
    </div>
  )

  if (isCurrent) return <div>{inner}</div>

  return (
    <Link href={`/garden/${note.slug}`} className="block no-underline hover:text-primary transition-colors">
      {inner}
    </Link>
  )
}
