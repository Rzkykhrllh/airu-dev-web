interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({
  children,
  className = "text-3xl font-black mb-6 text-[#0f172a]",
}: SectionHeadingProps) {
  return (
    <h3
      className={className}
      style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}
    >
      {children}
    </h3>
  );
}
