import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Project, ProjectFrontmatter } from './types'

const WORK_DIR = path.join(process.cwd(), 'content/work')

export function getAllProjects(): Project[] {
  if (!fs.existsSync(WORK_DIR)) return []

  const files = fs.readdirSync(WORK_DIR).filter(filename => filename.endsWith('.mdx'))

  return files
    .map((filename): Project => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(WORK_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      return { slug, frontmatter: data as ProjectFrontmatter, content }
    })
    .sort((a, b) => (a.frontmatter.order ?? 99999) - (b.frontmatter.order ?? 99999))
}
