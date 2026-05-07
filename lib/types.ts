// Base types
// ────────────────────────────────────────────────────────────────


// Garden types
// ────────────────────────────────────────────────────────────────

export type Stage = 'seedling' | 'growing' | 'evergreen'

export type ThreadStatus = 'active' | 'dormant'

export interface DroppedBranch {
  q: string
  why: string
}

export interface NoteFrontmatter {
  // The question this note is asking — also serves as the title
  q: string
  // Which thread this note belongs to (omit for standalone notes)
  thread?: string
  // Growth stage
  stage: Stage
  // Dropped branches from within this note
  dropped?: DroppedBranch[]
  // Manual status override — pins thread as active regardless of date
  status?: 'active'
  // ISO date string — injected from filename or git if not present
  date?: string
  tags?: string[]
  isOrigin?: boolean
}

export interface Note {
  slug: string
  frontmatter: NoteFrontmatter
  // Resolved date as JS Date object
  date: Date
  // Raw MDX content (body only, frontmatter stripped)
  content: string
}

export interface Thread {
  id: string
  // All notes in this thread, sorted oldest → newest
  notes: Note[]
  // The first note in the thread
  origin: Note
  // The most recently updated note
  latest: Note
  // Computed: active if latest note < 30 days ago, or status override present
  status: ThreadStatus
  // Stage comes from the origin note
  stage: Stage
  // Tags from origin note
  tags: string[]
  // How many days since the last note
  daysSinceLastNote: number
}

// Work types
// ────────────────────────────────────────────────────────────────

export type ProjectStatus = 'in-progress' | 'shipped' | 'archived'

export interface ProjectFrontmatter {
  name: string
  tagline: string
  stack: string[]
  status: ProjectStatus
  learned: string
  reflection: string
  github?: string
  thread?: string   // slug of a related garden thread
  order?: number    // display order on the works page
  link?: string     // link to the project
}

export interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
  content: string
}

// Book types
// ────────────────────────────────────────────────────────────────

export type BookStatus = 'unstarted' | 'unfinished' | 'in progress' | 'finished'

export interface BookFrontmatter {
  title: string
  author: string | string[]
  date?: string
  oneliner: string
  status?: BookStatus
}

export interface Book {
  frontmatter: BookFrontmatter
  content: string
}

// Other types
// ────────────────────────────────────────────────────────────────

type SkillItem = { name: string; stage: string }
type LinkItem = { label: string; href: string }

export type AboutFrontmatter = {
  skills: Record<string, SkillItem[]>
  links: LinkItem[]
}