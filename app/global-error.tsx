"use client";

export default function GlobalError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f0ece4",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <span
          style={{ fontSize: "3rem", marginBottom: "1.5rem", color: "#ff6b4a" }}
        >
          &#10005;
        </span>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Something went wrong
        </h2>
        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(240,236,228,0.5)",
            marginBottom: "2rem",
            maxWidth: "400px",
            lineHeight: 1.6,
          }}
        >
          An unexpected error occurred.
        </p>
        <button
          onClick={reset}
          style={{
            padding: "0.75rem 2rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#0a0a0a",
            background: "#e8ff47",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
