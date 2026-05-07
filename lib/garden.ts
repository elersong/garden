import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Note, Thread, NoteFrontmatter, ThreadStatus } from './types'
import { DAY_IN_MILLISECONDS, DORMANT_THRESHOLD_DAYS } from './constants'

const GARDEN_DIR = path.join(process.cwd(), 'content/garden')

// Static File Reading
// ────────────────────────────────────────────────────────────────

export function getAllNotes(): Note[] {
  if (!fs.existsSync(GARDEN_DIR)) return []

  const files = fs.readdirSync(GARDEN_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map((filename): Note => {
      const slug = filename.replace(/\.mdx$/, '')
      return { slug, ...collectNoteData(path.join(GARDEN_DIR, filename)) }
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

export function getNoteBySlug(slug: string): Note | null {
  const filePath = path.join(GARDEN_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  return { slug, ...collectNoteData(filePath) }
}

function collectNoteData(path: string): Omit<Note, 'slug'> {
  const raw = fs.readFileSync(path, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as NoteFrontmatter
  const stat = fs.statSync(path)

  // Get the date: prefer frontmatter date, fall back to file mtime
  const date = frontmatter.date ? new Date(frontmatter.date) : stat.mtime
  return { frontmatter, date, content }
}

// Thread Building
// ────────────────────────────────────────────────────────────────

export function getAllThreads(): Thread[] {
  const notes = getAllNotes()

  // Group notes by thread ID — skip standalone notes (no thread field)
  const threadMap = new Map<string, Note[]>()
  for (const note of notes) {
    const threadId = note.frontmatter.thread
    if (!threadId) continue
    if (!threadMap.has(threadId)) threadMap.set(threadId, [])
    threadMap.get(threadId)!.push(note)
  }

  const threads: Thread[] = []

  for (const [id, unsortedNotes] of threadMap) {
    
    const threadNotes = moveOriginToFront(unsortedNotes)

    // Notes are already sorted oldest to newest from getAllNotes()
    const origin =  threadNotes[0]
    const latest =  threadNotes[threadNotes.length - 1]

    const daysSinceLastNote = Math.floor(
      (Date.now() - latest.date.getTime()) / DAY_IN_MILLISECONDS
    )

    // Dormancy: calculated from threshold, overridden by explicit status field
    const hasManualOverride = threadNotes.some(n => n.frontmatter.status === 'active')
    const status: ThreadStatus =
      hasManualOverride || daysSinceLastNote <= DORMANT_THRESHOLD_DAYS
        ? 'active'
        : 'dormant'

    threads.push({
      id,
      notes: threadNotes,
      origin,
      latest,
      status,
      stage: origin.frontmatter.stage,
      tags: origin.frontmatter.tags ?? [],
      daysSinceLastNote,
    })
  }

  // Sort threads: active first, then by most recently updated
  return threads.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'active' ? -1 : 1
    return b.latest.date.getTime() - a.latest.date.getTime()
  })
}

function moveOriginToFront(threadNotes: Note[]): Note[] {
  const origin = threadNotes.find(note => note.frontmatter.isOrigin === true)
  if (!origin) return threadNotes
  return [origin, ...threadNotes.filter(note => note !== origin)]
}

export function getThreadById(id: string): Thread | null {
  const threads = getAllThreads()
  return threads.find(thread => thread.id === id) ?? null
}

// Standalone notes
// ────────────────────────────────────────────────────────────────

// Notes that don't belong to any thread
export function getStandaloneNotes(): Note[] {
  const notes = getAllNotes()
  return notes
    .filter(n => !n.frontmatter.thread)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

// Homepage helpers
// ────────────────────────────────────────────────────────────────

// Returns the 3 most recently updated notes our of all notes
export function getRecentNotes(count = 3): Note[] {
  const notes = getAllNotes()
  return [...notes]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, count)
}

// Returns the active thread with the most recent activity
export function getMostRecentActiveThread(): Thread | null {
  const threads = getAllThreads()
  return threads.find(thread => thread.status === 'active') ?? null
}

// Static path generation
// ────────────────────────────────────────────────────────────────

export function getAllNoteSlugs(): string[] {
  if (!fs.existsSync(GARDEN_DIR)) return []
  return fs
    .readdirSync(GARDEN_DIR)
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => filename.replace(/\.mdx$/, ''))
}
