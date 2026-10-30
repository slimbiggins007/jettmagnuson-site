import Link from "next/link";
import Stage from "@/components/Stage";
import { links, projects, writing } from "@/lib/site";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.intro}>
        <h1>I build software that acts on its own, and the tools to watch it.</h1>
        <p>
          A live options engine, a Mac app that watches it, and an MCP server that
          gives AI assistants real market data.
        </p>
        <dl className={styles.now}>
          <div>
            <dt>Now</dt>
            <dd>Building the SRE engine, SRE Hub and fintools-mcp.</dd>
            <dd>Applied to CS master&apos;s programs for 2027. Decisions pending.</dd>
            <dd>Open to remote engineering roles and internships.</dd>
          </div>
          <div>
            <dt>Writing</dt>
            <dd>
              <a href={writing.href}>{writing.title}</a>
            </dd>
          </div>
        </dl>
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
              <Stage shots={p.shots} />
            </Link>
          </li>
        ))}
      </ul>

      <footer className={styles.footer}>
        <a href={`mailto:${links.email}`}>{links.email}</a>
        <a href={links.linkedin}>LinkedIn</a>
        <a href={links.github}>GitHub</a>
        <a href={links.x}>X</a>
        <a href={links.substack}>Substack</a>
      </footer>
    </>
  );
}
