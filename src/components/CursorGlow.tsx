import { useEffect, useRef } from "react"

const CursorGlow = () => {
  const dotRef    = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cx = 0, cy = 0   // position cercle (lag)
    let tx = 0, ty = 0   // position cible (souris)

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      // Le petit point suit instantanément
      if (dotRef.current) {
        dotRef.current.style.left = `${tx}px`
        dotRef.current.style.top  = `${ty}px`
      }
    }

    // Le grand cercle suit avec un léger lag
    const animate = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      if (circleRef.current) {
        circleRef.current.style.left = `${cx}px`
        circleRef.current.style.top  = `${cy}px`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove)
    const id = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(id)
    }
  }, [])

  return (
    <>
      {/* Petit point central — suit instantanément */}
      <div ref={dotRef} style={{
        position: "fixed", zIndex: 9999,
        width: 6, height: 6, borderRadius: "50%",
        background: "var(--accent)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        boxShadow: "0 0 6px var(--accent)",
      }}/>

      {/* Grand cercle — suit avec lag */}
      <div ref={circleRef} style={{
        position: "fixed", zIndex: 9998,
        width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(79,255,176,.5)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        transition: "width .2s, height .2s",
      }}/>

    </>
  )
}

export default CursorGlow