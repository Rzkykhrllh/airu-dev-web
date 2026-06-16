"use client";

import Link from "next/link";

interface MobileNavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  external?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export default function MobileNavLink({
  href,
  label,
  icon,
  external = false,
  active = false,
  onClick,
}: MobileNavLinkProps) {
  const base = `${icon ? "flex items-center gap-2" : "block"} text-sm font-bold mono-label px-4 py-3 border-2 border-ink transition-all`;
  const state = active
    ? "bg-primary text-paper"
    : "bg-paper text-muted hover:bg-paper-soft";
  const className = `${base} ${state}`;

  const content = (
    <>
      {icon}
      {label}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {content}
      </a>
    );
  }

  if (href.includes("#")) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {content}
    </Link>
  );
}
