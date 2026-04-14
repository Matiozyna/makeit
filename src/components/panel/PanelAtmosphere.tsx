"use client";

export default function PanelAtmosphere() {
  return (
    <div
      className="absolute inset-x-0 pointer-events-none overflow-hidden"
      style={{ height: "100vh", zIndex: 0 }}
    >
      {/* Blob 1 — purple/indigo, upper right */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          top: -280,
          right: -80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(107,78,255,0.14) 0%, rgba(107,78,255,0.05) 40%, transparent 70%)",
          animation: "panel-drift-1 32s ease-in-out infinite",
        }}
      />

      {/* Blob 2 — blue, lower left */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          bottom: -180,
          left: 60,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(78,168,255,0.12) 0%, rgba(78,168,255,0.04) 40%, transparent 70%)",
          animation: "panel-drift-2 40s ease-in-out infinite",
        }}
      />

      {/* Blob 3 — lavender, center-right */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          top: "35%",
          right: "22%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(155,102,255,0.09) 0%, transparent 65%)",
          animation: "panel-drift-3 26s ease-in-out infinite",
        }}
      />
    </div>
  );
}
