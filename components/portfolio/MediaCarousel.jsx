"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// Carrousel à défilement natif (scroll-snap) : swipe au doigt, flèches au
// clavier/souris, points de pagination façon Instagram.
export default function MediaCarousel({ images, title, priority = false, sizes }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    setIndex(0);
  }, [images]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const go = (i) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const many = images.length > 1;

  return (
    <div className="group/carousel relative h-full w-full">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div key={src} className="relative h-full w-full shrink-0 snap-center">
            <Image
              src={src}
              alt={`${title} — visuel ${i + 1} sur ${images.length}`}
              fill
              priority={priority && i === 0}
              sizes={sizes || "(max-width: 768px) 100vw, 60vw"}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {many && (
        <>
          {index > 0 && (
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Visuel précédent"
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-black shadow-lg transition hover:bg-white md:opacity-0 md:group-hover/carousel:opacity-100"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
          )}
          {index < images.length - 1 && (
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Visuel suivant"
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-black shadow-lg transition hover:bg-white md:opacity-0 md:group-hover/carousel:opacity-100"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          )}
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/45"
                }`}
              />
            ))}
          </div>
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium tabular-nums text-white backdrop-blur">
            {index + 1}/{images.length}
          </span>
        </>
      )}
    </div>
  );
}
