import type { Metadata } from "next";
import { links } from "@/lib/site";
import styles from "@/components/Page.module.css";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <article className={styles.page}>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.summary}>Open to remote engineering roles and internships.</p>
      <section className={styles.section}>
        <ul className={styles.links}>
          <li>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </li>
          <li>
            <a href={links.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={links.github}>GitHub</a>
          </li>
          <li>
            <a href={links.x}>X</a>
          </li>
          <li>
            <a href={links.substack}>Substack</a>
          </li>
        </ul>
      </section>
    </article>
  );
}
