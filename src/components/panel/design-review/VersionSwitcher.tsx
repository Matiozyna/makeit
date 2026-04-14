interface VersionSwitcherProps {
  versions: string[];
  active: number;
  onSelect: (index: number) => void;
}

export default function VersionSwitcher({ versions, active, onSelect }: VersionSwitcherProps) {
  return (
    <div className="flex gap-1 bg-[#F5F7FA] rounded-full p-1">
      {versions.map((v, i) => (
        <button
          key={v}
          onClick={() => onSelect(i)}
          className={`font-sans text-[13px] font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
            i === active
              ? "bg-[#111111] text-white shadow-sm"
              : "text-[#6B7280] hover:text-[#111111]"
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
}
