"use client";

import { usePathname } from "next/navigation";

// Halo + trame de points repris du portfolio (components/portfolio/PortfolioProfile.jsx)
// pour une ambiance cohérente sur tout le site. Masqué sur /portfolio, qui a déjà le sien.
export default function AmbientBackground() {
  const pathname = usePathname();
  if (pathname?.startsWith("/portfolio")) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[100px] h-[900px]"
        style={{
          background:
            "radial-gradient(45% 50% at 50% 40%, rgba(56,189,248,.13), transparent 70%), radial-gradient(30% 35% at 80% 30%, rgba(217,70,239,.07), transparent 70%), radial-gradient(30% 35% at 20% 55%, rgba(99,102,241,.08), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[100px] hidden h-[900px] opacity-60 md:block"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(60% 55% at 50% 35%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(60% 55% at 50% 35%, #000 20%, transparent 75%)",
        }}
      />
    </>
  );
}
