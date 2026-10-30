export type Project = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  image?: { src: string; width: number; height: number; alt: string };
};

export const projects: Project[] = [
  {
    slug: "sre-engine",
    name: "SRE engine",
    kind: "Live options engine",
    summary: "Decides when to trade, and when not to, on my own account.",
  },
  {
    slug: "sre-hub",
    name: "SRE Hub",
    kind: "Native macOS app",
    summary: "A read-only menu-bar app for watching the engine.",
    image: {
      src: "/images/hub-panel.webp",
      width: 932,
      height: 1367,
      alt: "SRE Hub's menu-bar panel with a portfolio chart and two open positions, in demo mode.",
    },
  },
  {
    slug: "fintools-mcp",
    name: "fintools-mcp",
    kind: "MCP server",
    summary: "Gives AI assistants real market numbers instead of guesses.",
  },
];

export const nav = [
  { href: "/work/sre-engine", label: "SRE engine" },
  { href: "/work/sre-hub", label: "SRE Hub" },
  { href: "/work/fintools-mcp", label: "fintools-mcp" },
  { href: "/path", label: "Path" },
  { href: "/contact", label: "Contact" },
];

export const links = {
  email: "jettmagnuson@gmail.com",
  github: "https://github.com/slimbiggins007",
  linkedin: "https://www.linkedin.com/in/jett-magnuson-a14b55225/",
  x: "https://x.com/SlimBiggins",
  substack: "https://jettmagnuson.substack.com",
};
