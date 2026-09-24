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
    <ul className="grid grid-cols-3 gap-0.5 sm:gap-1 md:gap-4 md:pt-2 lg:gap-5">
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
            style={{ "--accent": item.accent }}
            className="group absolute inset-0 overflow-hidden bg-[#0b0d18] outline-none transition duration-500 ease-out focus-visible:ring-2 focus-visible:ring-sky-400 md:rounded-2xl md:ring-1 md:ring-white/10 md:hover:-translate-y-1.5 md:hover:shadow-[0_30px_60px_-25px_var(--accent)] md:hover:ring-white/25"
          >
            <Image
              src={item.cover}
              alt={`${item.title} — ${item.client}`}
              fill
              sizes="(max-width: 768px) 33vw, (max-width: 1536px) 380px, 430px"
              priority={i < 6}
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
            />

            <span className="absolute right-2 top-2 flex gap-1.5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,.7)] md:right-3 md:top-3">
              {showPins && item.pinned && (
                <span className="flex items-center md:h-8 md:w-8 md:justify-center md:rounded-full md:bg-black/35 md:backdrop-blur">
                  <PinIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
                </span>
              )}
              {item.gallery.length > 1 && (
                <span className="flex items-center md:h-8 md:gap-1 md:rounded-full md:bg-black/35 md:px-2.5 md:backdrop-blur">
                  <Square2StackIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
                  <span className="hidden text-xs font-semibold tabular-nums md:inline">{item.gallery.length}</span>
                </span>
              )}
            </span>

            {/* Légende : titre toujours visible, détails dépliés au survol (ordinateur) */}
            <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent px-2 pb-2 pt-10 transition-colors duration-500 sm:px-3 sm:pb-3 md:px-5 md:pb-5 md:pt-24 md:group-hover:from-black/95 md:group-hover:via-black/75">
              <span className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 md:flex">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: item.accent, boxShadow: `0 0 10px ${item.accent}` }}
                />
                {item.year}
              </span>
              <span className="block truncate text-[11px] font-semibold text-white sm:text-sm md:mt-1.5 md:text-lg md:leading-snug">
                {item.title}
              </span>
              <span className="hidden truncate text-xs text-white/60 sm:block md:text-sm">{item.client}</span>

              <span className="hidden grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] md:grid">
                <span className="overflow-hidden">
                  <span className="block pt-3 text-sm leading-relaxed text-white/80">{item.excerpt}</span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {item.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Voir la publication
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
