import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    "**/node_modules/**",
    "**/.next/**",
    "out/**",
    "**/.open-next/**",
    "public/r/**",
    "registry.json",
    "public/registry.json",
    "lib/component-types.ts",
    "tools/oxlint/anti-slop/**",
    "**/next-env.d.ts",
  ],
});
