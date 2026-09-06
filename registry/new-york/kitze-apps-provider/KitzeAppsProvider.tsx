"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { z } from "zod";

export interface KitzeApp {
  name: string;
  tagline: string;
  description: string;
  url: string;
}
const projectSchema = z.object({
  externalUrl: z.string().optional(),
  subtitle: z.string(),
  summary: z.string(),
  title: z.string(),
});

const PROJECTS_API_URL = "https://www.kitze.io/api/projects?apps=true";
interface KitzeAppsContextType {
  apps: KitzeApp[];
  isLoading: boolean;
}
const KitzeAppsContext = createContext<KitzeAppsContextType>({
  apps: [],
  isLoading: true,
});
export const useKitzeApps = () => useContext(KitzeAppsContext);
interface KitzeAppsProviderProps {
  children: ReactNode;
}
export const KitzeAppsProvider = ({ children }: KitzeAppsProviderProps) => {
  const [apps, setApps] = useState<KitzeApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const loadProjects = async () => {
      try {
        const response = await fetch(PROJECTS_API_URL, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Projects request failed: ${response.status}`);
        }
        const projects = z.array(projectSchema).parse(await response.json());
        const mapped = projects.flatMap((project) =>
          project.externalUrl
            ? [
                {
                  description: project.summary,
                  name: project.title,
                  tagline: project.subtitle,
                  url: project.externalUrl,
                },
              ]
            : []
        );
        if (!controller.signal.aborted) {
          setApps(mapped);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch projects:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    void loadProjects();
    return () => controller.abort();
  }, []);
  const contextValue = useMemo(() => ({ apps, isLoading }), [apps, isLoading]);
  return (
    <KitzeAppsContext.Provider value={contextValue}>
      {children}
    </KitzeAppsContext.Provider>
  );
};
