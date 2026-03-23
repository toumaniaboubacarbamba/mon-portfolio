import { Github, Linkedin, Mail, Facebook, Code2 } from "lucide-react"

interface FooterProps {
  onAdminClick: () => void
}

const Footer = ({ onAdminClick }: FooterProps) => {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "3rem 2rem",
      background: "var(--bg2)"
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "2rem"
      }}>
        {/* Brand */}
        <div>
          <div style={{
            display: "flex", alignItems: "center", gap: ".5rem",
            fontWeight: 800, fontSize: "1rem", marginBottom: ".5rem"
          }}>
            <Code2 size={16} color="var(--accent)" />
            Toumani<span style={{ color: "var(--accent)" }}>.</span>
          </div>
          <p style={{
            fontFamily: "var(--mono)", fontSize: ".68rem",
            color: "var(--muted)", letterSpacing: ".06em"
          }}>
            © {new Date().getFullYear()} · Dev Fullstack & Mobile
          </p>
        </div>

        {/* Socials */}
        <div style={{ display: "flex", gap: ".8rem" }}>
          {[
            { href: "https://github.com/toumaniaboubacarbamba", icon: <Github size={16} />, label: "GitHub" },
            { href: "https://ci.linkedin.com/in/aboubacar-toumani-bamba-13b67025b", icon: <Linkedin size={16} />, label: "LinkedIn" },
            { href: "https://www.facebook.com/Bamba.Aboubacar.Toumani/", icon: <Facebook size={16} />, label: "Facebook" },
            { href: "mailto:bambaaboubacartoumani@gmail.com", icon: <Mail size={16} />, label: "Email" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              title={s.label}
              style={{
                width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--border)", borderRadius: "var(--r-sm)",
                color: "var(--muted2)", textDecoration: "none", transition: "all .2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted2)" }}
            >{s.icon}</a>
          ))}
        </div>

        {/* Admin link */}
        <button onClick={onAdminClick} style={{
          background: "none", border: "none",
          fontFamily: "var(--mono)", fontSize: ".65rem",
          color: "var(--muted)", cursor: "pointer",
          letterSpacing: ".08em", textTransform: "uppercase",
          transition: "color .2s", padding: 0
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
        >
          // admin
        </button>
      </div>
    </footer>
  )
}

export default Footer
