export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label?: string;
};

export type Section = {
  label: string;
  text?: string;
  items?: string[];
  ordered?: boolean;
  code?: string;
  link?: { before: string; label: string; href: string };
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  overview: string;
  sections: Section[];
  shotsLabel: string;
  shots: Shot[];
  stack: string;
  links?: { label: string; href: string }[];
};

export const writing = {
  title: "My agent would have been wrong on day one",
  href: "https://jettmagnuson.substack.com/p/my-agent-would-have-been-wrong-on",
};

export const projects: Project[] = [
  {
    slug: "sre-engine",
    name: "SRE engine",
    kind: "Live options engine",
    summary: "Decides when to trade, and when not to, on my own account.",
    overview:
      "A Python service on a VPS that trades options on my own Public account. Only V3, a regime-aware breakout engine, trades live. The older reversal signals still run, but their orders are switched off.",
    sections: [
      {
        label: "How it decides",
        text: "A chain of checks, where any one can stop the trade.",
        ordered: true,
        items: [
          "Market regime (VIX)",
          "Sector strength",
          "Setup score: four breakout patterns, scored 0 to 100. A setup needs 65 to count.",
          "A real trigger",
          "No chasing: it waits for a pullback",
          "Contract: earnings, expiration, strike, liquidity, a real quote",
          "Expected value",
          "Risk veto",
        ],
      },
      {
        label: "How it exits",
        items: [
          "Profit ladder at about +35%, +40–50% and +75%, sized to the number of contracts",
          "Breakeven lock at +20%",
          "The runner trails 1.5× ATR",
          "Smart EOD at 3:45 ET: flatten at −50% or worse, otherwise hold overnight",
          "Sell lines I draw in SRE Hub. Lines Claude draws are ignored by the engine.",
        ],
      },
      {
        label: "How it changes",
        text: "New behavior runs in shadow mode first. The broker is the source of truth: a reconciler rewrites the database to match Public.",
      },
    ],
    shotsLabel: "Screenshots (demo data)",
    stack: "Python, asyncio, SQLite",
    links: [{ label: writing.title, href: writing.href }],
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
    summary: "A menu-bar app for watching the engine. It never places an order.",
    overview:
      "A native macOS app that shows the engine and the account at a glance. No code path places, changes or cancels an order. The one thing it sends the engine is the sell lines I draw.",
    sections: [
      {
        label: "How it works",
        items: [
          "Broker data comes through my sre MCP server: read-only, allowlisted tools, credentials in the Keychain.",
          "The engine log is read over SSH with a forced-command key.",
          "Stale and disconnected data is labeled, never shown as current.",
          "Account history is rebuilt from broker records. FIFO realized P&L matched Public's tax-lot export on all 26 close dates, with wash-sale repeat rows left out.",
          "A chart window with levels, and a SwiftTerm terminal drawer for Claude Code and Codex.",
        ],
      },
    ],
    shotsLabel: "Screenshot (demo data)",
    stack: "Swift 6, SwiftUI and AppKit, SwiftTerm, Swift Testing",
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
    overview:
      "An MCP server that gives AI assistants computed market numbers instead of invented ones. It's read-only and never trades.",
    sections: [
      {
        label: "Install",
        text: "The public connector is open source and on PyPI.",
        code: "pip install fintools-mcp\nclaude mcp add fintools -- uvx --from fintools-mcp fintools-mcp",
        link: {
          before: "The full toolset is a paid, proprietary download, sold on",
          label: "Agensi",
          href: "https://www.agensi.io/skills/fintools-trading-desk",
        },
      },
    ],
    shotsLabel: "How it works",
    stack: "Python, the MCP SDK, yfinance, httpx",
    links: [
      { label: "GitHub", href: "https://github.com/slimbiggins007/fintools-mcp" },
      { label: "PyPI", href: "https://pypi.org/project/fintools-mcp/" },
    ],
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
