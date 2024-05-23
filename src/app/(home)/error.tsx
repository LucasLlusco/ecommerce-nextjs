"use client";

const Error = ({reset}: ErrorPageProps) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      }}>
      <h1 style={{fontSize: "4rem",color: "#721c24"}}>:c</h1>
      <p style={{fontSize: "1.5rem",color: "#721c24"}}>Ha ocurrido un error</p>
      <button 
        onClick={reset} 
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "#d9534f", 
          border: "1px solid #d9534f", 
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >Intentar de nuevo</button>
    </div>  
  )
}

export default Error