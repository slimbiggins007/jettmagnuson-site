"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Terminal from "./Terminal";
import { nav } from "@/lib/site";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.side}>
      <Link href="/" className={styles.me}>
        Jett Magnuson
      </Link>
      <p className={styles.line}>Engineer in Tacoma, WA</p>

      <div className={styles.back}>
        {pathname !== "/" && <Link href="/">↳ Index</Link>}
      </div>

      <nav aria-label="Sections">
        <ul className={styles.nav}>
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Terminal />
    </aside>
  );
}
