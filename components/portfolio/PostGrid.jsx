"use client";

import Image from "next/image";
import Link from "next/link";
import { Square2StackIcon } from "@heroicons/react/24/solid";

function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16 3a1 1 0 0 1 .7 1.7L15.4 6l2.3 5.3 1.6.6a1 1 0 0 1 .4 1.6l-2.1 2.1a1 1 0 0 1-1.4 0L13 12.4l-6.3 6.3a1 1 0 1 1-1.4-1.4l6.3-6.3-3.2-3.2a1 1 0 0 1 0-1.4l2.1-2.1a1 1 0 0 1 1.6.4l.6 1.6L18 8.6 16.7 7.3A1 1 0 0 1 16 3Z" />
    </svg>
  );
}

// Grille 3 colonnes au format portrait 3:4, comme un profil Instagram.
// Chaque vignette est un vrai lien (SEO, clic molette) ; onOpen permet
// d'intercepter le clic pour ouvrir la publication en modale.
export default function PostGrid({ items, onOpen, showPins = true }) {
  const handleClick = (e, item) => {
    if (!onOpen || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onOpen(item);
  };

  return (
    <ul className="grid grid-cols-3 gap-0.5 sm:gap-1 md:gap-1.5">
      {items.map((item, i) => (
        <li
          key={item.id}
          className="relative aspect-3/4"
          style={{ animation: `mq-rise 0.5s ${Math.min(i, 11) * 40}ms both cubic-bezier(.2,.7,.2,1)` }}
        >
          <Link
            href={`/portfolio/${item.id}`}
            scroll={false}
            onClick={(e) => handleClick(e, item)}
            className="group absolute inset-0 overflow-hidden bg-[#0b0d18] outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:rounded-sm"
          >
            <Image
              src={item.cover}
              alt={`${item.title} — ${item.client}`}
              fill
              sizes="(max-width: 768px) 33vw, 320px"
              priority={i < 6}
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            />

            <span className="absolute right-2 top-2 flex gap-1.5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,.7)]">
              {showPins && item.pinned && <PinIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
              {item.gallery.length > 1 && <Square2StackIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </span>

            {/* Légende toujours visible en bas, révélée davantage au survol */}
            <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent px-2 pb-2 pt-10 sm:px-3 sm:pb-3">
              <span className="block truncate text-[11px] font-semibold text-white sm:text-sm">
                {item.title}
              </span>
              <span className="hidden truncate text-xs text-white/60 sm:block">
                {item.client} · {item.year}
              </span>
            </span>

            <span className="absolute inset-0 hidden flex-col items-center justify-center gap-3 bg-black/55 p-4 text-center opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 md:flex">
              <span className="text-lg font-bold leading-tight text-white">{item.title}</span>
              <span className="line-clamp-3 max-w-[90%] text-sm text-white/80">{item.excerpt}</span>
              <span className="flex flex-wrap justify-center gap-1.5">
                {item.technologies.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
