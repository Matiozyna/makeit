interface VersionSwitcherProps {
  versions: string[];
  active: number;
  onSelect: (index: number) => void;
}

export default function VersionSwitcher({ versions, active, onSelect }: VersionSwitcherProps) {
  return (
    <div className="flex gap-0.5 bg-[#F0F0F0] rounded-lg p-0.5">
      {versions.map((v, i) => (
        <button
          key={v}
          onClick={() => onSelect(i)}
          className={`font-sans text-[13px] font-medium px-3.5 py-1.5 rounded-md transition-all duration-150 ${
            i === active
              ? "bg-white text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
              : "text-[#888888] hover:text-[#111111]"
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
}
