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
      <div className="flex items-center gap-1 px-5 py-2.5 border-b border-[#EBEBEB] bg-white">
        <button
          onClick={zoomOut}
          className="w-7 h-7 rounded-md flex items-center justify-center text-[#AAAAAA] hover:text-[#111111] hover:bg-[#F5F5F5] transition-all duration-150"
        >
          <ZoomOut className="w-3.5 h-3.5" strokeWidth={1.75} />
        </button>
        <span className="font-sans text-[11px] font-medium text-[#AAAAAA] w-10 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={zoomIn}
          className="w-7 h-7 rounded-md flex items-center justify-center text-[#AAAAAA] hover:text-[#111111] hover:bg-[#F5F5F5] transition-all duration-150"
        >
          <ZoomIn className="w-3.5 h-3.5" strokeWidth={1.75} />
        </button>
        <div className="w-px h-3.5 bg-[#EBEBEB] mx-1" />
        <button
          onClick={resetZoom}
          className="w-7 h-7 rounded-md flex items-center justify-center text-[#AAAAAA] hover:text-[#111111] hover:bg-[#F5F5F5] transition-all duration-150"
        >
          <RotateCcw className="w-3 h-3" strokeWidth={1.75} />
        </button>
      </div>

      {/* Image canvas */}
      <div className="flex-1 overflow-auto bg-[#F5F5F5] flex items-center justify-center p-8">
        <div
          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.05)]"
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
