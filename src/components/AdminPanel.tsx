import { useState, useRef } from "react"
import { X, Plus, Trash2, Lock, FolderOpen, Upload, Image } from "lucide-react"

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string
const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY as string
const STORAGE_KEY = "portfolio_projects_v1"

interface AdminProject {
  id: number
  title: string
  description: string
  technologies: string[]
  demoLink: string
  repoLink: string
  type: "mobile" | "fullstack" | "frontend" | "backend"
  imageUrl?: string
}

interface AdminPanelProps {
  onClose: () => void
  onProjectsChange: () => void
}

function loadProjects(): AdminProject[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : [] }
  catch { return [] }
}
function saveProjects(projects: AdminProject[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

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
          <label style={{ fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--muted2)", letterSpacing:".08em", textTransform:"uppercase" as const }}>Mot de passe</label>
          <input type="password" value={pwd} autoFocus
            onChange={e => { setPwd(e.target.value); setError(false) }}
            onKeyDown={e => e.key === "Enter" && check()}
            placeholder="••••••••"
            style={{ background:"var(--bg3)", border:`1px solid ${error?"var(--danger)":"var(--border)"}`, borderRadius:"var(--r-sm)", padding:".7rem 1rem", color:"var(--text)", fontFamily:"var(--font)", fontSize:".9rem", outline:"none", transition:"border-color .2s" }}
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

const AddForm = ({ onAdded }: { onAdded: () => void }) => {
  const [form, setForm] = useState({
    title:"", description:"", technologies:"",
    demoLink:"", repoLink:"", type:"fullstack" as AdminProject["type"], imageUrl:""
  })
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method:"POST", body:formData })
      const data = await res.json()
      if (data.success) {
        set("imageUrl", data.data.url)
        setMsg({ text:"✓ Image uploadée avec succès !", ok:true })
      } else {
        setMsg({ text:"Erreur upload image. Vérifie ta clé ImgBB.", ok:false })
      }
    } catch {
      setMsg({ text:"Erreur réseau lors de l'upload.", ok:false })
    } finally {
      setUploading(false)
    }
  }

  const submit = () => {
    if (!form.title.trim() || !form.description.trim()) {
      setMsg({ text:"Remplis au moins le titre et la description.", ok:false }); return
    }
    const projects = loadProjects()
    const newProject: AdminProject = {
      id: Date.now(), title:form.title.trim(), description:form.description.trim(),
      technologies:form.technologies.split(",").map(s=>s.trim()).filter(Boolean),
      demoLink:form.demoLink.trim(), repoLink:form.repoLink.trim(),
      type:form.type, imageUrl:form.imageUrl.trim()
    }
    saveProjects([newProject, ...projects])
    setForm({ title:"", description:"", technologies:"", demoLink:"", repoLink:"", type:"fullstack", imageUrl:"" })
    setPreview(null)
    setMsg({ text:"✓ Projet publié avec succès !", ok:true })
    onAdded()
    setTimeout(() => setMsg(null), 3000)
  }

  const inputStyle = { background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"var(--r-sm)", padding:".65rem 1rem", color:"var(--text)", fontFamily:"var(--font)", fontSize:".88rem", outline:"none", width:"100%", transition:"border-color .2s" }
  const labelStyle = { fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--muted2)", letterSpacing:".08em", textTransform:"uppercase" as const }
  const onFocus = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => (e.currentTarget.style.borderColor = "var(--accent)")
  const onBlur  = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => (e.currentTarget.style.borderColor = "var(--border)")

  return (
    <div>
      {msg && (
        <div style={{ padding:".7rem 1rem", borderRadius:"var(--r-sm)", marginBottom:"1.5rem", fontFamily:"var(--mono)", fontSize:".78rem", background:msg.ok?"rgba(79,255,176,.07)":"rgba(255,77,109,.07)", border:`1px solid ${msg.ok?"rgba(79,255,176,.25)":"rgba(255,77,109,.25)"}`, color:msg.ok?"var(--accent)":"var(--danger)" }}>
          {msg.text}
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>

        <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
          <label style={labelStyle}>Titre *</label>
          <input style={inputStyle} value={form.title} onChange={e=>set("title",e.target.value)} placeholder="Mon Projet" onFocus={onFocus} onBlur={onBlur}/>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
          <label style={labelStyle}>Type *</label>
          <select style={{ ...inputStyle, cursor:"pointer" }} value={form.type} onChange={e=>set("type",e.target.value)} onFocus={onFocus} onBlur={onBlur}>
            <option value="mobile">Mobile</option>
            <option value="fullstack">Fullstack</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:".4rem", gridColumn:"1/-1" }}>
          <label style={labelStyle}>Description *</label>
          <textarea style={{ ...inputStyle, minHeight:90, resize:"vertical" }} value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Ce projet permet de…" onFocus={onFocus} onBlur={onBlur}/>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:".4rem", gridColumn:"1/-1" }}>
          <label style={labelStyle}>Technologies (séparées par des virgules)</label>
          <input style={inputStyle} value={form.technologies} onChange={e=>set("technologies",e.target.value)} placeholder="React Native, Firebase, Node.js" onFocus={onFocus} onBlur={onBlur}/>
        </div>

        {/* Upload image */}
        <div style={{ display:"flex", flexDirection:"column", gap:".6rem", gridColumn:"1/-1" }}>
          <label style={labelStyle}>Image du projet</label>
          <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
            onChange={e => { const f=e.target.files?.[0]; if(f) handleImageUpload(f) }}
          />
          <div style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
            <div onClick={() => fileRef.current?.click()} style={{
              flex:1, border:`2px dashed ${uploading?"var(--accent)":"var(--border)"}`,
              borderRadius:"var(--r-md)", padding:"1.5rem",
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              gap:".6rem", cursor:"pointer", transition:"all .2s",
              background:uploading?"rgba(79,255,176,.04)":"transparent", minHeight:100
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.background="rgba(79,255,176,.04)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=uploading?"var(--accent)":"var(--border)";e.currentTarget.style.background=uploading?"rgba(79,255,176,.04)":"transparent"}}
            >
              {uploading ? (
                <>
                  <div style={{ width:20, height:20, border:"2px solid var(--accent)", borderTopColor:"transparent", borderRadius:"50%", animation:"spin .7s linear infinite" }}/>
                  <span style={{ fontFamily:"var(--mono)", fontSize:".72rem", color:"var(--accent)" }}>Upload en cours…</span>
                </>
              ) : (
                <>
                  <Upload size={20} color="var(--muted2)"/>
                  <span style={{ fontFamily:"var(--mono)", fontSize:".72rem", color:"var(--muted2)", textAlign:"center" }}>
                    Clique pour choisir une image<br/>
                    <span style={{ color:"var(--muted)", fontSize:".65rem" }}>PNG, JPG, WEBP — max 32MB</span>
                  </span>
                </>
              )}
            </div>
            {preview && (
              <div style={{ position:"relative", width:120, height:100, flexShrink:0 }}>
                <img src={preview} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"var(--r-sm)", border:"1px solid var(--border)" }}/>
                {form.imageUrl && (
                  <div style={{ position:"absolute", bottom:4, right:4, background:"rgba(79,255,176,.9)", borderRadius:"3px", padding:"2px 5px" }}>
                    <Image size={10} color="#07090E"/>
                  </div>
                )}
                <button onClick={e=>{e.stopPropagation();setPreview(null);set("imageUrl","")}} style={{ position:"absolute", top:-6, right:-6, width:18, height:18, background:"var(--danger)", border:"none", borderRadius:"50%", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>✕</button>
              </div>
            )}
          </div>
          <input style={{ ...inputStyle }} type="url" value={form.imageUrl} onChange={e=>set("imageUrl",e.target.value)} placeholder="Ou colle directement un lien image (https://i.ibb.co/…)" onFocus={onFocus} onBlur={onBlur}/>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
          <label style={labelStyle}>Lien démo</label>
          <input style={inputStyle} type="url" value={form.demoLink} onChange={e=>set("demoLink",e.target.value)} placeholder="https://…" onFocus={onFocus} onBlur={onBlur}/>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
          <label style={labelStyle}>Lien GitHub</label>
          <input style={inputStyle} type="url" value={form.repoLink} onChange={e=>set("repoLink",e.target.value)} placeholder="https://github.com/…" onFocus={onFocus} onBlur={onBlur}/>
        </div>

        <button onClick={submit} disabled={uploading} style={{ gridColumn:"1/-1", background:uploading?"var(--border)":"var(--accent)", color:"#07090E", border:"none", borderRadius:"var(--r-sm)", padding:".8rem", fontFamily:"var(--font)", fontWeight:700, fontSize:".9rem", cursor:uploading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:".5rem", transition:"background .2s" }}
          onMouseEnter={e=>{ if(!uploading) e.currentTarget.style.background="#3DFFA0" }}
          onMouseLeave={e=>{ if(!uploading) e.currentTarget.style.background=uploading?"var(--border)":"var(--accent)" }}
        ><Plus size={16}/> Publier le projet</button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

const ProjectList = ({ projects, onDelete }: { projects: AdminProject[]; onDelete: (id: number) => void }) => {
  if (projects.length === 0) {
    return <div style={{ textAlign:"center", padding:"3rem", border:"1px dashed var(--border)", borderRadius:"var(--r-md)", fontFamily:"var(--mono)", fontSize:".78rem", color:"var(--muted)" }}>// Aucun projet ajouté via l'admin pour l'instant.</div>
  }
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
      {projects.map(p => (
        <div key={p.id} style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:"var(--r-md)", padding:"1rem 1.2rem", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", flex:1 }}>
            {p.imageUrl && <img src={p.imageUrl} alt={p.title} style={{ width:56, height:44, objectFit:"cover", borderRadius:"var(--r-sm)", border:"1px solid var(--border)", flexShrink:0 }}/>}
            <div>
              <div style={{ fontFamily:"var(--mono)", fontSize:".65rem", color:"var(--accent)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:".25rem" }}>{p.type}</div>
              <h4 style={{ fontSize:".92rem", fontWeight:700, marginBottom:".25rem" }}>{p.title}</h4>
              <p style={{ fontFamily:"var(--mono)", fontSize:".72rem", color:"var(--muted2)" }}>{p.description.slice(0,80)}{p.description.length>80?"…":""}</p>
            </div>
          </div>
          <button onClick={() => onDelete(p.id)} style={{ background:"none", border:"1px solid var(--border)", color:"var(--muted)", borderRadius:"var(--r-sm)", padding:".4rem .7rem", cursor:"pointer", display:"flex", alignItems:"center", gap:".3rem", fontSize:".75rem", transition:"all .2s", flexShrink:0 }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--danger)";e.currentTarget.style.color="var(--danger)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--muted)"}}
          ><Trash2 size={13}/> Supprimer</button>
        </div>
      ))}
    </div>
  )
}

const AdminPanel = ({ onClose, onProjectsChange }: AdminPanelProps) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<"add"|"list">("add")
  const [projects, setProjects] = useState<AdminProject[]>(loadProjects)

  const refresh = () => { setProjects(loadProjects()); onProjectsChange() }
  const handleDelete = (id: number) => {
    if (!confirm("Supprimer ce projet ?")) return
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
        <div style={{ maxWidth:820, margin:"0 auto", padding:"2rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2rem", paddingBottom:"1.5rem", borderBottom:"1px solid var(--border)" }}>
            <div>
              <h2 style={{ fontSize:"1.2rem", fontWeight:800 }}>Admin <span style={{ color:"var(--accent)", fontFamily:"var(--mono)" }}>// panel</span></h2>
              <p style={{ fontFamily:"var(--mono)", fontSize:".7rem", color:"var(--muted2)", marginTop:".2rem" }}>{projects.length} projet{projects.length!==1?"s":""} enregistré{projects.length!==1?"s":""}</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:".5rem", marginBottom:"2rem" }}>
            {([{ key:"add" as const, label:"+ Ajouter un projet", icon:<Plus size={13}/> }, { key:"list" as const, label:`Gérer (${projects.length})`, icon:<FolderOpen size={13}/> }]).map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{ display:"flex", alignItems:"center", gap:".4rem", padding:".5rem 1rem", borderRadius:"var(--r-sm)", border:`1px solid ${tab===t.key?"var(--accent)":"var(--border)"}`, background:tab===t.key?"rgba(79,255,176,.07)":"transparent", color:tab===t.key?"var(--accent)":"var(--muted2)", fontFamily:"var(--mono)", fontSize:".72rem", cursor:"pointer", textTransform:"uppercase", letterSpacing:".06em", transition:"all .2s" }}>{t.icon} {t.label}</button>
            ))}
          </div>
          {tab==="add" && <AddForm onAdded={refresh}/>}
          {tab==="list" && <ProjectList projects={projects} onDelete={handleDelete}/>}
        </div>
      )}
    </div>
  )
}

export default AdminPanel