import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { InstallCommand } from "@/components/install-command";
import { SectionPreview } from "@/components/section-preview";
import { catalog } from "@/lib/catalog";

const HomePage = () => (
  <main className="mx-auto max-w-6xl px-5 py-8 sm:px-10">
    <header className="flex items-center justify-between gap-6 border-b border-white/15 pb-6">
      <Link href="/" className="text-lg font-bold tracking-tight">
        k. <span className="font-normal text-zinc-400">/ reusable</span>
      </Link>
      <a
        href="https://ui.kitze.io"
        className="inline-flex items-center gap-2 text-sm text-lime-200"
      >
        Kitze UI <ArrowUpRight size={16} />
      </a>
    </header>
    <h1 className="py-10 text-3xl font-semibold tracking-tight">
      Kitze reusable UI
    </h1>
    <section id="sections" className="divide-y divide-white/15">
      {catalog.map((item) => (
        <article
          key={item.name}
          id={item.name}
          className="scroll-mt-6 py-10 sm:py-14"
        >
          <div className="mb-6 grid gap-5 sm:grid-cols-[1fr_1.6fr] sm:gap-12">
            <div>
              <h2 className="text-2xl font-medium tracking-tight">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </div>
            <div className="min-w-0">
              <InstallCommand name={item.name} />
              <a
                href={`https://github.com/kitze/kitze-reusable-ui/tree/main/registry/new-york/${item.name}`}
                className="mt-3 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white"
              >
                View source <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
          <SectionPreview name={item.name} />
        </article>
      ))}
    </section>
    <footer className="flex flex-wrap justify-between gap-4 border-t border-white/15 py-8 text-xs text-zinc-500">
      <a
        href="https://github.com/kitze/kitze-reusable-ui"
        className="hover:text-white"
      >
        Source on GitHub ↗
      </a>
    </footer>
  </main>
);

export default HomePage;
