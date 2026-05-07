'use client'

import { Book } from "@/lib/types"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function BookShelf({ allBooks }: { allBooks: Book[] }) {
  const [showBooks, setShowBooks] = useState(false)
  const [booksToShow, setBooksToShow] = useState<Book[]>([])

  useEffect(() => {
    setBooksToShow(showBooks ? allBooks : allBooks.slice(0, 3))
  }, [showBooks, allBooks])

  const bookStatusColors = {
    'unstarted': '#8f8f8f',
    'unfinished': '#FF990a',
    'in progress': '#0070f3',
    'finished': '#2b5a1d',
  }

  return (
    <>
      {booksToShow.length > 0 && (
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">my bookshelf</p>
            <button
              onClick={() => setShowBooks(prev => !prev)}
              className="font-mono text-[11px] text-secondary no-underline hover:text-primary transition-colors">
              {showBooks ? 'show less ↑' : 'full books list ↓'}
            </button>
          </div>
          <div>
            {booksToShow.map((book, i) => (
              <Link
                key={i}
                href={``}
                className={`grid grid-cols-[1fr_auto] items-start gap-5 py-3.5 no-underline
                      border-b border-black/10 hover:text-primary group
                      ${i === 0 ? 'border-t border-black/10' : ''}`}
              >
                <div>
                  <p className="text-[15px] font-medium text-secondary group-hover:text-primary mb-1 leading-snug transition-colors">
                    {book.frontmatter.title}
                  </p>
                  <p className="font-mono text-[11px] text-secondary mb-1.5">{book.frontmatter.author}</p>
                  <p className="text-[13px] text-secondary italic leading-relaxed mb-2.5 max-w-xlg">
                    "{book.frontmatter.oneliner}"
                  </p>
                </div>
                <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded border whitespace-nowrap self-start`} style={{ color: bookStatusColors[book.frontmatter.status || 'unstarted'], borderColor: bookStatusColors[book.frontmatter.status || 'unstarted'] }}>
                  {book.frontmatter.status}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}