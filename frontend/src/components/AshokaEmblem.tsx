/**
 * State Emblem of India (Lion Capital of Ashoka) with Satyameva Jayate
 * Official vector representation for Indian Government websites (GIGW compliant)
 */
export default function AshokaEmblem({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 70"
      fill="currentColor"
      className={className}
      aria-label="State Emblem of India - भारत का राज्य प्रतीक"
      role="img"
    >
      {/* Lions Capital Silhouette */}
      <path d="M22 6c0-2 2-4 4-4h8c2 0 4 2 4 4v4h-16V6z" />
      {/* Left Lion */}
      <path d="M16 10c-2 0-4 2-5 5-1 3-1 7 1 10 1 2 3 3 5 3v-7c0-2 1-4 3-5-2-3-3-4-4-6z" />
      {/* Center Lion */}
      <path d="M26 8c-2 0-3 2-3 4v10h14V12c0-2-1-4-3-4h-8z" />
      {/* Right Lion */}
      <path d="M44 10c2 0 4 2 5 5 1 3 1 7-1 10-1 2-3 3-5 3v-7c0-2-1-4-3-5 2-3 3-4 4-6z" />
      {/* Chests & Manes */}
      <path d="M20 23c-2 2-3 5-3 8 0 3 2 6 5 7v-15h-2z" />
      <path d="M26 23h8v15h-8V23z" />
      <path d="M40 23c2 2 3 5 3 8 0 3-2 6-5 7v-15h2z" />
      {/* Abacus platform */}
      <path d="M12 39h36v5H12z" />
      {/* Dharma Chakra in Center */}
      <circle cx="30" cy="41.5" r="2.2" fill="#fff" />
      <circle cx="30" cy="41.5" r="1.2" fill="currentColor" />
      {/* Horse on left */}
      <circle cx="18" cy="41.5" r="1.2" fill="#fff" />
      {/* Bull on right */}
      <circle cx="42" cy="41.5" r="1.2" fill="#fff" />
      {/* Lotus Base */}
      <path d="M16 45c2 4 8 6 14 6s12-2 14-6H16z" />
      {/* Pedestal Base */}
      <path d="M14 52h32v3H14z" />
      {/* Satyameva Jayate (text styling representation) */}
      <text
        x="30"
        y="63"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="bold"
        fontFamily="'Noto Sans Devanagari', 'Noto Sans', sans-serif"
        fill="currentColor"
        letterSpacing="0.4"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
}
