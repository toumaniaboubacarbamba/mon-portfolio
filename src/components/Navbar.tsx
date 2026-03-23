import { useEffect, useState } from "react"
import { Code2, Menu, X, Lock } from "lucide-react"

interface NavbarProps {
  onAdminClick: () => void
}

const Navbar = ({ onAdminClick }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "#Home", label: "Accueil" },
    { href: "#About", label: "À propos" },
    { href: "#Experiences", label: "Expériences" },
    { href: "#Projects", label: "Projets" },
  ]

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "all .3s",
        background: scrolled ? "rgba(7,9,14,.94)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
      }}>
        {/* Logo */}
        <a href="#Home" style={{
          display: "flex", alignItems: "center", gap: ".5rem",
          fontFamily: "var(--font)", fontWeight: 800, fontSize: "1.05rem",
          textDecoration: "none", color: "var(--text)"
        }}>
          <Code2 size={18} color="var(--accent)" />
          Toumani<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* Desktop links */}
        <ul style={{
          display: "flex", gap: "2rem", listStyle: "none", alignItems: "center"
        }} className="desktop-nav">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                color: "var(--muted2)", textDecoration: "none",
                fontFamily: "var(--mono)", fontSize: ".75rem",
                letterSpacing: ".08em", textTransform: "uppercase",
                transition: "color .2s"
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted2)")}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
          {/* Admin btn */}
          <button onClick={onAdminClick} style={{
            display: "flex", alignItems: "center", gap: ".4rem",
            background: "none", border: "1px solid var(--border2)",
            color: "var(--muted2)", borderRadius: "var(--r-sm)",
            padding: ".3rem .75rem", fontFamily: "var(--mono)",
            fontSize: ".7rem", cursor: "pointer", letterSpacing: ".06em",
            textTransform: "uppercase", transition: "all .2s"
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)"
              e.currentTarget.style.color = "var(--accent)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border2)"
              e.currentTarget.style.color = "var(--muted2)"
            }}
          >
            <Lock size={11} /> Admin
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: "none", background: "none", border: "none",
              color: "var(--text)", cursor: "pointer"
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
          background: "rgba(7,9,14,.97)", borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(14px)", padding: "1.5rem 2rem",
          display: "flex", flexDirection: "column", gap: "1.2rem"
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--muted2)", textDecoration: "none",
                fontFamily: "var(--mono)", fontSize: ".85rem",
                letterSpacing: ".06em", textTransform: "uppercase"
              }}
            >{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar
