"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  BeakerIcon,
  BriefcaseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
  SparklesIcon,
  Squares2X2Icon,
  WindowIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PostGrid from "./PostGrid";
import PostView, { Avatar } from "./PostView";

const HIGHLIGHT_ICONS = {
  all: Squares2X2Icon,
  web: GlobeAltIcon,
  apps: WindowIcon,
  ia: CpuChipIcon,
  ecommerce: ShoppingBagIcon,
  creatif: SparklesIcon,
};

const PERSONAL = ["Projet personnel", "Projet artistique", "Mousequetaire"];

const TABS = [
  { id: "all", label: "Publications", Icon: Squares2X2Icon, test: () => true },
  { id: "clients", label: "Clients", Icon: BriefcaseIcon, test: (p) => !PERSONAL.includes(p.client) },
  { id: "labo", label: "Labo", Icon: BeakerIcon, test: (p) => PERSONAL.includes(p.client) },
];

export default function PortfolioProfile({ items, categories }) {
  const [category, setCategory] = useState("all");
  const [tab, setTab] = useState("all");
  const [openId, setOpenId] = useState(null);
  const pushed = useRef(false);

  const visible = useMemo(() => {
    const tabTest = TABS.find((t) => t.id === tab).test;
    return items.filter(
      (p) => tabTest(p) && (category === "all" || p.categories.includes(category))
    );
  }, [items, tab, category]);

  const stats = useMemo(
    () => [
      { value: items.length, label: "projets" },
      {
        value: new Set(items.filter((p) => !PERSONAL.includes(p.client)).map((p) => p.client)).size,
        label: "clients",
      },
      { value: new Set(items.flatMap((p) => p.technologies)).size, label: "technologies" },
    ],
    [items]
  );

  const openProject = visible.find((p) => p.id === openId) || items.find((p) => p.id === openId);

  // --- ouverture / fermeture synchronisées avec l'URL, comme Instagram
  const open = useCallback((item) => {
    setOpenId(item.id);
    const url = `/portfolio/${item.id}`;
    if (pushed.current) {
      window.history.replaceState(window.history.state, "", url);
    } else {
      window.history.pushState(window.history.state, "", url);
      pushed.current = true;
    }
  }, []);

  const close = useCallback(() => {
    if (pushed.current) {
      window.history.back();
    } else {
      setOpenId(null);
    }
  }, []);

  const step = useCallback(
    (dir) => {
      const list = visible.some((p) => p.id === openId) ? visible : items;
      const i = list.findIndex((p) => p.id === openId);
      const next = list[i + dir];
      if (next) open(next);
    },
    [visible, items, openId, open]
  );

  useEffect(() => {
    const onPop = () => {
      if (!/^\/portfolio\/\d+/.test(window.location.pathname)) {
        pushed.current = false;
        setOpenId(null);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (openId == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId, close, step]);

  const list = openProject && visible.some((p) => p.id === openId) ? visible : items;
  const pos = openProject ? list.findIndex((p) => p.id === openId) : -1;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050610] text-white">
      {/* halo d'ambiance */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-sky-500/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[975px] px-0 pb-24 pt-28 sm:px-5 md:pt-32">
        {/* ---------- En-tête du profil ---------- */}
        <header className="flex gap-5 px-4 sm:gap-10 sm:px-0 md:gap-20 md:px-10">
          <div className="shrink-0">
            <span className="hidden md:block">
              <Avatar size={150} />
            </span>
            <span className="md:hidden">
              <Avatar size={86} />
            </span>
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="mr-2 text-xl font-medium tracking-tight sm:text-2xl">mousequetaire</h1>
              <div className="flex gap-2">
                <Link
                  href="/contact"
                  className="rounded-lg bg-sky-500 px-4 py-1.5 text-sm font-semibold text-[#041018] transition hover:bg-sky-400"
                >
                  Nous contacter
                </Link>
                <a
                  href="https://instagram.com/mousequetaire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white/10 px-4 py-1.5 text-sm font-semibold transition hover:bg-white/15"
                >
                  Instagram
                </a>
              </div>
            </div>

            <ul className="hidden gap-10 md:flex">
              {stats.map((s) => (
                <li key={s.label}>
                  <span className="font-semibold">{s.value}</span>{" "}
                  <span className="text-white/70">{s.label}</span>
                </li>
              ))}
            </ul>

            <div className="hidden text-sm leading-relaxed md:block">
              <Bio />
            </div>
          </div>
        </header>

        <div className="mt-4 px-4 text-sm leading-relaxed md:hidden">
          <Bio />
        </div>

        {/* ---------- Stats mobile ---------- */}
        <ul className="mt-5 grid grid-cols-3 border-y border-white/10 py-3 text-center text-sm md:hidden">
          {stats.map((s) => (
            <li key={s.label} className="flex flex-col">
              <span className="font-semibold">{s.value}</span>
              <span className="text-white/60">{s.label}</span>
            </li>
          ))}
        </ul>

        {/* ---------- Stories à la une : filtres par catégorie ---------- */}
        <nav
          aria-label="Catégories"
          className="mt-6 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:gap-8 sm:px-0 md:mt-12 md:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c) => {
            const Icon = HIGHLIGHT_ICONS[c.id] || SparklesIcon;
            const active = category === c.id;
            const count =
              c.id === "all" ? items.length : items.filter((p) => p.categories.includes(c.id)).length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={active}
                className="group flex w-16 shrink-0 flex-col items-center gap-1.5 sm:w-20"
              >
                <span
                  className={`rounded-full p-[2.5px] transition ${
                    active
                      ? "bg-linear-to-tr from-sky-400 via-indigo-500 to-fuchsia-500"
                      : "bg-white/15 group-hover:bg-white/30"
                  }`}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#050610] bg-[#10131f] sm:h-[70px] sm:w-[70px]">
                    <Icon
                      className={`h-6 w-6 transition sm:h-7 sm:w-7 ${
                        active ? "text-white" : "text-white/70 group-hover:text-white"
                      }`}
                    />
                  </span>
                </span>
                <span
                  className={`max-w-full truncate text-xs ${active ? "font-semibold text-white" : "text-white/75"}`}
                >
                  {c.label}
                </span>
                <span className="sr-only">{count} projets</span>
              </button>
            );
          })}
        </nav>

        {/* ---------- Onglets ---------- */}
        <div
          role="tablist"
          className="mt-4 flex justify-around border-t border-white/10 md:mt-8 md:justify-center md:gap-14"
        >
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`-mt-px flex items-center gap-1.5 border-t py-3.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                tab === id ? "border-white text-white" : "border-transparent text-white/45 hover:text-white/70"
              }`}
            >
              <Icon className="h-5 w-5 md:h-3.5 md:w-3.5" />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
        </div>

        {visible.length ? (
          <PostGrid key={`${tab}-${category}`} items={visible} onOpen={open} showPins={tab === "all" && category === "all"} />
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg font-semibold">Aucune publication ici… pour l&apos;instant.</p>
            <p className="mt-2 text-sm text-white/60">Et si votre projet était le prochain ?</p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-lg bg-sky-500 px-5 py-2 text-sm font-semibold text-[#041018] hover:bg-sky-400"
            >
              Parlons-en
            </Link>
          </div>
        )}
      </div>

      {/* ---------- Publication ouverte ---------- */}
      {openProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openProject.title}
          className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/80 backdrop-blur-sm md:p-10"
          style={{ animation: "mq-fade 0.2s ease-out" }}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute right-4 top-4 hidden text-white/90 hover:text-white md:block"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          {pos > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Projet précédent"
              className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-white/85 md:flex lg:left-6"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          )}
          {pos < list.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Projet suivant"
              className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-white/85 md:flex lg:right-6"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          )}

          <div
            className="flex h-full w-full flex-col overflow-y-auto bg-[#0b0d18] md:h-[min(88vh,820px)] md:max-w-[1240px] md:overflow-hidden md:rounded-md md:shadow-2xl"
            style={{ animation: "mq-zoom 0.25s cubic-bezier(.2,.7,.2,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barre de retour mobile */}
            <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-white/10 bg-[#0b0d18]/95 px-3 py-3 backdrop-blur md:hidden">
              <button type="button" onClick={close} aria-label="Retour">
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <span className="flex-1 text-center text-base font-semibold">Publications</span>
              <span className="w-6" />
            </div>

            <PostView key={openProject.id} project={openProject} className="shrink-0 md:h-full md:shrink" />

            {/* Navigation mobile entre projets */}
            <div className="flex justify-between gap-3 border-t border-white/10 px-4 py-4 md:hidden">
              <button
                type="button"
                disabled={pos <= 0}
                onClick={() => step(-1)}
                className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold disabled:opacity-30"
              >
                <ChevronLeftIcon className="h-4 w-4" /> Précédent
              </button>
              <button
                type="button"
                disabled={pos >= list.length - 1}
                onClick={() => step(1)}
                className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold disabled:opacity-30"
              >
                Suivant <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Bio() {
  return (
    <>
      <p className="font-semibold">Mousequetaire · Agence web & IA</p>
      <p className="text-white/50">Île-de-France</p>
      <p className="mt-1 text-white/85">
        Sites vitrines, applications sur mesure, IA et e-commerce — du croquis à la mise en ligne.
        <br />
        Tous pour un, un site pour tous. 🐭⚔️
      </p>
      <Link href="/nosservices" className="mt-1 inline-block font-semibold text-sky-300 hover:underline">
        mousequetaire.com/nosservices
      </Link>
    </>
  );
}
