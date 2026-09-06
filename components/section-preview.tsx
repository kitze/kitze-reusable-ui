"use client";

import { FooterBottom } from "@/registry/new-york/footer-bottom/FooterBottom";
import { FooterColumnConnect } from "@/registry/new-york/footer-column-connect/FooterColumnConnect";
import { FooterColumnKitzeApps } from "@/registry/new-york/footer-column-kitze-apps/FooterColumnKitzeApps";
import { KitzeAppsProvider } from "@/registry/new-york/kitze-apps-provider/KitzeAppsProvider";
import { MadeByKitze } from "@/registry/new-york/made-by-kitze/MadeByKitze";

const apps = [
  {
    description: "A workspace for building and testing responsive websites.",
    name: "Sizzy",
    tagline: "The browser for developers",
    url: "https://sizzy.co",
  },
  {
    description: "The foundation I use to take apps from idea to production.",
    name: "Zero to Shipped",
    tagline: "Ship your next idea",
    url: "https://zerotoshipped.com",
  },
];

export const SectionPreview = ({ name }: { name: string }) => {
  if (name === "made-by-kitze") {
    return (
      <MadeByKitze
        apps={apps}
        className="rounded-xl border-0 py-8 md:py-8 [&_.container]:px-6"
      />
    );
  }
  if (name === "footer-column-kitze-apps") {
    return (
      <div className="rounded-xl bg-black p-6">
        <FooterColumnKitzeApps apps={apps} />
      </div>
    );
  }
  if (name === "footer-column-connect") {
    return (
      <div className="rounded-xl bg-black p-6">
        <FooterColumnConnect />
      </div>
    );
  }
  if (name === "footer-bottom") {
    return (
      <div className="rounded-xl bg-black p-6">
        <FooterBottom className="mt-0" />
      </div>
    );
  }
  return (
    <KitzeAppsProvider>
      <div className="rounded-xl bg-black p-6">
        <p className="mb-6 text-sm text-zinc-500">Live catalog from kitze.io</p>
        <FooterColumnKitzeApps />
      </div>
    </KitzeAppsProvider>
  );
};
