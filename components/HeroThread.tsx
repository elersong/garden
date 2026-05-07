
import { Note, Thread } from "@/lib/types"
import Link from "next/link"

type HeroThreadProps = {
  ancestors: Note[]
  currentNote: Note
  thread: Thread
}

export default function HeroThread({ ancestors, currentNote, thread }: HeroThreadProps) {
  return (
    <>
      <div className="relative pl-7 mb-6">
        {/* Vertical thread line */}
        <div className="absolute left-[7px] top-[6px] bottom-[6px] w-px bg-black/10" />

        {/* Ancestor questions */}
        {ancestors.map((note, i) => (
          <div key={note.slug} className="relative mb-7">
            <div className="absolute -left-[22px] top-[6px] w-[7px] h-[7px] rounded-full bg-black/20" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-1 opacity-60">
              {i === 0 && ancestors.length === 1 ? 'started with' : i === 0 ? 'origin' : 'which eventually became'}
            </p>
            <Link
              href={`/garden/${note.slug}`}
              className="text-[13px] text-secondary italic leading-relaxed no-underline hover:text-primary transition-colors"
            >
              {note.frontmatter.q}
            </Link>
          </div>
        ))}

        {/* Current (active) question */}
        <div className="relative">
          <div className="absolute -left-[23px] top-[5px] w-[9px] h-[9px] rounded-full bg-primary" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-2">
            currently asking
          </p>
          <Link
            href={`/garden/${currentNote.slug}`}
            className="font-serif text-[26px] leading-[1.45] text-primary no-underline hover:opacity-80 transition-opacity block max-w-xl"
          >
            {currentNote.frontmatter.q}
          </Link>
        </div>
      </div>

      <Link
        href={`/garden/${thread?.origin.slug}`}
        className="font-mono text-[11px] text-secondary no-underline hover:text-primary transition-colors tracking-wide"
      >
        full thread →
      </Link>
    </>
  )
}