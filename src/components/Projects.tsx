import { useState } from "react"
import { Github, ExternalLink, Smartphone, Globe, Layout } from "lucide-react"
import Title from "./Title"

import img1 from '../assets/projects/YOWL.png'
import Trelloclone from '../assets/projects/Trello Clone.jpg'
import img4 from '../assets/projects/4.png'
import img6 from '../assets/projects/6.png'
import rotten from '../assets/projects/rotten.png'
import rottenweb from '../assets/projects/rottenweb.png'

export interface Project {
  id: number | string
  title: string
  description: string
  technologies: string[]
  demoLink?: string
  repoLink?: string
  image?: string
  type?: "mobile" | "fullstack" | "frontend" | "backend"
}

const STATIC_PROJECTS: Project[] = [
  { id:1, title:"Plateforme de commentaires YOWL", description:"Application web permettant aux utilisateurs de commenter tout type de contenu sur internet avec système de modération et notation.", technologies:["Laravel","Vue.js","MySQL"], demoLink:"https://www.figma.com/design/my1EaSCuzlk87Mfn4Je5PF/YOWL-With-white-theme?node-id=0-1", repoLink:"https://github.com/toumaniaboubacarbamba/YOWL", image:img1, type:"fullstack" },
  { id:3, title:"Application mobile Trello", description:"Application mobile interagissant avec l'API Trello pour gérer vos tableaux et tâches depuis votre smartphone.", technologies:["React Native","Trello API","Expo"], image:Trelloclone, type:"mobile" },
  { id:4, title:"MyShowTime — Billetterie événementielle", description:"Système complet de publication et réservation de tickets d'événements avec paiement en ligne et gestion des places.", technologies:["React","NestJS","MongoDB"], demoLink:"https://my-show-time.onrender.com/", repoLink:"https://github.com/toumaniaboubacarbamba/myshowtime", image:img4, type:"fullstack" },
  { id:5, title:"RottenTomatoes Web", description:"Plateforme similaire à AlloCiné avec fiches films, critiques, notations et système de recommandations.", technologies:["Next.js","MongoDB","TypeScript"], demoLink:"https://rottentomatos.onrender.com/", repoLink:"https://github.com/toumaniaboubacarbamba/RottenTomatos", image:rottenweb, type:"fullstack" },
  { id:6, title:"FreeAds — Annonces classées", description:"Marketplace d'annonces en ligne avec système de recherche, messagerie et gestion des utilisateurs.", technologies:["Laravel","MySQL","JavaScript"], image:img6, type:"fullstack" },
  { id:7, title:"Rotten Tomatoes Mobile", description:"Version mobile de la plateforme de films avec authentification, favoris, recherche et catégories. Architecture MVVM avec Flutter.", technologies:["Flutter","Dart","dio","TMDB API","Laravel API"], repoLink:"https://github.com/toumaniaboubacarbamba/rotten_tomatoes_mob", image:rotten, type:"mobile" },
]

const STORAGE_KEY = "portfolio_projects_v1"
function getAdminProjects(): Project[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : [] }
  catch { return [] }
}

type TypeKey = "mobile" | "fullstack" | "frontend" | "backend"
interface TypeConfig { label: string; color: string; icon: React.ReactNode }

import React from "react"

const typeConfig: Record<TypeKey, TypeConfig> = {
  mobile:    { label:"Mobile",    color:"var(--purple)",  icon:<Smartphone size={11}/> },
  fullstack: { label:"Fullstack", color:"var(--accent2)", icon:<Globe size={11}/> },
  frontend:  { label:"Frontend",  color:"var(--accent)",  icon:<Layout size={11}/> },
  backend:   { label:"Backend",   color:"#f97316",        icon:<Globe size={11}/> },
}

const FILTERS = ["tous","mobile","fullstack","frontend"]

const Projects = ({ refreshKey=0 }: { refreshKey?: number }) => {
  void refreshKey
  const [activeFilter, setActiveFilter] = useState("tous")
  const allProjects = [...getAdminProjects(), ...STATIC_PROJECTS]
  const filtered = activeFilter === "tous" ? allProjects : allProjects.filter(p => p.type === activeFilter)

  return (
    <section id="Projects" style={{ padding:"7rem 0" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"2rem", flexWrap:"wrap", gap:"1.5rem" }}>
        <Title title="Mes Projets" sub="projects" />
        <div style={{ display:"flex", gap:".5rem", flexWrap:"wrap" }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              fontFamily:"var(--mono)", fontSize:".68rem", padding:".3rem .85rem",
              border:`1px solid ${activeFilter===f?"var(--accent)":"var(--border)"}`,
              borderRadius:"4px",
              background:activeFilter===f?"rgba(79,255,176,.07)":"transparent",
              color:activeFilter===f?"var(--accent)":"var(--muted2)",
              cursor:"pointer", textTransform:"uppercase", letterSpacing:".08em", transition:"all .2s"
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(310px, 1fr))", gap:"1.4rem" }}>
        {filtered.length===0 ? (
          <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"4rem", border:"1px dashed var(--border)", borderRadius:"var(--r-md)", fontFamily:"var(--mono)", fontSize:".82rem", color:"var(--muted)" }}>// Aucun projet dans cette catégorie.</div>
        ) : filtered.map(project => {
          const tc = typeConfig[(project.type as TypeKey) || "fullstack"] ?? typeConfig.fullstack
          return (
            <div key={project.id} style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--r-md)", overflow:"hidden", transition:"all .25s", display:"flex", flexDirection:"column" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--border2)";e.currentTarget.style.transform="translateY(-3px)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform="translateY(0)"}}
            >
              {project.image && (
                <div style={{ position:"relative", overflow:"hidden", height:200 }}>
                  <img src={project.image as string} alt={project.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 50%, rgba(14,18,25,.7))" }} />
                  <div style={{ position:"absolute", top:10, left:10, display:"flex", alignItems:"center", gap:".3rem", background:"rgba(7,9,14,.82)", backdropFilter:"blur(6px)", border:`1px solid ${tc.color}40`, borderRadius:"4px", padding:".2rem .6rem", fontFamily:"var(--mono)", fontSize:".62rem", color:tc.color, letterSpacing:".08em", textTransform:"uppercase" }}>
                    {tc.icon} {tc.label}
                  </div>
                </div>
              )}
              <div style={{ padding:"1.3rem 1.4rem", flex:1, display:"flex", flexDirection:"column" }}>
                <h3 style={{ fontSize:".97rem", fontWeight:700, marginBottom:".5rem", color:"var(--text)", lineHeight:1.3 }}>{project.title}</h3>
                <p style={{ fontSize:".82rem", color:"var(--muted2)", lineHeight:1.65, marginBottom:"1rem", flex:1 }}>{project.description}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".35rem", marginBottom:"1.2rem" }}>
                  {project.technologies.map(t=>(
                    <span key={t} style={{ fontFamily:"var(--mono)", fontSize:".62rem", padding:".2rem .5rem", background:"rgba(255,255,255,.04)", border:"1px solid var(--border)", borderRadius:"3px", color:"var(--muted2)" }}>{t}</span>
                  ))}
                </div>
                <div style={{ display:"flex", gap:".8rem" }}>
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:".4rem", flex:1, justifyContent:"center", padding:".6rem", borderRadius:"var(--r-sm)", background:"var(--accent)", color:"#07090E", fontFamily:"var(--font)", fontWeight:700, fontSize:".8rem", textDecoration:"none", transition:"background .2s" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="#3DFFA0")}
                      onMouseLeave={e=>(e.currentTarget.style.background="var(--accent)")}
                    ><ExternalLink size={13}/> Demo</a>
                  )}
                  {project.repoLink && (
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:".4rem", padding:".6rem 1rem", borderRadius:"var(--r-sm)", border:"1px solid var(--border2)", background:"transparent", color:"var(--muted2)", fontFamily:"var(--font)", fontWeight:600, fontSize:".8rem", textDecoration:"none", transition:"all .2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.color="var(--accent)"}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border2)";e.currentTarget.style.color="var(--muted2)"}}
                    ><Github size={13}/></a>
                  )}
                  {!project.demoLink && !project.repoLink && (
                    <span style={{ fontFamily:"var(--mono)", fontSize:".7rem", color:"var(--muted)", padding:".4rem 0" }}>// bientôt en ligne</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Projects
