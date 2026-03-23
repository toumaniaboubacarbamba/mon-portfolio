interface TitleProps {
  title: string
  sub?: string
}

const Title = ({ title, sub }: TitleProps) => {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <p style={{
        fontFamily: "var(--mono)", fontSize: ".72rem", color: "var(--accent)",
        letterSpacing: ".16em", textTransform: "uppercase", marginBottom: ".6rem"
      }}>// {sub || title.toLowerCase()}</p>
      <h2 style={{
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800,
        color: "var(--text)", letterSpacing: "-.01em", lineHeight: 1.1
      }}>{title}</h2>
      <div style={{
        marginTop: ".8rem", width: "2.5rem", height: "2px",
        background: "linear-gradient(90deg, var(--accent), var(--accent2))",
        borderRadius: "2px"
      }} />
    </div>
  )
}

export default Title
