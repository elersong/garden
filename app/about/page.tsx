import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { StageLegend } from '@/components/StageEmoji'
import { AboutFrontmatter } from '@/lib/types'
import Image from 'next/image'

export const metadata: Metadata = { title: 'About' }

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), 'content', 'about.mdx')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const { skills, links } = data as AboutFrontmatter

  return (
    <div>
      <p className="font-serif text-[22px] text-primary mb-8">/about</p>

      <div className="grid grid-cols-[1fr_180px] gap-12 items-start">
        {/* Prose */}
        <div className="prose prose-sm text-secondary leading-[1.75] space-y-4">
          <MDXRemote source={content} />
        </div>

        {/* Sidebar */}
        <div>
          {/* Photo */}
          <div className="w-full aspect-square rounded-xl border border-black/10 bg-secondary flex items-center justify-center mb-2.5 overflow-hidden">
            {/* Replace with: <Image src="/photo.jpg" alt="Grey" fill className="object-cover" /> */}
            
            <Image src="/Grey.png" alt="Grey" width={903} height={809} className="object-cover" />
          </div>

          <p className="font-mono text-[10px] text-secondary opacity-70 mb-6">
            layton city, ut
          </p>

          {/* Skills */}
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="mb-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-2">
                {category}
              </p>
              <div>
                {items.map((item, i) => (
                  <div
                    key={item.name}
                    className={`flex items-center gap-1.5 py-1 text-[12px] text-secondary
                      ${i < items.length - 1 ? 'border-b border-black/10' : ''}`}
                  >
                    <span className="text-[11px] leading-none">{item.stage}</span>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <StageLegend className="mb-5" />

          <hr className="border-none border-t border-black/10 mb-5" />

          {/* External links */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-2">
              elsewhere
            </p>
            <div className="flex flex-col gap-1.5">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-mono text-[11px] text-secondary no-underline hover:text-primary transition-colors flex items-center gap-1"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="opacity-40 text-[10px]">→</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}