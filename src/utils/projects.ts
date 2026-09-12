export interface AdminProject {
  id: number
  title: string
  description: string
  technologies: string[]
  demoLink?: string        // ← optionnel
  repoLink?: string        // ← optionnel
  type: "mobile" | "fullstack" | "frontend" | "backend"
  image?: string
  statut?: "En cours" | "Terminé" | "Archivé" | "En ligne"  // ← ajouté
  role?: string
}

const STORAGE_KEY = "portfolio_projects_v1"

export function loadProjects(): AdminProject[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : [] }
  catch { return [] }
}

export function saveProjects(projects: AdminProject[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}
