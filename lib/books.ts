import { Book, BookFrontmatter } from "./types"
import matter from "gray-matter"
import fs from "fs"
import path from "path"

const BOOKS_DIR = path.join(process.cwd(), "content/now/books")

// Book Helpers
// ────────────────────────────────────────────────────────────────

function collectBookData(path: string): Book {
    const raw = fs.readFileSync(path, 'utf-8')
    const { data, content } = matter(raw)
    const frontmatter = data as BookFrontmatter
    return { frontmatter, content }
}

export function getAllBooks(): Book[] {
  if (!fs.existsSync(BOOKS_DIR)) return []

  const bookFiles = fs.readdirSync(BOOKS_DIR).filter(filename => filename.endsWith('.book.mdx'))

  return bookFiles.map((bookFileName) => {
    return collectBookData(path.join(BOOKS_DIR, bookFileName))
  })
}