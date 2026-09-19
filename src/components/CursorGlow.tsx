import { useEffect, useRef } from "react"

const CursorGlow = () => {
  const dotRef    = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ cx: 0, cy: 0, tx: 0, ty: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX
      pos.current.ty = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
      }
    }

    const animate = () => {
      const { cx, cy, tx, ty } = pos.current
      const nx = cx + (tx - cx) * 0.12
      const ny = cy + (ty - cy) * 0.12
      pos.current.cx = nx
      pos.current.cy = ny
      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${nx - 18}px, ${ny - 18}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", zIndex: 9999,
        top: 0, left: 0,
        width: 6, height: 6,
        borderRadius: "50%",
        background: "var(--accent)",
        pointerEvents: "none",
        willChange: "transform",
        boxShadow: "0 0 6px var(--accent)",
      }}/>
      <div ref={circleRef} style={{
        position: "fixed", zIndex: 9998,
        top: 0, left: 0,
        width: 36, height: 36,
        borderRadius: "50%",
        border: "1px solid rgba(79,255,176,.5)",
        pointerEvents: "none",
        willChange: "transform",
      }}/>
    </>
  )
}

export default CursorGlow