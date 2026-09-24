"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { portfolioItems } from "@/data/portfolioItems";
import PostGrid from "@/components/portfolio/PostGrid";
import PostView, { Avatar } from "@/components/portfolio/PostView";

export default function ProjectDetailsClient({ project }) {
  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050610] px-6 text-center text-white">
        <h1 className="text-2xl font-semibold">Cette publication n&apos;est pas disponible.</h1>
        <p className="mt-3 text-white/60">
          Le lien est peut-être cassé, ou le projet a été retiré du portfolio.
        </p>
        <Link
          href="/portfolio"
          className="mt-8 rounded-lg bg-sky-500 px-5 py-2 text-sm font-semibold text-[#041018] hover:bg-sky-400"
        >
          Retour au portfolio
        </Link>
      </div>
    );
  }

  const index = portfolioItems.findIndex((p) => p.id === project.id);
  const prev = portfolioItems[index - 1];
  const next = portfolioItems[index + 1];
  const more = portfolioItems
    .filter((p) => p.id !== project.id)
    .sort(
      (a, b) =>
        b.categories.filter((c) => project.categories.includes(c)).length -
        a.categories.filter((c) => project.categories.includes(c)).length
    )
    .slice(0, 6);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050610] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[100px] h-[900px]"
        style={{
          background: `radial-gradient(45% 50% at 50% 40%, ${project.accent}24, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-[975px] pb-24 pt-24 md:px-8 md:pt-32 lg:max-w-[1180px] 2xl:max-w-[1320px]">
        <Link
          href="/portfolio"
          className="mb-4 inline-flex items-center gap-2 px-4 text-sm font-semibold text-white/80 hover:text-white md:px-0"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Toutes les publications
        </Link>

        <PostView
          project={project}
          variant="page"
          className="border-y border-white/10 md:h-[540px] md:rounded-2xl md:border md:shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)] 2xl:h-[620px]"
        />

        <div className="mt-4 flex justify-between px-4 text-sm font-semibold md:px-0">
          {prev ? (
            <Link href={`/portfolio/${prev.id}`} className="text-white/70 hover:text-white">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/portfolio/${next.id}`} className="text-right text-white/70 hover:text-white">
              {next.title} →
            </Link>
          )}
        </div>

        <section className="mt-14 border-t border-white/10 pt-8">
          <h2 className="mb-5 flex items-center gap-2 px-4 text-sm font-semibold text-white/60 md:px-0">
            <Avatar size={24} ring={false} />
            Plus de publications de <span className="text-white">mousequetaire</span>
          </h2>
          <PostGrid items={more} showPins={false} />
        </section>
      </div>
    </div>
  );
}
