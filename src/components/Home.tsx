import { Mail, Github, Linkedin, ArrowDown } from "lucide-react"
//import img from '../assets/Photo pro 1.jpg'

const stack = [
  "Laravel", "Flutter", "Node.js", "TypeScript",
  "React / Next.js", "React Native", "MongoDB", "PostgreSQL", "MySQL",
  "Dart", "Vue.js", "Tailwind CSS"
]

const Home = () => {
  return (
    <section id="Home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "0 0", position: "relative", overflow: "hidden"
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "10%", right: "-10%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,255,176,.05) 0%, transparent 65%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,207,255,.04) 0%, transparent 60%)",
        pointerEvents: "none"
      }} />
      <div className="dot-grid" />

      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: "5rem", alignItems: "center", width: "100%",
        position: "relative", zIndex: 1
      }} className="hero-inner">
        {/* Left */}
        <div>
          <p className="fade-up" style={{
            fontFamily: "var(--mono)", fontSize: ".75rem", color: "var(--accent)",
            letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "1.2rem",
            display: "flex", alignItems: "center", gap: ".6rem"
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--accent)", display: "inline-block",
              boxShadow: "0 0 8px var(--accent)"
            }} />
            Disponible · Abidjan, Côte d'Ivoire 
          </p>

          <h1 className="fade-up fade-up-d1" style={{
            fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
            fontWeight: 800, lineHeight: 1.0,
            letterSpacing: "-.03em", marginBottom: "1.5rem"
          }}>
            Bonjour,<br />
            je suis{" "}
            <span style={{
              color: "var(--accent)",
              WebkitTextStroke: "0px"
            }}>Bamba Aboubacar Toumani  </span>
          </h1>

          <p className="fade-up fade-up-d2" style={{
  color: "var(--muted2)", fontSize: "1rem",
  maxWidth: "520px", lineHeight: 1.8, marginBottom: "2rem"
}}>
  Je construis des <strong style={{ color: "var(--text)", fontWeight: 600 }}>APIs robustes</strong> et des{" "}
  <strong style={{ color: "var(--text)", fontWeight: 600 }}>apps mobiles Flutter</strong> —
  de la conception à la mise en production.
  Deux univers, une même exigence.
</p>

          {/* CTA */}
          <div className="fade-up fade-up-d3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <a
              href="mailto:bambaaboubacartoumani@gmail.com?subject=Contact%20depuis%20portfolio"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".5rem",
                background: "var(--accent)", color: "#07090E",
                padding: ".75rem 1.6rem", borderRadius: "var(--r-sm)",
                fontFamily: "var(--font)", fontWeight: 700, fontSize: ".88rem",
                textDecoration: "none", transition: "all .2s", letterSpacing: ".02em"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#3DFFA0"; e.currentTarget.style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.transform = "translateY(0)" }}
            >
              <Mail size={16} /> Me contacter
            </a>
            <a href="#Projects" style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem",
              background: "transparent", color: "var(--text)",
              padding: ".75rem 1.6rem", borderRadius: "var(--r-sm)",
              border: "1px solid var(--border2)",
              fontFamily: "var(--font)", fontWeight: 600, fontSize: ".88rem",
              textDecoration: "none", transition: "all .2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text)" }}
            >
              Voir mes projets
            </a>
          </div>

          {/* Social */}
          <div className="fade-up" style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2.5rem" }}>
            {[
              { href: "https://github.com/toumaniaboubacarbamba", icon: <Github size={17} /> },
              { href: "https://ci.linkedin.com/in/aboubacar-toumani-bamba-13b67025b", icon: <Linkedin size={17} /> },
              { href: "mailto:bambaaboubacartoumani@gmail.com", icon: <Mail size={17} /> },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--border)", borderRadius: "var(--r-sm)",
                color: "var(--muted2)", textDecoration: "none", transition: "all .2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted2)" }}
              >{s.icon}</a>
            ))}
          </div>

          {/* Stack tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
            {stack.map(s => (
              <span key={s} style={{
                fontFamily: "var(--mono)", fontSize: ".68rem",
                padding: ".28rem .65rem",
                border: "1px solid var(--border)",
                borderRadius: "4px", color: "var(--muted)",
                letterSpacing: ".04em"
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Right — photo */}
        <div className="hero-photo fade-up fade-up-d1" style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: -3,
            borderRadius: "30% 70% 70% 30% / 67% 62% 38% 33%",
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            opacity: .25, filter: "blur(1px)"
          }} />
          {/* <img
            src={img}
            alt="Toumani Bamba"
            style={{
              width: "340px", height: "340px",
              objectFit: "cover", display: "block", position: "relative",
              borderRadius: "30% 70% 70% 30% / 67% 62% 38% 33%",
              border: "2px solid rgba(79,255,176,.3)"
            }}
          /> */}
        </div>
      </div>

      {/* Scroll hint */}
      <a href="#About" style={{
        position: "absolute", bottom: "2rem", left: "50%",
        transform: "translateX(-50%)",
        color: "var(--muted)", display: "flex", flexDirection: "column",
        alignItems: "center", gap: ".3rem",
        fontFamily: "var(--mono)", fontSize: ".65rem", letterSpacing: ".1em",
        textDecoration: "none", animation: "fadeUp 1s 1s both",
        textTransform: "uppercase"
      }}>
        Scroll <ArrowDown size={12} />
      </a>

      <style>{`
        @media (max-width: 768px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hero-photo { display: none !important; }
        }
      `}</style>
    </section>
  )
}

export default Home
