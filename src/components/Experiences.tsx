import Title from "./Title"
import gs2e from "../assets/companies/gs2e.jpeg"
import wecode from "../assets/companies/WeCode.png"

import imgCSS from "../assets/techno/css.png"
import imgJS from "../assets/techno/js.png"
import imgREACT from "../assets/techno/react.png"
import imgHTML from "../assets/techno/html.png"
import imgNEXT from "../assets/techno/next-js.webp"
import imgNODE from "../assets/techno/node-js.png"
import imgTYPE from "../assets/techno/typescript.svg"
import imgTAILWIND from "../assets/techno/tailwind.png"
import imgMONGODB from "../assets/techno/mongodb.png"
import imgMYSQL from "../assets/techno/mysql.png"
import imgSQLITE from "../assets/techno/sqlite.jpeg"
import imgJAVA from "../assets/techno/java.png"
import imgSPRING from "../assets/techno/springboot.png"
import imgVUE from "../assets/techno/vue.png"
import imgLaravel from "../assets/techno/laravel.png"
import imgFlutter from "../assets/techno/flutter.png"

const skills = [
  { id: 1, name: "HTML", image: imgHTML },
  { id: 2, name: "CSS", image: imgCSS },
  { id: 3, name: "JavaScript", image: imgJS },
  { id: 4, name: "TypeScript", image: imgTYPE },
  { id: 5, name: "React", image: imgREACT },
  { id: 6, name: "Next.js", image: imgNEXT },
  { id: 7, name: "Vue.js", image: imgVUE },
  { id: 8, name: "Tailwind", image: imgTAILWIND },
  { id: 9, name: "Node.js", image: imgNODE },
  { id: 10, name: "Laravel", image: imgLaravel },
  { id: 11, name: "Spring Boot", image: imgSPRING },
  { id: 12, name: "Flutter", image: imgFlutter },
  { id: 13, name: "React Native", image: imgREACT },
  { id: 14, name: "Java", image: imgJAVA },
  { id: 15, name: "MongoDB", image: imgMONGODB },
  { id: 16, name: "MySQL", image: imgMYSQL },
  { id: 17, name: "SQLite", image: imgSQLITE },
]

const experiences = [
  {
    id: 1,
    role: "Stagiaire Développeur",
    company: "GS2E",
    period: "2021 · 3 mois",
    description: [
      "Apprentissage et mise en pratique de Java et Spring Boot",
      "Développement de fonctionnalités backend pour des applications d'entreprise",
      "Participation à la conception et à la documentation technique",
      "Collaboration avec l'équipe de développement sur des projets réels",
    ],
    image: gs2e,
    color: "var(--accent2)"
  },
  {
    id: 2,
    role: "Bootcamp Développeur Fullstack",
    company: "We.Code — piloté par Epitech",
    period: "2025 · 6 mois",
    description: [
      "Formation intensive en développement web fullstack",
      "Maîtrise des technologies modernes : Laravel, Flutter, MongoDB",
      "Réalisation de projets concrets avec méthodologie agile",
      "Développement d'applications web complètes de la conception au déploiement",
      "Travail en équipe sur des projets collaboratifs",
    ],
    image: wecode,
    color: "var(--accent)"
  },
]

const Experiences = () => {
  return (
    <section id="Experiences" style={{ padding: "7rem 0" }}>
      <Title title="Expériences & Skills" sub="background" />

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1.5fr",
        gap: "4rem", alignItems: "start"
      }} className="exp-grid">

        {/* Skills grid */}
        <div>
          <p style={{
            fontFamily: "var(--mono)", fontSize: ".7rem", color: "var(--muted2)",
            letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.5rem"
          }}>Technologies maîtrisées</p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
            gap: "1rem"
          }}>
            {skills.map(skill => (
              <div key={skill.id} style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: ".5rem",
                cursor: "default"
              }}>
                <div style={{
                  width: 52, height: 52,
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  padding: "8px",
                  background: "var(--card)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all .2s"
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--accent)"
                    e.currentTarget.style.background = "rgba(79,255,176,.06)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)"
                    e.currentTarget.style.background = "var(--card)"
                  }}
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }}
                  />
                </div>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: ".62rem",
                  color: "var(--muted2)", textAlign: "center", lineHeight: 1.2
                }}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experiences */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: ".7rem", color: "var(--muted2)",
            letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".5rem"
          }}>Parcours professionnel</p>
          {experiences.map(exp => (
            <div key={exp.id} style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              padding: "1.4rem 1.5rem",
              position: "relative", overflow: "hidden",
              transition: "border-color .2s"
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border2)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              {/* Top accent line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "2px",
                background: `linear-gradient(90deg, ${exp.color}, transparent)`
              }} />

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "var(--r-sm)",
                  border: "1px solid var(--border)",
                  overflow: "hidden", flexShrink: 0,
                  background: "var(--bg3)"
                }}>
                  <img
                    src={exp.image}
                    alt={exp.company}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h3 style={{
                    fontSize: ".95rem", fontWeight: 700,
                    color: "var(--text)", marginBottom: ".15rem"
                  }}>
                    {exp.role}
                  </h3>
                  <div style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: ".72rem",
                      color: exp.color
                    }}>{exp.company}</span>
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: ".65rem",
                      color: "var(--muted)", background: "var(--bg3)",
                      border: "1px solid var(--border)",
                      padding: ".15rem .5rem", borderRadius: "3px"
                    }}>{exp.period}</span>
                  </div>
                </div>
              </div>

              <ul style={{
                display: "flex", flexDirection: "column", gap: ".4rem",
                paddingLeft: "1rem"
              }}>
                {exp.description.map((d, i) => (
                  <li key={i} style={{
                    fontSize: ".83rem", color: "var(--muted2)",
                    lineHeight: 1.5, listStyle: "none",
                    display: "flex", alignItems: "flex-start", gap: ".6rem"
                  }}>
                    <span style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: exp.color, flexShrink: 0, marginTop: ".5rem"
                    }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default Experiences
