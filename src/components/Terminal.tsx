"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Terminal.module.css";

type Line =
  | { id: number; kind: "event"; ts: string; text: string }
  | { id: number; kind: "idle"; text: string };

const MAX_LINES = 40;
const PREFILL = 14;
const IDLE_AFTER_MS = 2500;
const IDLE_MIN_MS = 1400;
const IDLE_MAX_MS = 3200;

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];
const between = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));

// Background chatter shown while the page is idle.
const idleMessages: Array<() => string> = [
  () => "watchdog: health check passed",
  () => "session: keepalive sent",
  () => `monitor: system load ${between(28, 41)}%`,
  () => `network: latency ${between(9, 18)}ms`,
  () => `cache: ${between(12, 64)} objects evicted`,
  () => "storage: garbage collection run",
  () => "backup: snapshot created",
  () => "security: no threats detected",
  () => "analytics: data sync complete",
  () => "crypto: key rotation scheduled",
];

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
  const lastEventAt = useRef(0);

  const append = useCallback(
    (line: Line) => setLines((prev) => [...prev, line].slice(-MAX_LINES)),
    [],
  );

  const logEvent = useCallback(
    (text: string) => {
      lastEventAt.current = Date.now();
      append({ id: nextId.current++, kind: "event", ts: stamp(), text });
    },
    [append],
  );

  const logIdle = useCallback(
    () => append({ id: nextId.current++, kind: "idle", text: pick(idleMessages)() }),
    [append],
  );

  // Fill the panel on load, then keep chatting while nothing is happening.
  useEffect(() => {
    const seed: Line[] = Array.from({ length: PREFILL }, () => ({
      id: nextId.current++,
      kind: "idle" as const,
      text: pick(idleMessages)(),
    }));
    setLines((prev) => [...seed, ...prev].slice(-MAX_LINES));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number;
    const schedule = () => {
      timer = window.setTimeout(() => {
        const idle = Date.now() - lastEventAt.current > IDLE_AFTER_MS;
        if (idle && !document.hidden) logIdle();
        schedule();
      }, between(IDLE_MIN_MS, IDLE_MAX_MS));
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [logIdle]);

  // Log clicks on links anywhere on the page.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      const text = describe(anchor);
      if (text) logEvent(text);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [logEvent]);

  // Log when a route has finished rendering.
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      logEvent(`loaded ${pathname}`);
      return;
    }
    logEvent("navigation complete");
  }, [pathname, logEvent]);

  return (
    <section className={styles.term} aria-label="Activity log">
      <div className={styles.log} role="log" aria-live="off">
        {lines.map((line) =>
          line.kind === "event" ? (
            <div key={line.id} className={`${styles.line} ${styles.event}`}>
              <span className={styles.ts}>[{line.ts}]</span> {line.text}
            </div>
          ) : (
            <div key={line.id} className={`${styles.line} ${styles.idle}`}>
              &gt; {line.text}
            </div>
          ),
        )}
      </div>
    </section>
  );
}
