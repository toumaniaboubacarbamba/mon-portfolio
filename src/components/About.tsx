import { Globe, Smartphone, Zap } from "lucide-react"
import Title from "./Title"
import img from '../assets/img.jpg'

const cards = [
  {
  icon: <Globe size={20} />,
  title: "Développeur Backend & Fullstack",
  desc: "À l'aise sur Laravel, NestJS et Next.js pour concevoir des APIs solides et des architectures backend robustes. Le frontend ? Je m'en sors, sans en faire ma spécialité.",
  color: "var(--accent)"
},
  {
    icon: <Smartphone size={20} />,
    title: "Développeur Mobile Flutter",
    desc: "Applications mobiles cross-platform avec Flutter & Dart, architecture MVVM, intégration d'APIs complexes.",
    color: "var(--purple)"
  },
  {
    icon: <Zap size={20} />,
    title: "Orienté performance",
    desc: "Du prototype au déploiement, je livre un code propre, documenté et maintenable, avec une vraie obsession des détails.",
    color: "var(--accent2)"
  }
]

const stats = [
  { val: "1+", label: "ans d'expérience" },
  { val: "10+", label: "projets livrés" },
  { val: "M2", label: "en cours" },
]

const About = () => {
  return (
    <section id="About" style={{
      background: "var(--bg2)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: "7rem 2rem"
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "5rem", alignItems: "center"
        }} className="about-grid">

          {/* Photo col */}
          <div style={{ position: "relative" }} className="about-photo-col">
            <div style={{
              position: "absolute", top: -20, left: -20,
              width: "60%", height: "60%",
              background: "radial-gradient(circle, rgba(79,255,176,.07) 0%, transparent 70%)",
              pointerEvents: "none"
            }} />
            <div style={{
              position: "relative",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              overflow: "hidden"
            }}>
              <img src={img} alt="Toumani" style={{
                width: "100%", display: "block",
                objectFit: "cover", maxHeight: "460px"
              }} />
              {/* Stats bar */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "rgba(7,9,14,.88)",
                backdropFilter: "blur(12px)",
                borderTop: "1px solid var(--border)",
                padding: "1.2rem 1.5rem",
                display: "flex", justifyContent: "space-around"
              }}>
                {stats.map(s => (
                  <div key={s.val} style={{ textAlign: "center" }}>
                    <strong style={{
                      display: "block", fontSize: "1.5rem",
                      fontWeight: 800, color: "var(--accent)"
                    }}>{s.val}</strong>
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: ".65rem",
                      color: "var(--muted2)", textTransform: "uppercase",
                      letterSpacing: ".08em"
                    }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content col */}
          <div>
            <Title title="À propos" sub="about me" />
            <p style={{
  color: "var(--muted2)", lineHeight: 1.85,
  marginBottom: "2rem", fontSize: ".95rem"
}}>
  Développeur titulaire d'une{" "}
  <strong style={{ color: "var(--text)" }}>Licence en Informatique Developpeur d'Application</strong>,
  finalisant mon <strong style={{ color: "var(--text)" }}>Master 2</strong>.
  Formé au bootcamp <strong style={{ color: "var(--accent)" }}>We.Code × Epitech</strong>,
  j'ai une appétence naturelle pour le{" "}
  <strong style={{ color: "var(--text)" }}>backend</strong> — Laravel, NestJS, Next.js —
  et je développe des applications mobiles avec{" "}
  <strong style={{ color: "var(--text)" }}>Flutter</strong>.
  À l'aise sur le frontend sans en faire ma spécialité,
  je me sens le plus utile côté{" "}
  <strong style={{ color: "var(--accent)" }}>architecture, API et logique métier</strong>.
  Je cherche un premier challenge professionnel où apporter de la valeur concrète.
</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cards.map((c, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "1rem",
                  background: "var(--card)", border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)", padding: "1.1rem 1.2rem",
                  transition: "border-color .2s"
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border2)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: "var(--r-sm)",
                    background: `${c.color}14`,
                    border: `1px solid ${c.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: c.color, flexShrink: 0
                  }}>{c.icon}</div>
                  <div>
                    <h3 style={{
                      fontSize: ".92rem", fontWeight: 700,
                      marginBottom: ".3rem", color: "var(--text)"
                    }}>{c.title}</h3>
                    <p style={{ fontSize: ".82rem", color: "var(--muted2)", lineHeight: 1.6 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .about-photo-col { display: none !important; }
        }
      `}</style>
    </section>
  )
}

export default About
