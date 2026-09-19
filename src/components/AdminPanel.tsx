import { useState, useRef } from "react"
import { X, Plus, Trash2, Lock, Upload, Image, Pencil, Check, ChevronDown, ChevronUp } from "lucide-react"
import type { AdminProject } from "../utils/projects"
import { loadProjects, saveProjects } from "../utils/projects"
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string
const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY as string

interface AdminPanelProps {
  onClose: () => void
  onProjectsChange: () => void
}

const STATUTS = ["En cours", "Terminé", "Archivé"] as const
const ROLES = ["Développeur Fullstack", "Développeur Backend", "Développeur Mobile", "Contributeur"]
const TYPES = ["mobile", "fullstack", "frontend", "backend"] as const

const STATUT_COLOR: Record<string, string> = {
  "En cours": "var(--accent2)",
  "Terminé":  "var(--accent)",
  "Archivé":  "var(--muted)",
}

// ─── STYLES COMMUNS ──────────────────────────────────────────────
const inputStyle = {
  background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"var(--r-sm)",
  padding:".65rem 1rem", color:"var(--text)", fontFamily:"var(--font)", fontSize:".88rem",
  outline:"none", width:"100%", transition:"border-color .2s"
}
const labelStyle = {
  fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--muted2)",
  letterSpacing:".08em", textTransform:"uppercase" as const
}
const onFocus = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
  (e.currentTarget.style.borderColor = "var(--accent)")
const onBlur = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
  (e.currentTarget.style.borderColor = "var(--border)")

// ─── LOGIN ───────────────────────────────────────────────────────
const Login = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pwd, setPwd] = useState("")
  const [error, setError] = useState(false)
  const check = () => {
    if (pwd === ADMIN_PASSWORD) { onSuccess() }
    else { setError(true); setPwd("") }
  }
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:"2.5rem", width:"100%", maxWidth:380 }}>
        <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:".5rem" }}>
          <Lock size={16} color="var(--accent)" />
          <h2 style={{ fontSize:"1.1rem", fontWeight:700 }}>Admin Panel</h2>
        </div>
        <p style={{ fontFamily:"var(--mono)", fontSize:".72rem", color:"var(--muted2)", marginBottom:"2rem" }}>// accès réservé</p>
        <div style={{ display:"flex", flexDirection:"column", gap:".4rem", marginBottom:"1.2rem" }}>
          <label style={labelStyle}>Mot de passe</label>
          <input type="password" value={pwd} autoFocus
            onChange={e => { setPwd(e.target.value); setError(false) }}
            onKeyDown={e => e.key === "Enter" && check()}
            placeholder="••••••••"
            style={{ ...inputStyle, border:`1px solid ${error?"var(--danger)":"var(--border)"}` }}
          />
          {error && <span style={{ fontFamily:"var(--mono)", fontSize:".72rem", color:"var(--danger)" }}>Mot de passe incorrect</span>}
        </div>
        <button onClick={check} style={{ width:"100%", background:"var(--accent)", color:"#07090E", border:"none", borderRadius:"var(--r-sm)", padding:".72rem", fontFamily:"var(--font)", fontWeight:700, fontSize:".88rem", cursor:"pointer" }}
          onMouseEnter={e=>(e.currentTarget.style.background="#3DFFA0")}
          onMouseLeave={e=>(e.currentTarget.style.background="var(--accent)")}
        >Entrer</button>
      </div>
    </div>
  )
}

// ─── FORM FIELDS (partagé Add + Edit) ────────────────────────────
interface FormState {
  title: string; description: string; technologies: string
  demoLink: string; repoLink: string
  type: AdminProject["type"]
  image: string
  statut: string; role: string
}

const emptyForm = (): FormState => ({
  title:"", description:"", technologies:"",
  demoLink:"", repoLink:"", type:"fullstack",
  image:"", statut:"En cours", role:"Développeur Fullstack"
})

const projectToForm = (p: AdminProject): FormState => ({
  title: p.title,
  description: p.description,
  technologies: p.technologies.join(", "),
  demoLink: p.demoLink || "",
  repoLink: p.repoLink || "",
  type: p.type,
  image: p.image || "",
  statut: p.statut || "En cours",
  role: p.role || "Développeur Fullstack"
})

interface FormFieldsProps {
  form: FormState
  set: (k: string, v: string) => void
  uploading: boolean
  preview: string | null
  setPreview: (v: string | null) => void
  onUpload: (file: File) => void
  msg: { text: string; ok: boolean } | null
}

const FormFields = ({ form, set, uploading, preview, setPreview, onUpload, msg }: FormFieldsProps) => {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
      {msg && (
        <div style={{ gridColumn:"1/-1", padding:".7rem 1rem", borderRadius:"var(--r-sm)", fontFamily:"var(--mono)", fontSize:".78rem", background:msg.ok?"rgba(79,255,176,.07)":"rgba(255,77,109,.07)", border:`1px solid ${msg.ok?"rgba(79,255,176,.25)":"rgba(255,77,109,.25)"}`, color:msg.ok?"var(--accent)":"var(--danger)" }}>
          {msg.text}
        </div>
      )}

      {/* Titre */}
      <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
        <label style={labelStyle}>Titre *</label>
        <input style={inputStyle} value={form.title} onChange={e=>set("title",e.target.value)} placeholder="Mon Projet" onFocus={onFocus} onBlur={onBlur}/>
      </div>

      {/* Type */}
      <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
        <label style={labelStyle}>Type *</label>
        <select style={{ ...inputStyle, cursor:"pointer" }} value={form.type} onChange={e=>set("type",e.target.value)} onFocus={onFocus} onBlur={onBlur}>
          {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
        </select>
      </div>

      {/* Statut */}
      <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
        <label style={labelStyle}>Statut</label>
        <select style={{ ...inputStyle, cursor:"pointer" }} value={form.statut} onChange={e=>set("statut",e.target.value)} onFocus={onFocus} onBlur={onBlur}>
          {STATUTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Rôle */}
      <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
        <label style={labelStyle}>Mon rôle</label>
        <select style={{ ...inputStyle, cursor:"pointer" }} value={form.role} onChange={e=>set("role",e.target.value)} onFocus={onFocus} onBlur={onBlur}>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Description */}
      <div style={{ display:"flex", flexDirection:"column", gap:".4rem", gridColumn:"1/-1" }}>
        <label style={labelStyle}>Description *</label>
        <textarea style={{ ...inputStyle, minHeight:80, resize:"vertical" }} value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Ce projet permet de…" onFocus={onFocus} onBlur={onBlur}/>
      </div>

      {/* Technologies */}
      <div style={{ display:"flex", flexDirection:"column", gap:".4rem", gridColumn:"1/-1" }}>
        <label style={labelStyle}>Technologies (séparées par des virgules)</label>
        <input style={inputStyle} value={form.technologies} onChange={e=>set("technologies",e.target.value)} placeholder="React Native, Firebase, Node.js" onFocus={onFocus} onBlur={onBlur}/>
      </div>

      {/* Upload image */}
      <div style={{ display:"flex", flexDirection:"column", gap:".6rem", gridColumn:"1/-1" }}>
        <label style={labelStyle}>Image du projet</label>
        <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
          onChange={e => { const f=e.target.files?.[0]; if(f) onUpload(f); e.target.value="" }}
        />
        <div style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
          <div onClick={() => !uploading && fileRef.current?.click()} style={{
            flex:1, border:`2px dashed ${uploading?"var(--accent)":"var(--border)"}`,
            borderRadius:"var(--r-md)", padding:"1.2rem",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            gap:".5rem", cursor:uploading?"not-allowed":"pointer", transition:"all .2s",
            background:uploading?"rgba(79,255,176,.04)":"transparent", minHeight:80
          }}
            onMouseEnter={e=>{ if(!uploading){e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.background="rgba(79,255,176,.04)"}}}
            onMouseLeave={e=>{ if(!uploading){e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="transparent"}}}
          >
            {uploading ? (
              <>
                <div style={{ width:18, height:18, border:"2px solid var(--accent)", borderTopColor:"transparent", borderRadius:"50%", animation:"spin .7s linear infinite" }}/>
                <span style={{ fontFamily:"var(--mono)", fontSize:".7rem", color:"var(--accent)" }}>Upload en cours…</span>
              </>
            ) : (
              <>
                <Upload size={18} color="var(--muted2)"/>
                <span style={{ fontFamily:"var(--mono)", fontSize:".7rem", color:"var(--muted2)", textAlign:"center" }}>
                  Clique pour choisir<br/>
                  <span style={{ color:"var(--muted)", fontSize:".62rem" }}>PNG, JPG, WEBP — max 5MB</span>
                </span>
              </>
            )}
          </div>
          {(preview || form.image) && (
            <div style={{ position:"relative", width:110, height:80, flexShrink:0 }}>
              <img src={preview || form.image} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"var(--r-sm)", border:"1px solid var(--border)" }}/>
              {form.image && !uploading && (
                <div style={{ position:"absolute", bottom:3, right:3, background:"rgba(79,255,176,.9)", borderRadius:"3px", padding:"1px 4px" }}>
                  <Image size={9} color="#07090E"/>
                </div>
              )}
              <button onClick={e=>{e.stopPropagation(); if(preview?.startsWith("blob:")) URL.revokeObjectURL(preview!); setPreview(null); set("image","")}} style={{ position:"absolute", top:-6, right:-6, width:17, height:17, background:"var(--danger)", border:"none", borderRadius:"50%", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>✕</button>
            </div>
          )}
        </div>
        <input style={inputStyle} type="url" value={form.image}
          onChange={e=>{ set("image",e.target.value); if(e.target.value) setPreview(null) }}
          placeholder="Ou colle un lien image (https://i.ibb.co/…)"
          onFocus={onFocus} onBlur={onBlur}
        />
      </div>

      {/* Liens */}
      <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
        <label style={labelStyle}>Lien démo</label>
        <input style={inputStyle} type="url" value={form.demoLink} onChange={e=>set("demoLink",e.target.value)} placeholder="https://…" onFocus={onFocus} onBlur={onBlur}/>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
        <label style={labelStyle}>Lien GitHub</label>
        <input style={inputStyle} type="url" value={form.repoLink} onChange={e=>set("repoLink",e.target.value)} placeholder="https://github.com/…" onFocus={onFocus} onBlur={onBlur}/>
      </div>

      
    </div>
  )
}

// ─── ADD FORM ────────────────────────────────────────────────────
const AddForm = ({ onAdded }: { onAdded: () => void }) => {
  const [form, setForm] = useState<FormState>(emptyForm())
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) { setMsg({ text:"Image trop lourde — max 5MB.", ok:false }); return }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setUploading(true); setMsg(null)
    try {
      const fd = new FormData(); fd.append("image", file)
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method:"POST", body:fd })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data?.success && data?.data?.display_url) {
        set("image", data.data.display_url)
        setMsg({ text:"✓ Image uploadée !", ok:true })
      } else throw new Error(data?.error?.message || "Réponse invalide")
    } catch (err) {
      URL.revokeObjectURL(objectUrl); setPreview(null)
      setMsg({ text:err instanceof Error ? `Erreur : ${err.message}` : "Erreur upload", ok:false })
    } finally { setUploading(false) }
  }

  const submit = () => {
    if (!form.title.trim() || !form.description.trim()) { setMsg({ text:"Remplis au moins le titre et la description.", ok:false }); return }
    const projects = loadProjects()
    const p: AdminProject = {
      id: Date.now(), title:form.title.trim(), description:form.description.trim(),
      technologies:form.technologies.split(",").map(s=>s.trim()).filter(Boolean),
      demoLink:form.demoLink.trim(), repoLink:form.repoLink.trim(),
      type:form.type as AdminProject["type"],
      image:form.image.trim(),
      statut:form.statut as AdminProject["statut"],
      role:form.role
    }
    saveProjects([p, ...projects])
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview)
    setForm(emptyForm()); setPreview(null)
    setMsg({ text:"✓ Projet publié !", ok:true })
    onAdded()
    setTimeout(() => setMsg(null), 3500)
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
      <FormFields form={form} set={set} uploading={uploading} preview={preview} setPreview={setPreview} onUpload={handleUpload} msg={msg}/>
      <button onClick={submit} disabled={uploading} style={{ background:uploading?"var(--border2)":"var(--accent)", color:"#07090E", border:"none", borderRadius:"var(--r-sm)", padding:".8rem", fontFamily:"var(--font)", fontWeight:700, fontSize:".9rem", cursor:uploading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:".5rem", transition:"background .2s" }}
        onMouseEnter={e=>{ if(!uploading) e.currentTarget.style.background="#3DFFA0" }}
        onMouseLeave={e=>{ if(!uploading) e.currentTarget.style.background="var(--accent)" }}
      ><Plus size={16}/> Publier le projet</button>
    </div>
  )
}

// ─── EDIT CARD ───────────────────────────────────────────────────
const EditCard = ({ project, onSave, onDelete }: { project: AdminProject; onSave: (p: AdminProject) => void; onDelete: (id: number) => void }) => {
  const [open, setOpen] = useState(false)
  const [form, setFormState] = useState<FormState>(projectToForm(project))
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const set = (k: string, v: string) => setFormState(f => ({ ...f, [k]: v }))

  const handleUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) { setMsg({ text:"Max 5MB.", ok:false }); return }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl); setUploading(true); setMsg(null)
    try {
      const fd = new FormData(); fd.append("image", file)
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method:"POST", body:fd })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data?.success && data?.data?.display_url) { set("image", data.data.display_url); setMsg({ text:"✓ Image mise à jour !", ok:true }) }
      else throw new Error(data?.error?.message || "Réponse invalide")
    } catch (err) {
      URL.revokeObjectURL(objectUrl); setPreview(null)
      setMsg({ text:err instanceof Error ? `Erreur : ${err.message}` : "Erreur upload", ok:false })
    } finally { setUploading(false) }
  }

  const save = () => {
    if (!form.title.trim() || !form.description.trim()) { setMsg({ text:"Titre et description requis.", ok:false }); return }
    const updated: AdminProject = {
      ...project,
      title:form.title.trim(), description:form.description.trim(),
      technologies:form.technologies.split(",").map(s=>s.trim()).filter(Boolean),
      demoLink:form.demoLink.trim(), repoLink:form.repoLink.trim(),
      type:form.type as AdminProject["type"],
      image:form.image.trim(),
      statut:form.statut as AdminProject["statut"],
      role:form.role
    }
    onSave(updated)
    setMsg({ text:"✓ Modifications sauvegardées !", ok:true })
    setTimeout(() => { setMsg(null); setOpen(false) }, 2000)
  }

  const statutColor = STATUT_COLOR[project.statut || "En cours"] || "var(--muted)"

  return (
    <div style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"var(--r-md)", overflow:"hidden", transition:"border-color .2s" }}>
      {/* Header cliquable */}
      <div style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"1rem 1.2rem", cursor:"pointer" }} onClick={() => setOpen(o=>!o)}>
        {(project.image) && (
          <img src={project.image} alt={project.title} style={{ width:52, height:42, objectFit:"cover", borderRadius:"var(--r-sm)", border:"1px solid var(--border)", flexShrink:0 }}/>
        )}
        {!project.image && (
          <div style={{ width:52, height:42, borderRadius:"var(--r-sm)", border:"1px dashed var(--border)", background:"var(--bg)", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Image size={14} color="var(--muted)"/>
          </div>
        )}

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:".2rem" }}>
            <span style={{ fontFamily:"var(--mono)", fontSize:".62rem", color:"var(--accent)", textTransform:"uppercase", letterSpacing:".08em" }}>{project.type}</span>
            {project.statut && (
              <span style={{ fontFamily:"var(--mono)", fontSize:".6rem", padding:".1rem .45rem", borderRadius:"3px", border:`1px solid ${statutColor}40`, color:statutColor }}>{project.statut}</span>
            )}
          </div>
          <h4 style={{ fontSize:".9rem", fontWeight:700, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{project.title}</h4>
          {project.role && <p style={{ fontFamily:"var(--mono)", fontSize:".65rem", color:"var(--muted2)", marginTop:".15rem" }}>{project.role}</p>}
        </div>

        <div style={{ display:"flex", gap:".6rem", alignItems:"center", flexShrink:0 }}>
          <button onClick={e=>{ e.stopPropagation(); if(confirm("Supprimer ce projet ?")) onDelete(project.id) }} style={{ background:"none", border:"1px solid var(--border)", color:"var(--muted)", borderRadius:"var(--r-sm)", padding:".3rem .6rem", cursor:"pointer", display:"flex", alignItems:"center", gap:".3rem", fontSize:".72rem", transition:"all .2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--danger)";e.currentTarget.style.color="var(--danger)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--muted)"}}
          ><Trash2 size={12}/></button>
          <div style={{ color:"var(--muted2)" }}>{open ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</div>
        </div>
      </div>

      {/* Formulaire d'édition */}
      {open && (
        <div style={{ borderTop:"1px solid var(--border)", padding:"1.2rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
          <FormFields form={form} set={set} uploading={uploading} preview={preview} setPreview={setPreview} onUpload={handleUpload} msg={msg}/>
          <div style={{ display:"flex", gap:".8rem" }}>
            <button onClick={save} disabled={uploading} style={{ flex:1, background:"var(--accent)", color:"#07090E", border:"none", borderRadius:"var(--r-sm)", padding:".7rem", fontFamily:"var(--font)", fontWeight:700, fontSize:".85rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:".4rem", transition:"background .2s" }}
              onMouseEnter={e=>(e.currentTarget.style.background="#3DFFA0")}
              onMouseLeave={e=>(e.currentTarget.style.background="var(--accent)")}
            ><Check size={14}/> Sauvegarder</button>
            <button onClick={() => { setOpen(false); setFormState(projectToForm(project)); setMsg(null) }} style={{ padding:".7rem 1rem", background:"none", border:"1px solid var(--border)", borderRadius:"var(--r-sm)", color:"var(--muted2)", cursor:"pointer", fontFamily:"var(--mono)", fontSize:".72rem", transition:"all .2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--border2)";e.currentTarget.style.color="var(--text)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--muted2)"}}
            >Annuler</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PROJECT LIST ─────────────────────────────────────────────────
const ProjectList = ({ projects, onSave, onDelete }: { projects: AdminProject[]; onSave: (p: AdminProject) => void; onDelete: (id: number) => void }) => {
  if (projects.length === 0) {
    return <div style={{ textAlign:"center", padding:"3rem", border:"1px dashed var(--border)", borderRadius:"var(--r-md)", fontFamily:"var(--mono)", fontSize:".78rem", color:"var(--muted)" }}>// Aucun projet ajouté via l'admin pour l'instant.</div>
  }
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
      <p style={{ fontFamily:"var(--mono)", fontSize:".7rem", color:"var(--muted2)" }}>
        Clique sur un projet pour le modifier. <Pencil size={11} style={{ display:"inline", verticalAlign:"middle" }}/>
      </p>
      {projects.map(p => (
        <EditCard key={p.id} project={p} onSave={onSave} onDelete={onDelete}/>
      ))}
    </div>
  )
}

// ─── MAIN PANEL ──────────────────────────────────────────────────
const AdminPanel = ({ onClose, onProjectsChange }: AdminPanelProps) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<"add"|"list">("add")
  const [projects, setProjects] = useState<AdminProject[]>(loadProjects)

  const refresh = () => { const p = loadProjects(); setProjects(p); onProjectsChange() }

  const handleSave = (updated: AdminProject) => {
    const list = projects.map(p => p.id === updated.id ? updated : p)
    saveProjects(list); setProjects(list); onProjectsChange()
  }

  const handleDelete = (id: number) => {
    const updated = projects.filter(p => p.id !== id)
    saveProjects(updated); setProjects(updated); onProjectsChange()
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(7,9,14,.97)", backdropFilter:"blur(6px)", overflowY:"auto" }}>
      <button onClick={onClose} style={{ position:"fixed", top:"1.5rem", right:"1.5rem", background:"none", border:"1px solid var(--border)", borderRadius:"var(--r-sm)", color:"var(--muted2)", padding:".4rem .8rem", cursor:"pointer", display:"flex", alignItems:"center", gap:".4rem", fontFamily:"var(--mono)", fontSize:".72rem", transition:"all .2s", zIndex:201 }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--danger)";e.currentTarget.style.color="var(--danger)"}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--muted2)"}}
      ><X size={14}/> Fermer</button>

      {!loggedIn ? <Login onSuccess={() => setLoggedIn(true)}/> : (
        <div style={{ maxWidth:820, margin:"0 auto", padding:"2rem 2rem 5rem" }}>
          <div style={{ marginBottom:"2rem", paddingBottom:"1.5rem", borderBottom:"1px solid var(--border)" }}>
            <h2 style={{ fontSize:"1.2rem", fontWeight:800 }}>Admin <span style={{ color:"var(--accent)", fontFamily:"var(--mono)" }}>// panel</span></h2>
            <p style={{ fontFamily:"var(--mono)", fontSize:".7rem", color:"var(--muted2)", marginTop:".2rem" }}>
              {projects.length} projet{projects.length!==1?"s":""} enregistré{projects.length!==1?"s":""}
            </p>
          </div>

          <div style={{ display:"flex", gap:".5rem", marginBottom:"2rem" }}>
            {([
              { key:"add" as const, label:"+ Ajouter", icon:<Plus size={13}/> },
              { key:"list" as const, label:`Gérer (${projects.length})`, icon:<Pencil size={13}/> }
            ]).map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{ display:"flex", alignItems:"center", gap:".4rem", padding:".5rem 1rem", borderRadius:"var(--r-sm)", border:`1px solid ${tab===t.key?"var(--accent)":"var(--border)"}`, background:tab===t.key?"rgba(79,255,176,.07)":"transparent", color:tab===t.key?"var(--accent)":"var(--muted2)", fontFamily:"var(--mono)", fontSize:".72rem", cursor:"pointer", textTransform:"uppercase", letterSpacing:".06em", transition:"all .2s" }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {tab==="add" && <AddForm onAdded={refresh}/>}
          {tab==="list" && <ProjectList projects={projects} onSave={handleSave} onDelete={handleDelete}/>}
        </div>
      )}
    </div>
  )
}

export default AdminPanel