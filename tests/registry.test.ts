import { readFile } from "node:fs/promises";

import { registrySchema } from "shadcn/schema";
import { describe, expect, it } from "vitest";

import { registryUrl } from "../lib/catalog";

const registry = registrySchema.parse(
  JSON.parse(
    await readFile(new URL("../public/registry.json", import.meta.url), "utf-8")
  )
);

describe("published registry", () => {
  it("resolves every local dependency and installs each file only once", () => {
    const names = new Set(registry.items.map((item) => item.name));
    const targets = registry.items.flatMap(
      (item) => item.files?.map((file) => file.target) ?? []
    );
    expect(new Set(targets).size).toBe(targets.length);
    for (const item of registry.items) {
      for (const dependency of item.registryDependencies ?? []) {
        if (dependency.startsWith(registryUrl)) {
          expect(
            names.has(dependency.slice(dependency.lastIndexOf("/") + 1, -5))
          ).toBe(true);
        } else {
          expect(dependency).toMatch(
            /^https:\/\/ui\.kitze\.io\/r\/[a-z-]+\.json$/u
          );
        }
      }
    }
  });

  it("keeps the spinner owned by upstream Kitze UI", () => {
    const maker = registry.items.find((item) => item.name === "made-by-kitze");
    expect(maker?.registryDependencies).toContain(
      "https://ui.kitze.io/r/spinner.json"
    );
    expect(maker?.files?.[0]?.content).toContain("@/components/Spinner");
    expect(registry.items.some((item) => item.name === "spinner")).toBe(false);
  });

  it("publishes the actual component sources", async () => {
    for (const item of registry.items) {
      for (const file of item.files ?? []) {
        const source = await readFile(
          new URL(`../${file.path}`, import.meta.url),
          "utf-8"
        );
        expect(file.content).toBe(source);
      }
    }
  });
});
