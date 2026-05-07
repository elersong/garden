import { getMostRecentActiveThread, getRecentNotes } from '@/lib/garden'
import { getAllProjects } from '@/lib/work'
import StageEmoji from '@/components/StageEmoji'
import Link from 'next/link'
import { format } from 'date-fns'
import { nowData } from '@/content/now/data'
import HeroThread from '@/components/HeroThread'


const now = nowData.cards;


export default function HomePage() {
  const thread = getMostRecentActiveThread()
  const recentNotes = getRecentNotes(3)
  const projects = getAllProjects().slice(0, 2)

  // Build visible thread chain: up to 2 ancestors + current (last note)
  const threadNotes = thread?.notes ?? []
  const currentNote = threadNotes[threadNotes.length - 1]
  const ancestors = (() => {
    if (threadNotes.length >= 3) return [threadNotes[0], threadNotes[threadNotes.length - 2]]
    if (threadNotes.length === 2) return [threadNotes[0]]
    return []
  })()

  return (
    <div>
      {/* ── Hero: thread chain ─────────────────────────────────────────── */}
      {thread && currentNote && (
        <section className="mb-14">
          <HeroThread {...{ ancestors: ancestors.filter(Boolean), currentNote, thread }}/>

          {/* Byline */}
          <div className="flex items-center gap-2.5 mt-7 pt-7 border-t border-black/10">
            <span className="font-mono text-[13px] font-medium">software engineer</span>
            <span className="text-black/20 text-base">·</span>
            <span className="font-mono text-[12px] text-secondary">
              CS student · thinks in systems · feels in details · forgot to eat lunch
            </span>
          </div>
        </section>
      )}

      {/* ── Now cards ─────────────────────────────────────────────────── */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">currently</p>
          <Link href="/now" className="font-mono text-[11px] text-secondary no-underline hover:text-primary transition-colors">
            full /now →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(now).map(({ label, content, tag }) => (
            <div key={label} className="bg-secondary rounded-xl p-4">
              <p className="font-mono text-[11px] text-secondary mb-2 tracking-wide">{label}</p>
              <p className="text-[14px] text-primary leading-relaxed mb-2">{content}</p>
              <span className="font-mono text-[10px] text-secondary bg-black/5 px-2 py-0.5 rounded border border-black/10">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent garden notes ───────────────────────────────────────── */}
      {recentNotes.length > 0 && (
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">recent notes</p>
            <Link href="/garden" className="font-mono text-[11px] text-secondary no-underline hover:text-primary transition-colors">
              full garden →
            </Link>
          </div>
          <div>
            {recentNotes.map((note, i) => (
              <Link
                key={note.slug}
                href={`/garden/${note.slug}`}
                className={`grid grid-cols-[80px_1fr_auto] items-start gap-5 py-3.5 no-underline
                  border-b border-black/10 hover:text-primary group
                  ${i === 0 ? 'border-t border-black/10' : ''}`}
              >
                <span className="font-mono text-[11px] text-secondary opacity-70 pt-0.5 leading-relaxed">
                  {format(note.date, 'MMM d')}<br />{format(note.date, 'yyyy')}
                </span>
                <div>
                  <p className="text-[15px] font-medium text-secondary group-hover:text-primary mb-1 leading-snug transition-colors">
                    {note.frontmatter.q}
                  </p>
                  <StageEmoji stage={note.frontmatter.stage} variant="label" />
                </div>
                <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded border whitespace-nowrap self-start`} style={{ color: '#2b5a1d', borderColor: '#2b5a1d' }}>
                  {note.frontmatter.tags?.[0]}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Selected work preview ─────────────────────────────────────── */}
      {projects.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">selected work</p>
            <Link href="/work" className="font-mono text-[11px] text-secondary no-underline hover:text-primary transition-colors">
              all projects →
            </Link>
          </div>
          <div className="space-y-3">
            {projects.map(project => (
              <div key={project.slug} className="border border-black/10 rounded-xl p-5 grid grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                  <p className="text-[15px] font-medium text-primary mb-1">{project.frontmatter.name}</p>
                  <p className="text-[13px] text-secondary leading-relaxed mb-3 max-w-lg">
                    {project.frontmatter.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.frontmatter.stack.slice(0, 4).map(s => (
                      <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="font-serif text-[13px] text-primary italic mt-3 pl-3 border-l-2 border-black/20 leading-snug">
                    "{project.frontmatter.reflection}"
                  </p>
                </div>
                <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded border whitespace-nowrap self-start ${project.frontmatter.status === 'in-progress'
                    ? 'border-teal-600 text-teal-600'
                    : 'border-blue-500/50 text-blue-600'
                  }`}>
                  {project.frontmatter.status === 'in-progress' ? 'in progress' : 'shipped'}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
