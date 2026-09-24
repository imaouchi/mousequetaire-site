"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import MediaCarousel from "./MediaCarousel";

const LIKES_KEY = "mq-portfolio-likes";

function readLikes() {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY) || "[]");
  } catch {
    return [];
  }
}

function useLike(id) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(readLikes().includes(id));
  }, [id]);

  const set = (value) => {
    setLiked(value);
    try {
      const others = readLikes().filter((x) => x !== id);
      localStorage.setItem(LIKES_KEY, JSON.stringify(value ? [...others, id] : others));
    } catch {
      // stockage indisponible (navigation privée…) : le like reste local à la page
    }
  };

  return [liked, set];
}

export const hashtag = (tech) =>
  "#" + tech.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");

export function Avatar({ size = 32, ring = true }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full ${
        ring ? "bg-linear-to-tr from-sky-400 via-indigo-500 to-fuchsia-500 p-[2px]" : ""
      }`}
      style={{ width: size, height: size }}
    >
      <span className="relative block h-full w-full overflow-hidden rounded-full border-2 border-[#050610] bg-white">
        <Image src="/images/portfolio/avatar.webp" alt="Mousequetaire" fill sizes={`${size}px`} />
      </span>
    </span>
  );
}

function PostHeader({ project, className = "" }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${className}`}>
      <Avatar size={34} />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="text-sm font-semibold text-white">mousequetaire</p>
        <p className="truncate text-xs text-white/55">{project.client}</p>
      </div>
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
        aria-hidden
      />
    </div>
  );
}

export default function PostView({ project, variant = "modal", className = "" }) {
  const [liked, setLiked] = useLike(project.id);
  const [burst, setBurst] = useState(0);
  const [toast, setToast] = useState("");
  const Title = variant === "page" ? "h1" : "h2";

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const likeFromMedia = () => {
    setLiked(true);
    setBurst((n) => n + 1);
  };

  const share = async () => {
    const url = `${window.location.origin}/portfolio/${project.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${project.title} — Mousequetaire`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast("Lien copié");
    } catch {
      // partage annulé par l'utilisateur
    }
  };

  return (
    <article
      className={`relative flex flex-col overflow-hidden bg-[#0b0d18] text-white md:flex-row ${className}`}
    >
      <PostHeader project={project} className="border-b border-white/10 md:hidden" />

      <div
        className="relative aspect-4/3 w-full select-none overflow-hidden bg-black md:h-full md:w-auto md:min-w-0 md:shrink md:grow"
        onDoubleClick={likeFromMedia}
      >
        {/* fond flou aux couleurs du projet, visible autour du visuel */}
        <Image
          src={project.cover}
          alt=""
          aria-hidden
          fill
          sizes="300px"
          className="scale-125 object-cover opacity-45 blur-2xl"
        />
        <MediaCarousel images={project.gallery} title={project.title} priority />
        {burst > 0 && (
          <HeartSolid
            key={burst}
            className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-2xl"
            style={{ animation: "mq-heart 0.9s ease-out forwards" }}
          />
        )}
      </div>

      <div className="flex w-full flex-col md:min-h-0 md:w-[380px] md:shrink-0 md:border-l md:border-white/10 lg:w-[440px]">
        <PostHeader project={project} className="hidden border-b border-white/10 md:flex" />

        {/* Actions — en premier sur mobile, comme sous une photo Instagram */}
        <div className="order-first flex items-center gap-4 px-4 pt-3 md:order-none md:hidden">
          <Actions {...{ liked, setLiked, share, project, variant }} />
        </div>

        <div className="space-y-5 px-4 py-4 [scrollbar-width:thin] md:min-h-0 md:flex-1 md:overflow-y-auto">
          <div className="flex gap-3">
            <span className="hidden md:block">
              <Avatar size={32} ring={false} />
            </span>
            <div className="min-w-0 space-y-2 text-sm leading-relaxed">
              <Title className="text-lg font-bold leading-snug text-white md:text-xl">
                {project.title}
              </Title>
              <p>
                <span className="mr-1.5 font-semibold">mousequetaire</span>
                <span className="text-white/85">{project.excerpt}</span>
              </p>
              <p className="text-white/70">{project.description}</p>
              <p className="flex flex-wrap gap-x-2 gap-y-1 font-medium text-sky-300">
                {project.technologies.map((t) => (
                  <span key={t}>{hashtag(t)}</span>
                ))}
              </p>
            </div>
          </div>

          <dl className="space-y-3 border-t border-white/10 pt-4 text-sm">
            {[
              ["Le défi", project.challenge],
              ["Notre solution", project.solution],
              ["Le résultat", project.results],
            ].map(([label, text]) =>
              text ? (
                <div key={label} className="rounded-2xl bg-white/4 p-3.5 ring-1 ring-white/8">
                  <dt
                    className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: project.accent }}
                  >
                    {label}
                  </dt>
                  <dd className="text-white/75">{text}</dd>
                </div>
              ) : null
            )}
          </dl>
        </div>

        <div className="border-t border-white/10 px-4 pb-4 pt-3">
          <div className="hidden items-center gap-4 md:flex">
            <Actions {...{ liked, setLiked, share, project, variant }} />
          </div>
          <p className="mt-2 text-xs uppercase tracking-wide text-white/45">
            {project.year} · {project.client}
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-[#041018] transition hover:bg-sky-400"
              >
                {project.linkLabel || "Voir le projet"}
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            )}
            <Link
              href="/contact"
              className="flex flex-1 items-center justify-center rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Un projet similaire ?
            </Link>
          </div>
        </div>
      </div>

      {toast && (
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-xl">
          {toast}
        </div>
      )}
    </article>
  );
}

function Actions({ liked, setLiked, share, project, variant }) {
  return (
    <>
      <button
        type="button"
        onClick={() => setLiked(!liked)}
        aria-pressed={liked}
        aria-label={liked ? "Je n'aime plus" : "J'aime"}
        className="transition active:scale-90"
      >
        {liked ? (
          <HeartSolid className="h-7 w-7 text-rose-500" style={{ animation: "mq-pop 0.35s ease-out" }} />
        ) : (
          <HeartIcon className="h-7 w-7 hover:text-white/60" />
        )}
      </button>
      <Link href="/contact" aria-label="Nous écrire à propos de ce projet" className="hover:text-white/60">
        <ChatBubbleOvalLeftIcon className="h-7 w-7 -scale-x-100" />
      </Link>
      <button type="button" onClick={share} aria-label="Partager" className="hover:text-white/60">
        <PaperAirplaneIcon className="h-7 w-7 -rotate-[25deg]" />
      </button>
      {variant === "modal" && (
        <Link
          href={`/portfolio/${project.id}`}
          aria-label="Ouvrir la page du projet"
          className="ml-auto hover:text-white/60"
        >
          <BookmarkIcon className="h-7 w-7" />
        </Link>
      )}
    </>
  );
}
