"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface DesignViewerProps {
  src: string;
  alt: string;
}

export default function DesignViewer({ src, alt }: DesignViewerProps) {
  const [zoom, setZoom] = useState(1);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const resetZoom = () => setZoom(1);

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full">
      {/* Zoom controls */}
      <div className="flex items-center gap-1 px-6 py-3 border-b border-[#E5E7EB] bg-white">
        <button
          onClick={zoomOut}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111111] hover:bg-[#F5F7FA] transition-all duration-200"
        >
          <ZoomOut className="w-4 h-4" strokeWidth={1.75} />
        </button>
        <span className="font-sans text-[12px] font-medium text-[#9CA3AF] w-12 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={zoomIn}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111111] hover:bg-[#F5F7FA] transition-all duration-200"
        >
          <ZoomIn className="w-4 h-4" strokeWidth={1.75} />
        </button>
        <div className="w-px h-4 bg-[#E5E7EB] mx-1" />
        <button
          onClick={resetZoom}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111111] hover:bg-[#F5F7FA] transition-all duration-200"
        >
          <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
        </button>
      </div>

      {/* Image canvas */}
      <div className="flex-1 overflow-auto bg-[#F5F7FA] flex items-center justify-center p-8">
        <div
          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[16px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.06)]"
          style={{ transform: `scale(${zoom})` }}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-auto max-w-[900px] h-auto object-contain select-none"
            draggable={false}
            priority
          />
        </div>
      </div>
    </div>
  );
}
