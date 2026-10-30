import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/site";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.intro}>
        <h1>I build software that acts on its own, and the tools to watch it.</h1>
        <p>
          A live options engine, a Mac app that watches it, and an MCP server that
          gives AI assistants real market data. Applying to CS master&apos;s
          programs for 2027; open to engineering roles and internships.
        </p>
      </header>

      <div className={styles.grid}>
        {projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className={styles.card}>
            <span className={styles.meta}>
              <span>{p.name}</span>
              <span className={styles.kind}>{p.kind}</span>
            </span>
            <span className={styles.art}>
              {p.image ? (
                <Image
                  src={p.image.src}
                  width={p.image.width}
                  height={p.image.height}
                  alt={p.image.alt}
                  className={styles.img}
                />
              ) : (
                <span className={styles.placeholder}>Image</span>
              )}
            </span>
            <span className={styles.foot}>{p.summary}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
