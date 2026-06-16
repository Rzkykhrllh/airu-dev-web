interface SectionHeaderProps {
  label: string;
}

export default function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <div
      className="border-4 border-[#0f172a] bg-white inline-block px-6 py-2 mb-10"
      style={{ boxShadow: "4px 4px 0 rgba(15, 23, 42, 0.3)" }}
    >
      <span className="mono-label font-black text-sm">{label}</span>
    </div>
  );
}
