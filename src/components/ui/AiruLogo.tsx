import Link from "next/link";

interface AiruLogoProps {
  as?: "link" | "div";
  className?: string;
}

export default function AiruLogo({ as = "link", className = "" }: AiruLogoProps) {
  const content = (
    <>
      AIRU<span className="text-primary">.</span>
    </>
  );

  if (as === "link") {
    return (
      <Link
        href="/"
        className={`font-black text-xl transform -rotate-2 hover:rotate-0 transition-transform text-ink ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`font-black text-xl transform -rotate-2 ${className}`}>
      {content}
    </div>
  );
}
