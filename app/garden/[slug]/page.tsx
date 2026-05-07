import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  getNoteBySlug,
  getAllNoteSlugs,
  getThreadById,
} from '@/lib/garden'
import ThreadTOC from '@/components/ThreadTOC'
import DroppedBranches from '@/components/DroppedBranch'
import StageEmoji from '@/components/StageEmoji'
import Link from 'next/link'
import { format } from 'date-fns'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllNoteSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = getNoteBySlug(slug)
  if (!note) return {}
  return { title: note.frontmatter.q }
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params
  const note = getNoteBySlug(slug)
  if (!note) notFound()

  const { frontmatter, content, date } = note
  const thread = frontmatter.thread ? getThreadById(frontmatter.thread) : null
  const isOrigin = thread?.origin.slug === slug
  const noteIndex = thread?.notes.findIndex(n => n.slug === slug) ?? -1

  // For active (non-origin) notes: find immediate parent and origin
  const parentNote = !isOrigin && noteIndex > 0 ? thread?.notes[noteIndex - 1] : null
  const originNote = !isOrigin ? thread?.origin : null

  return (
    <article>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 font-mono text-[11px] text-secondary mb-6">
        <Link href="/garden" className="text-secondary hover:text-primary no-underline transition-colors">
          /garden
        </Link>
        {thread && (
          <>
            <span className="opacity-40">/</span>
            <Link
              href={`/garden/${thread.origin.slug}`}
              className="text-secondary hover:text-primary no-underline transition-colors"
            >
              {thread.id.replace(/-/g, ' ')}
            </Link>
          </>
        )}
      </div>

      {/* Question label */}
      <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-2">
        {isOrigin ? 'origin question' : 'currently asking'}
      </p>

      {/* The question */}
      <h1 className="font-serif text-[26px] leading-[1.45] text-primary mb-6 max-w-2xl font-normal">
        {frontmatter.q}
      </h1>

      {/* Meta row */}
      <div className="flex items-center gap-2.5 mb-3 flex-wrap">
        {isOrigin && (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-blue-500/40 text-blue-600">
            origin
          </span>
        )}
        {frontmatter.tags?.map(tag => (
          <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded border border-black/10 text-secondary">
            {tag}
          </span>
        ))}
        <span className="font-mono text-[10px] text-secondary opacity-60">
          {format(date, 'MMM d, yyyy')}
        </span>
      </div>

      {/* Stage */}
      <StageEmoji stage={frontmatter.stage} variant="full" className="mb-7" />

      {/* Thread TOC — only on origin note */}
      {isOrigin && thread && thread.notes.length > 1 && (
        <ThreadTOC
          notes={thread.notes}
          currentSlug={slug}
          threadId={thread.id}
        />
      )}

      {/* Thread context bar — only on non-origin notes */}
      {!isOrigin && (originNote || parentNote) && (
        <div className="bg-secondary rounded-lg p-3 mb-7">
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-2">
            thread context
          </p>
          <div className="flex flex-col gap-1.5">
            {originNote && (
              <Link
                href={`/garden/${originNote.slug}`}
                className="flex items-start gap-2 text-[12px] text-secondary italic no-underline hover:text-primary transition-colors"
              >
                <span className="font-mono text-[10px] text-secondary opacity-50 flex-shrink-0 pt-0.5 min-w-[40px]">
                  origin
                </span>
                <span>{originNote.frontmatter.q}</span>
              </Link>
            )}
            {parentNote && parentNote.slug !== originNote?.slug && (
              <Link
                href={`/garden/${parentNote.slug}`}
                className="flex items-start gap-2 text-[12px] text-secondary italic no-underline hover:text-primary transition-colors"
              >
                <span className="font-mono text-[10px] text-secondary opacity-50 flex-shrink-0 pt-0.5 min-w-[40px]">
                  parent
                </span>
                <span>{parentNote.frontmatter.q}</span>
              </Link>
            )}
          </div>
        </div>
      )}

      <hr className="border-none border-t border-black/10 my-7" />

      {/* Note body */}
      <div className="garden-prose prose">
        <MDXRemote source={content} />
      </div>

      {/* Dropped branches */}
      {frontmatter.dropped && frontmatter.dropped.length > 0 && (
        <DroppedBranches branches={frontmatter.dropped} />
      )}
    </article>
  )
}
