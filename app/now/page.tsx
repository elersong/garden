import { getAllBooks } from '@/lib/books'
import type { Metadata } from 'next'
import BookShelf from './BookShelf'
import { nowData } from '@/content/now/data'

export const metadata: Metadata = { title: 'Now' }
const allBooks = getAllBooks().sort((a,_) => a.frontmatter.status === 'in progress' ? -1 : 0);

export default function NowPage() {
  

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <p className="font-serif text-[22px] text-primary">/now</p>
        <span className="font-mono text-[10px] text-secondary opacity-60">
          updated {nowData.updated}
        </span>
      </div>
      <p className="text-[14px] text-secondary leading-relaxed max-w-lg mb-8">
        What I'm actually focused on right now. Not a highlight reel.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-10">
        {nowData.cards.map(({ label, content, tag }) => (
          <div key={label} className="bg-secondary rounded-xl p-4">
            <p className="font-mono text-[11px] text-secondary mb-2 tracking-wide">{label}</p>
            <p className="text-[14px] text-primary leading-relaxed mb-2.5">{content}</p>
            <span className="font-mono text-[10px] text-secondary bg-black/5 px-2 py-0.5 rounded border border-black/10">
              {tag}
            </span>
          </div>
        ))}
      </div>

      <BookShelf allBooks={allBooks} />
    </div>
  )
}
