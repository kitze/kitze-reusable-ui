import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  description: "My branded sections and app patterns, built on Kitze UI.",
  title: "Kitze reusable UI",
};
const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className="dark">
    <body>{children}</body>
  </html>
);

export default RootLayout;
