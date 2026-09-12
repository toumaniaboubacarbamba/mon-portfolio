import { useEffect, useRef } from "react"

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return
      glowRef.current.style.left = `${e.clientX}px`
      glowRef.current.style.top  = `${e.clientY}px`
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <div ref={glowRef} style={{
      position: "fixed",
      left: 0, top: 0,
      width: 500, height: 500,
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 0,
      transform: "translate(-50%, -50%)",
      background: "radial-gradient(circle, rgba(79,255,176,.07) 0%, transparent 65%)",
      transition: "left .08s ease, top .08s ease",
    }}/>
  )
}

export default CursorGlow
