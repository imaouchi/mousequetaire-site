"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
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
      {/* ambiance : halo doux sous la barre de navigation + trame de points */}
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

      <div className="relative mx-auto max-w-[975px] px-0 pb-24 pt-28 sm:px-5 md:px-8 md:pt-28 lg:max-w-[1180px] 2xl:max-w-[1320px]">
        {/* ---------- En-tête du profil : mobile ---------- */}
        <header className="flex gap-5 px-4 sm:gap-10 sm:px-0 md:hidden">
          <Avatar size={86} />
          <div className="min-w-0 flex-1 space-y-3">
            <h1 className="text-xl font-medium tracking-tight">mousequetaire</h1>
            <ProfileButtons />
          </div>
        </header>

        <div className="mt-4 px-4 text-sm leading-relaxed md:hidden">
          <Bio />
        </div>

        <ul className="mt-5 grid grid-cols-3 border-y border-white/10 py-3 text-center text-sm md:hidden">
          {stats.map((s) => (
            <li key={s.label} className="flex flex-col">
              <span className="font-semibold">{s.value}</span>
              <span className="text-white/60">{s.label}</span>
            </li>
          ))}
        </ul>

        {/* ---------- En-tête du profil : ordinateur ---------- */}
        <header
          className="relative hidden items-center gap-12 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-10 shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)] backdrop-blur-xl md:flex lg:gap-16 lg:p-12"
          style={{ animation: "mq-rise 0.6s both cubic-bezier(.2,.7,.2,1)" }}
        >
          <span
            aria-hidden
            className="absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-sky-400/70 to-transparent"
          />
          <span
            aria-hidden
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"
          />

          <div className="relative shrink-0">
            <span aria-hidden className="absolute -inset-4 rounded-full bg-sky-500/20 blur-2xl" />
            <span className="relative block h-[168px] w-[168px] lg:h-[184px] lg:w-[184px]">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#38bdf8,#6366f1,#d946ef,#f59e0b,#38bdf8)]"
                style={{ animation: "mq-spin 12s linear infinite" }}
              />
              <span className="absolute inset-[3px] overflow-hidden rounded-full border-[5px] border-[#0b0e1a] bg-white">
                <Image src="/images/portfolio/avatar.webp" alt="Mousequetaire" fill sizes="184px" priority />
              </span>
            </span>
          </div>

          <div className="relative min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  Disponibles pour vos projets
                </p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight lg:text-5xl">mousequetaire</h1>
                <p className="mt-2 text-white/55">Agence web & IA · Île-de-France</p>
              </div>
              <ProfileButtons large />
            </div>

            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/75">
              Sites vitrines, applications sur mesure, IA et e-commerce — du croquis à la mise en
              ligne. Tous pour un, un site pour tous. 🐭⚔️
            </p>

            <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <dd className="text-3xl font-semibold tabular-nums tracking-tight">{s.value}</dd>
                  <dt className="mt-0.5 text-xs uppercase tracking-[0.14em] text-white/50">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* ---------- Stories à la une : filtres par catégorie ---------- */}
        <nav
          aria-label="Catégories"
          className="mt-6 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:gap-8 sm:px-0 md:mt-12 md:justify-center md:gap-10 md:overflow-visible [&::-webkit-scrollbar]:hidden"
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
                className="group flex w-16 shrink-0 flex-col items-center gap-1.5 sm:w-20 md:w-24"
              >
                <span
                  className={`rounded-full p-[2.5px] transition duration-300 md:group-hover:-translate-y-1 ${
                    active
                      ? "bg-linear-to-tr from-sky-400 via-indigo-500 to-fuchsia-500 md:shadow-[0_10px_30px_-8px_rgba(99,102,241,.8)]"
                      : "bg-white/15 group-hover:bg-white/35"
                  }`}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#050610] bg-[#10131f] sm:h-[70px] sm:w-[70px] md:h-[78px] md:w-[78px]">
                    <Icon
                      className={`h-6 w-6 transition sm:h-7 sm:w-7 ${
                        active ? "text-white" : "text-white/70 group-hover:text-white"
                      }`}
                    />
                  </span>
                </span>
                <span
                  className={`max-w-full truncate text-xs md:text-[13px] ${active ? "font-semibold text-white" : "text-white/75"}`}
                >
                  {c.label}
                </span>
                <span className="hidden text-[11px] tabular-nums text-white/35 md:block">
                  {count} projet{count > 1 ? "s" : ""}
                </span>
                <span className="sr-only md:hidden">{count} projets</span>
              </button>
            );
          })}
        </nav>

        {/* ---------- Onglets ---------- */}
        <div className="relative mt-4 flex items-center border-t border-white/10 md:mt-10">
          <div role="tablist" className="flex flex-1 justify-around md:justify-center md:gap-14">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`-mt-px flex items-center gap-1.5 border-t py-3.5 text-xs font-semibold uppercase tracking-[0.12em] transition md:py-4 ${
                  tab === id ? "border-white text-white" : "border-transparent text-white/45 hover:text-white/70"
                }`}
              >
                <Icon className="h-5 w-5 md:h-4 md:w-4" />
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
          </div>
          <span className="absolute right-0 hidden text-xs tabular-nums text-white/40 md:block">
            {visible.length} publication{visible.length > 1 ? "s" : ""}
          </span>
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
          className="fixed inset-0 z-[4000] flex items-center justify-center bg-[#03040a]/85 backdrop-blur-md md:p-10"
          style={{ animation: "mq-fade 0.2s ease-out" }}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute right-5 top-5 hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:rotate-90 hover:bg-white/20 md:flex"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {pos > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Projet précédent"
              className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur transition hover:scale-105 hover:bg-white/20 md:flex lg:left-8"
            >
              <ChevronLeftIcon className="h-6 w-6" />
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
              className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur transition hover:scale-105 hover:bg-white/20 md:flex lg:right-8"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}

          <div
            className="flex h-full w-full flex-col overflow-y-auto bg-[#0b0d18] md:h-[min(84vh,860px)] md:w-auto md:max-w-[calc(100vw-10rem)] md:overflow-hidden md:rounded-2xl md:border md:border-white/10 md:shadow-[0_50px_120px_-20px_rgba(0,0,0,.9)]"
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
          {/* Aide clavier (ordinateur) */}
          <p className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs text-white/40 md:flex">
            <span className="tabular-nums text-white/60">
              {pos + 1} / {list.length}
            </span>
            <span aria-hidden>·</span>
            <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-sans">←</kbd>
            <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-sans">→</kbd>
            naviguer
            <span aria-hidden>·</span>
            <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-sans">Échap</kbd>
            fermer
          </p>
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

function ProfileButtons({ large = false }) {
  const size = large ? "rounded-xl px-5 py-2.5" : "rounded-lg px-4 py-1.5";
  return (
    <div className="flex gap-2">
      <Link
        href="/contact"
        className={`${size} bg-sky-500 text-sm font-semibold text-[#041018] transition hover:bg-sky-400 ${
          large ? "shadow-[0_10px_30px_-10px_rgba(56,189,248,.9)] hover:-translate-y-0.5" : ""
        }`}
      >
        Nous contacter
      </Link>
      <a
        href="https://instagram.com/mousequetaire"
        target="_blank"
        rel="noopener noreferrer"
        className={`${size} border border-white/10 bg-white/10 text-sm font-semibold transition hover:bg-white/15 ${
          large ? "hover:-translate-y-0.5" : ""
        }`}
      >
        Instagram
      </a>
    </div>
  );
}
