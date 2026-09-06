import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, next, react],
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
  jsPlugins: [
    // Vendored from https://github.com/dmmulroy/anti-slop (MIT). Edit locally as needed.
    { name: "anti-slop", specifier: "./tools/oxlint/anti-slop/index.ts" },
  ],
  overrides: [
    {
      files: ["registry/**", "components/**", "app/**", "hooks/**", "lib/**"],
      rules: { "unicorn/filename-case": "off" },
    },
  ],
  rules: {
    "anti-slop/no-chained-type-assertions": "error",
    "anti-slop/no-conditional-empty-object-spread": "error",
    "anti-slop/no-known-value-widening": "error",
    "anti-slop/no-module-mocking": "error",
    "anti-slop/no-object-parameters": "error",
    "anti-slop/no-reflect-apply": "error",
    "anti-slop/no-reflect-get": "error",
    // `typeof` is the honest primitive probe inside a type predicate at an I/O boundary
    // (error causes, JSON bodies); the alternative is a zod round-trip or a wrapper hack.
    "anti-slop/no-runtime-typeof": ["error", { allowInTypeGuards: true }],
    "anti-slop/no-shape-in-symbol-names": "error",
    "anti-slop/no-unknown-parameters": "error",
    "anti-slop/no-unknown-returns": "error",
    "anti-slop/no-unknown-type-aliases": "error",
    "anti-slop/no-unsafe-dictionary-type": "error",
    "anti-slop/no-widen-then-assert": "error",
    "anti-slop/require-safety-comment-for-type-assertion": "error",
    // Sequential awaiting is a correctness requirement in several places (one SMTP
    // connection per recipient, Prisma interactive transactions, ordered cookie writes).
    // The rule cannot tell those from accidental serialization; use Promise.all deliberately.
    "no-await-in-loop": "off",
    // `void promise;` is the sanctioned way to discard a promise (no-floating-promises is on).
    "no-void": ["error", { allowAsStatement: true }],
    // Reports React Compiler's own unimplemented cases (e.g. try/finally), not code problems.
    "react/todo": "off",
    "typescript/ban-ts-comment": "error",
    "typescript/no-confusing-void-expression": "error",
    "typescript/no-explicit-any": "error",
    "typescript/no-floating-promises": "error",
    "typescript/no-misused-promises": "error",
    "typescript/no-non-null-assertion": "error",
    "typescript/no-unsafe-type-assertion": "error",
  },
});
