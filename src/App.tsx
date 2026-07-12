import { useState, useCallback, useEffect } from "react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Experiences from "./components/Experiences"
import Projects from "./components/Projects"
import Footer from "./components/Footer"
import AdminPanel from "./components/AdminPanel"

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false)
  const [projectsKey, setProjectsKey] = useState(0)

  const handleProjectsChange = useCallback(() => {
    setProjectsKey(k => k + 1)
  }, [])

  const openAdmin = () => setAdminOpen(true)
  const closeAdmin = () => setAdminOpen(false)

  useEffect(() => {
    if (window.location.hash === "#admin") {
      setAdminOpen(true)
      // Nettoie le hash pour ne pas le laisser visible dans l'URL
      window.history.replaceState(null, "", window.location.pathname)
    }
  }, [])

  return (
    <div style={{ position: "relative" }}>
      {/* Subtle noise texture */}
      <div className="noise" />

      {/* Navigation */}
      <Navbar />

      {/* Hero — full viewport */}
      <div style={{ padding: "0 2rem", maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ paddingTop: "80px" }}>
          <Home />
        </div>
      </div>

      {/* About — full width bg */}
      <About />

      {/* Experiences + Projects — padded container */}
      <div style={{ padding: "0 2rem", maxWidth: 1300, margin: "0 auto" }}>
        <Experiences />
        <Projects refreshKey={projectsKey} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Admin Panel (overlay) */}
      {adminOpen && (
        <AdminPanel
          onClose={closeAdmin}
          onProjectsChange={handleProjectsChange}
        />
      )}
    </div>
  )
}
