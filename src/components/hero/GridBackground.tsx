import React from "react";

export default function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Horizontal dashed line acting as a separator/ruler just below the header area */}
      <div className="absolute top-[88px] left-0 right-0 border-b border-dashed border-[#D4D4D4] opacity-80" />
      <div className="absolute top-[88px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D4D4D4]" />

      {/* --- LEFT SIDE SVG --- */}
      <svg className="absolute inset-y-0 left-0 w-[500px] h-full opacity-100" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#D4D4D4" strokeWidth="1" fill="none">
          {/* TOP LEFT */}
          <path d="M -50 160 L 140 160 L 220 240 L 320 240" />
          <polygon points="140,160 135,155 135,165" fill="#F9F9F9" stroke="#D4D4D4" />
          <circle cx="220" cy="240" r="3" fill="#D4D4D4" />
          <line x1="320" y1="235" x2="320" y2="245" stroke="#D4D4D4" />

          <path d="M 60 -50 L 60 80 L 140 160" />
          <circle cx="60" cy="80" r="3.5" fill="#F9F9F9" stroke="#D4D4D4" />

          {/* MID/BOTTOM LEFT */}
          <path d="M -50 480 L 100 480 L 180 400 L 280 400" />
          <polygon points="100,480 95,475 95,485" fill="#F9F9F9" stroke="#D4D4D4" />
          <circle cx="180" cy="400" r="3" fill="#D4D4D4" />
          <line x1="280" y1="395" x2="280" y2="405" stroke="#D4D4D4" />

          <path d="M 60 800 L 60 520 L 180 400" />
          <circle cx="60" cy="520" r="3.5" fill="#F9F9F9" stroke="#D4D4D4" />
        </g>
      </svg>

      {/* --- RIGHT SIDE SVG --- */}
      <svg className="absolute inset-y-0 right-0 w-[500px] h-full opacity-100" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#D4D4D4" strokeWidth="1" fill="none">
          {/* TOP RIGHT */}
          <path d="M 550 160 L 360 160 L 280 240 L 180 240" />
          <polygon points="360,160 365,155 365,165" fill="#F9F9F9" stroke="#D4D4D4" />
          <circle cx="280" cy="240" r="3" fill="#D4D4D4" />
          <line x1="180" y1="235" x2="180" y2="245" stroke="#D4D4D4" />

          <path d="M 440 -50 L 440 80 L 360 160" />
          <circle cx="440" cy="80" r="3.5" fill="#F9F9F9" stroke="#D4D4D4" />

          {/* MID/BOTTOM RIGHT */}
          <path d="M 550 480 L 400 480 L 320 400 L 220 400" />
          <polygon points="400,480 405,475 405,485" fill="#F9F9F9" stroke="#D4D4D4" />
          <circle cx="320" cy="400" r="3" fill="#D4D4D4" />
          <line x1="220" y1="395" x2="220" y2="405" stroke="#D4D4D4" />

          <path d="M 440 800 L 440 520 L 320 400" />
          <circle cx="440" cy="520" r="3.5" fill="#F9F9F9" stroke="#D4D4D4" />
        </g>
      </svg>

      {/* Floating subtle disconnected nodes (adds to the technical feel) */}
      <div className="absolute top-[30%] left-[85%] w-1.5 h-1.5 rounded-full border border-[#D0D0D0] bg-transparent" />
      <div className="absolute top-[65%] left-[12%] w-1.5 h-1.5 rounded-full border border-[#D0D0D0] bg-transparent" />
      <div className="absolute top-[80%] left-[75%] w-1 h-1 rounded-full bg-[#D4D4D4]" />
      <div className="absolute top-[25%] left-[20%] w-1 h-1 rounded-full bg-[#D4D4D4]" />
    </div>
  );
}
