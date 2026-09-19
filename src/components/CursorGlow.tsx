import { useEffect } from "react"

const CursorGlow = () => {
  useEffect(() => {
    // Crée les éléments directement dans le body — hors de l'arbre React
    const dot = document.createElement("div")
    const circle = document.createElement("div")

    Object.assign(dot.style, {
      position: "fixed", zIndex: "9999",
      top: "0", left: "0",
      width: "6px", height: "6px",
      borderRadius: "50%",
      background: "#4FFFB0",
      pointerEvents: "none",
      willChange: "transform",
      boxShadow: "0 0 6px #4FFFB0",
    })

    Object.assign(circle.style, {
      position: "fixed", zIndex: "9998",
      top: "0", left: "0",
      width: "36px", height: "36px",
      borderRadius: "50%",
      border: "1px solid rgba(79,255,176,.5)",
      pointerEvents: "none",
      willChange: "transform",
    })

    document.body.appendChild(dot)
    document.body.appendChild(circle)

    let cx = 0, cy = 0, tx = 0, ty = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      dot.style.transform = `translate(${tx - 3}px, ${ty - 3}px)`
    }

    const animate = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      circle.style.transform = `translate(${cx - 18}px, ${cy - 18}px)`
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
      // Vérifie que les éléments sont bien enfants du body avant de les supprimer
      if (document.body.contains(dot)) document.body.removeChild(dot)
      if (document.body.contains(circle)) document.body.removeChild(circle)
    }
  }, [])

  return null
}

export default CursorGlow