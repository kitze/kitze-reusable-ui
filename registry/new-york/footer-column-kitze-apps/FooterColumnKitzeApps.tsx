"use client";

import { ExternalLink } from "lucide-react";

import { useKitzeApps } from "@/components/ui/KitzeAppsProvider";
import { cn } from "@/lib/utils";

export interface KitzeAppLink {
  name: string;
  url: string;
}

export interface FooterColumnKitzeAppsProps {
  /** App name to exclude from the list (typically the current app) */
  excludeApp?: string;
  /** Ref parameter to append to URLs */
  refParam?: string;
  /** Custom apps list (overrides fetched) */
  apps?: KitzeAppLink[];
  /** Custom title */
  title?: string;
  /** Additional className */
  className?: string;
}

export const FooterColumnKitzeApps = ({
  excludeApp,
  refParam,
  apps: customApps,
  title = "More by Kitze",
  className,
}: FooterColumnKitzeAppsProps) => {
  const { apps: fetchedApps, isLoading } = useKitzeApps();

  const apps =
    customApps || fetchedApps.map((a) => ({ name: a.name, url: a.url }));
  const filteredApps = excludeApp
    ? apps.filter((app) => app.name.toLowerCase() !== excludeApp.toLowerCase())
    : apps;

  const getUrl = (url: string) => {
    if (!refParam) {
      return url;
    }
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}ref=${refParam}`;
  };

  if (isLoading && !customApps) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
        {title}
        <span className="text-[10px] font-normal text-zinc-600">&#8599;</span>
      </h4>
      <div className="flex flex-col gap-3 text-sm text-zinc-500">
        {filteredApps.map((app) => (
          <a
            key={app.name}
            href={getUrl(app.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex cursor-pointer items-center gap-1 transition-colors hover:text-white"
          >
            {app.name}
            <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-50" />
          </a>
        ))}
      </div>
    </div>
  );
};
