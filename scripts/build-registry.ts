import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { registryItemSchema, registrySchema } from "shadcn/schema";

import { catalog, registryUrl } from "../lib/catalog";

const root = path.resolve(import.meta.dirname, "..");
await mkdir(path.join(root, "public/r"), { recursive: true });
const items = await Promise.all(
  catalog.map(async (item) => {
    const filePath = `registry/new-york/${item.name}/${item.file}`;
    const source = await readFile(path.join(root, filePath), "utf-8");
    if (source.trimEnd().split("\n").length > 200) {
      throw new Error(`${filePath} exceeds 200 lines`);
    }
    if (!source.startsWith('"use client";')) {
      throw new Error(`${filePath} needs a client directive`);
    }
    const result = registryItemSchema.parse({
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      dependencies: item.dependencies,
      description: item.description,
      files: [
        {
          content: source,
          path: filePath,
          target: `components/ui/${item.file}`,
          type: "registry:component",
        },
      ],
      name: item.name,
      registryDependencies: item.registryDependencies,
      title: item.title,
      type: "registry:component",
    });
    await writeFile(
      path.join(root, `public/r/${item.name}.json`),
      `${JSON.stringify(result, null, 2)}\n`
    );
    return result;
  })
);
await writeFile(
  path.join(root, "public/registry.json"),
  `${JSON.stringify(registrySchema.parse({ $schema: "https://ui.shadcn.com/schema/registry.json", homepage: registryUrl, items, name: "kitze-reusable-ui" }), null, 2)}\n`
);
console.info(`Generated ${items.length} registry items.`);
