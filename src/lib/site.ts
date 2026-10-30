export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label?: string;
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  shots: Shot[];
};

export const projects: Project[] = [
  {
    slug: "sre-engine",
    name: "SRE engine",
    kind: "Live options engine",
    summary: "Decides when to trade, and when not to, on my own account.",
    shots: [
      {
        src: "/images/engine-setup.webp",
        width: 620,
        height: 1259,
        alt: "SRE Hub setup detail: a breakout setup the engine is watching before it triggers, in demo mode.",
        label: "Setup",
      },
      {
        src: "/images/engine-log.webp",
        width: 620,
        height: 1259,
        alt: "SRE Hub engine log: heartbeats, a sector-strength block, a breakeven lock, and an order moving from decision to broker acknowledgement, in demo mode.",
        label: "Engine log",
      },
      {
        src: "/images/engine-position.webp",
        width: 620,
        height: 1259,
        alt: "SRE Hub position detail: an open option trade with the engine's recorded state and exit plan, in demo mode.",
        label: "Position",
      },
    ],
  },
  {
    slug: "sre-hub",
    name: "SRE Hub",
    kind: "Native macOS app",
    summary: "A read-only menu-bar app for watching the engine.",
    shots: [
      {
        src: "/images/hub-panel.webp",
        width: 932,
        height: 1412,
        alt: "SRE Hub's menu-bar panel with a portfolio chart and two open positions, in demo mode.",
      },
    ],
  },
  {
    slug: "fintools-mcp",
    name: "fintools-mcp",
    kind: "MCP server",
    summary: "Gives AI assistants real market numbers instead of guesses.",
    shots: [
      {
        src: "/images/fintools-diagram.webp",
        width: 1878,
        height: 1000,
        alt: "Sequence diagram: a user asks Claude a market question, Claude calls fintools-mcp tools, fintools fetches market data and returns computed indicators and levels.",
      },
    ],
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
