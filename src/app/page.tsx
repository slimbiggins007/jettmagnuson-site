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

      <ul className={styles.rows}>
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className={styles.row}>
              <span className={styles.text}>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.kind}>{p.kind}</span>
                <span className={styles.summary}>{p.summary}</span>
                <span className={styles.open}>View project</span>
              </span>
              <span className={styles.stage}>
                {p.shots.map((s) => (
                  <span
                    key={s.src}
                    className={s.width > s.height ? styles.shotWide : styles.shotTall}
                  >
                    <Image src={s.src} width={s.width} height={s.height} alt={s.alt} />
                    {s.label && <span className={styles.label}>{s.label}</span>}
                  </span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
