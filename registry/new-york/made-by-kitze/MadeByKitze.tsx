"use client";

import { SiGithub, SiX, SiYoutube } from "@icons-pack/react-simple-icons";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

import { Spinner } from "@/components/Spinner";
import type { KitzeApp } from "@/components/ui/KitzeAppsProvider";
import { useKitzeApps } from "@/components/ui/KitzeAppsProvider";
import { cn } from "@/lib/utils";

const socials = [
  {
    icon: SiX,
    name: "X",
    url: "https://x.com/thekitze",
  },
  {
    icon: SiGithub,
    name: "GitHub",
    url: "https://github.com/kitze",
  },
  {
    icon: SiYoutube,
    name: "YouTube",
    url: "https://youtube.com/@thekitze",
  },
];
export interface MadeByKitzeProps {
  /** App name to exclude from the list (typically the current app) */
  excludeApp?: string;
  /** Custom apps list (overrides fetched) */
  apps?: KitzeApp[];
  /** Additional className */
  className?: string;
  /** Profile image URL */
  profileImage?: string;
  /** Show "View all projects" link */
  showViewAll?: boolean;
}
export const MadeByKitze = ({
  excludeApp,
  apps: customApps,
  className,
  profileImage = "https://www.kitze.io/avatar.jpg",
  showViewAll = true,
}: MadeByKitzeProps) => {
  const { apps: fetchedApps, isLoading } = useKitzeApps();
  const apps = customApps || fetchedApps;
  const filteredApps = excludeApp
    ? apps.filter((app) => app.name.toLowerCase() !== excludeApp.toLowerCase())
    : apps;
  if (isLoading && !customApps) {
    return (
      <div className="flex justify-center p-8" aria-label="Loading projects">
        <Spinner />
      </div>
    );
  }
  return (
    <section
      className={cn(
        "border-t border-white/5 bg-black py-24 md:py-32",
        className
      )}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16 flex items-center gap-6">
          <Image
            unoptimized
            width={80}
            height={80}
            src={profileImage}
            alt="Kitze"
            className="h-20 w-20 rounded-full border border-white/10"
          />
          <div>
            <div className="mb-1 text-xs font-medium tracking-widest text-zinc-500 uppercase">
              From the maker
            </div>
            <a
              href="https://kitze.io"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">
                More by Kitze
              </h2>
            </a>

            <div className="flex items-center gap-1">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer rounded-lg p-1.5 text-zinc-500 transition-all hover:bg-white/5 hover:text-white"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map((app, index) => (
            <motion.a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="group flex cursor-pointer flex-col rounded-xl border border-white/5 bg-zinc-900/20 p-6 transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/40"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-lg font-semibold text-zinc-200 transition-colors group-hover:text-white">
                  {app.name}
                </h3>
                <ExternalLink className="h-4 w-4 text-zinc-700 transition-colors group-hover:text-zinc-500" />
              </div>

              <p className="mb-2 text-sm font-medium text-zinc-400 transition-colors group-hover:text-zinc-300">
                {app.tagline}
              </p>

              <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
                {app.description}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Footer Link */}
        {showViewAll && (
          <div className="mt-16 text-center">
            <a
              href="https://kitze.io/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-400"
            >
              View all projects <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
