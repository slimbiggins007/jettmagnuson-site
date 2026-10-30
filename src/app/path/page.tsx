import type { Metadata } from "next";
import styles from "@/components/Page.module.css";

export const metadata: Metadata = { title: "Path" };

const steps = [
  { year: "2020", what: "Associate in Arts, Tacoma Community College" },
  { year: "2022", what: "BA in Law and Policy, University of Washington", note: "Minor in Human Rights" },
  {
    year: "2023",
    what: "Paralegal at Sterbick & Associates, which turned into a developer job",
    note: "Built Olimar, the office's CRM dashboard, and Python automation for its financial data.",
  },
  { year: "2025", what: "Foundations of Python Programming, University of Washington" },
  { year: "2026", what: "Built the SRE engine, SRE Hub and fintools-mcp" },
  { year: "2027", what: "Master's in computer science", note: "Applied. Decisions pending.", next: true },
];

export default function PathPage() {
  return (
    <article className={styles.page}>
      <h1 className={styles.title}>Path</h1>
      <p className={styles.summary}>
        From a law degree and a paralegal job to writing the software myself.
      </p>
      <section className={styles.section}>
        <ol className={styles.list}>
          {steps.map((s) => (
            <li key={s.year} className={s.next ? styles.next : undefined}>
              <span className={styles.year}>{s.year}</span>
              <span className={styles.what}>
                {s.what}
                {s.note && <span className={styles.note}>{s.note}</span>}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
