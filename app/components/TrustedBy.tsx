"use client";
export default function TrustedBy() {
  const clients = [
    {
      name: "Quantum Fitness",
      logo: (
        <svg width="140" height="36" viewBox="0 0 140 36" fill="none">
          <circle cx="16" cy="18" r="14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <text x="14" y="23" fill="rgba(255,255,255,0.4)" fontSize="11" fontWeight="800" fontFamily="sans-serif">Q</text>
          <text x="36" y="16" fill="rgba(255,255,255,0.5)" fontSize="13" fontWeight="700" fontFamily="sans-serif">QUANTUM</text>
          <text x="36" y="30" fill="rgba(255,255,255,0.3)" fontSize="9" fontWeight="500" fontFamily="sans-serif" letterSpacing="2">FITNESS</text>
        </svg>
      ),
    },
    {
      name: "NorthStar Realty",
      logo: (
        <svg width="140" height="36" viewBox="0 0 140 36" fill="none">
          <polygon points="16,4 19.5,13 29,13 21.5,18.5 24,28 16,22.5 8,28 10.5,18.5 3,13 12.5,13" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <text x="36" y="16" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="700" fontFamily="sans-serif">NORTHSTAR</text>
          <text x="36" y="30" fill="rgba(255,255,255,0.3)" fontSize="9" fontWeight="500" fontFamily="sans-serif" letterSpacing="2">REALTY</text>
        </svg>
      ),
    },
    {
      name: "Barrett Construction",
      logo: (
        <svg width="150" height="36" viewBox="0 0 150 36" fill="none">
          <rect x="2" y="6" width="22" height="24" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <text x="8" y="23" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="800" fontFamily="sans-serif">B</text>
          <text x="32" y="16" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="700" fontFamily="sans-serif">BARRETT</text>
          <text x="32" y="30" fill="rgba(255,255,255,0.3)" fontSize="9" fontWeight="500" fontFamily="sans-serif" letterSpacing="1">CONSTRUCTION</text>
        </svg>
      ),
    },
    {
      name: "Velocity Automotive",
      logo: (
        <svg width="150" height="36" viewBox="0 0 150 36" fill="none">
          <polygon points="14,6 26,18 14,30 2,18" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <text x="8" y="23" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="800" fontFamily="sans-serif">V</text>
          <text x="34" y="16" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="700" fontFamily="sans-serif">VELOCITY</text>
          <text x="34" y="30" fill="rgba(255,255,255,0.3)" fontSize="9" fontWeight="500" fontFamily="sans-serif" letterSpacing="1">AUTOMOTIVE</text>
        </svg>
      ),
    },
    {
      name: "Luxe Interiors",
      logo: (
        <svg width="130" height="36" viewBox="0 0 130 36" fill="none">
          <rect x="2" y="4" width="26" height="28" rx="1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <line x1="8" y1="12" x2="22" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="8" y1="18" x2="22" y2="18" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="8" y1="24" x2="22" y2="24" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <text x="35" y="16" fill="rgba(255,255,255,0.5)" fontSize="13" fontWeight="700" fontFamily="serif" letterSpacing="1">LUXE</text>
          <text x="35" y="30" fill="rgba(255,255,255,0.3)" fontSize="9" fontWeight="500" fontFamily="sans-serif" letterSpacing="3">INTERIORS</text>
        </svg>
      ),
    },
  ];

  return (
    <section style={{
      background: "rgba(255,255,255,0.02)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "40px 80px",
    }}>
      <p style={{
        textAlign: "center",
        color: "rgba(255,255,255,0.3)",
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "3px",
        textTransform: "uppercase",
        marginBottom: "32px",
      }}>
        TRUSTED BY BUSINESSES ACROSS THE USA & CANADA
      </p>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "48px",
      }}>
        {clients.map((client) => (
          <div
            key={client.name}
            style={{
              opacity: 0.7,
              transition: "opacity 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            {client.logo}
          </div>
        ))}
      </div>
    </section>
  );
}
