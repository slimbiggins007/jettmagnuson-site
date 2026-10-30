"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Terminal.module.css";

type Line = { id: number; ts: string; text: string };

const MAX_LINES = 40;

function stamp() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

function describe(anchor: HTMLAnchorElement): string | null {
  const raw = anchor.getAttribute("href");
  if (!raw || raw.startsWith("#")) return null;
  if (raw.startsWith("mailto:")) return `opening mail to ${raw.slice(7)}`;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin === window.location.origin) {
    if (url.pathname === window.location.pathname) return null;
    return `navigating to ${url.pathname}`;
  }
  return `opening ${url.host}${url.pathname === "/" ? "" : url.pathname}`;
}

export default function Terminal() {
  const pathname = usePathname();
  const [lines, setLines] = useState<Line[]>([]);
  const nextId = useRef(0);
  const firstLoad = useRef(true);

  const push = (text: string) => {
    const line = { id: nextId.current++, ts: stamp(), text };
    setLines((prev) => [...prev, line].slice(-MAX_LINES));
  };

  // Log clicks on links anywhere on the page.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const text = describe(anchor);
      if (text) push(text);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Log when a route has finished rendering.
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      push(`loaded ${pathname}`);
      return;
    }
    push("navigation complete");
  }, [pathname]);

  return (
    <section className={styles.term} aria-label="Activity log">
      <div className={styles.log} role="log" aria-live="off">
        {lines.map((line) => (
          <div key={line.id} className={styles.line}>
            <span className={styles.ts}>[{line.ts}]</span> {line.text}
          </div>
        ))}
      </div>
    </section>
  );
}
