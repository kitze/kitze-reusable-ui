export const registryUrl = "https://kitze.github.io/kitze-reusable-ui";

export const catalog = [
  {
    dependencies: ["motion", "lucide-react", "@icons-pack/react-simple-icons"],
    description:
      "The maker section, project cards, and social links for my sites.",
    file: "MadeByKitze.tsx",
    name: "made-by-kitze",
    registryDependencies: [
      `${registryUrl}/r/kitze-apps-provider.json`,
      "https://ui.kitze.io/r/spinner.json",
    ],
    title: "Made by Kitze",
  },
  {
    dependencies: ["lucide-react"],
    description:
      "A footer column of my apps, with current-app exclusion and referral links.",
    file: "FooterColumnKitzeApps.tsx",
    name: "footer-column-kitze-apps",
    registryDependencies: [`${registryUrl}/r/kitze-apps-provider.json`],
    title: "My apps",
  },
  {
    dependencies: [],
    description:
      "My social, support, and website links. Override the list when needed.",
    file: "FooterColumnConnect.tsx",
    name: "footer-column-connect",
    registryDependencies: [],
    title: "Connect",
  },
  {
    dependencies: [],
    description: "My copyright line and the built-with-swearing attribution.",
    file: "FooterBottom.tsx",
    name: "footer-bottom",
    registryDependencies: [],
    title: "Footer attribution",
  },
  {
    dependencies: ["zod"],
    description: "Fetch and share the app catalog from kitze.io once per page.",
    file: "KitzeAppsProvider.tsx",
    name: "kitze-apps-provider",
    registryDependencies: [],
    title: "Apps provider",
  },
];
