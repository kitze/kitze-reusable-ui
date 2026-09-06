# Kitze reusable UI

Personal branded sections built on [Kitze UI](https://ui.kitze.io). Public source, intended for my own sites. Generic primitives stay upstream.

[Browse the sections](https://kitze.github.io/kitze-reusable-ui) · [Registry](https://kitze.github.io/kitze-reusable-ui/registry.json)

```sh
npx shadcn@latest add https://kitze.github.io/kitze-reusable-ui/r/made-by-kitze.json
```

Available items: `made-by-kitze`, `footer-column-kitze-apps`, `footer-column-connect`, `footer-bottom`, `kitze-apps-provider`.

The installer pulls dependencies, including Kitze UI's Spinner, from their original registries. Component names and props are retained from their Kitze UI versions. Installed source belongs to your app.

```tsx
import { KitzeAppsProvider } from "@/components/ui/KitzeAppsProvider";
import { MadeByKitze } from "@/components/ui/MadeByKitze";

export const MakerSection = () => (
  <KitzeAppsProvider>
    <MadeByKitze excludeApp="Sizzy" />
  </KitzeAppsProvider>
);
```

The provider fetches the public catalog from kitze.io once per mount. Pass `apps` directly to MadeByKitze or FooterColumnKitzeApps to use your own list without a provider. The components use Tailwind CSS and the standard shadcn `cn` utility.

## Development

```sh
bun install --frozen-lockfile
bun run check
bun run build
```

TypeScript 7, oxlint with Ultracite and the vendored anti-slop plugin, oxfmt, and Vitest. Registry generation validates the official shadcn schemas. Main deploys the static site and registry to GitHub Pages after checks pass. No preview deployment is configured.

Edit `registry/new-york`, then run `bun run registry:build`. Do not edit generated `public/r` files directly. Keep upstream components installed through their registry URLs.
