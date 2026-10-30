import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/site";
import styles from "@/components/Page.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.name };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className={styles.page}>
      <h1 className={styles.title}>{project.name}</h1>
      <p className={styles.kind}>{project.kind}</p>
      <p className={styles.summary}>{project.summary}</p>

      <section className={styles.section}>
        <h2 className={styles.label}>Overview</h2>
        <div className={styles.placeholder}>Overview copy</div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>How it works</h2>
        <div className={styles.placeholder}>Diagram or walkthrough</div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>Screenshots</h2>
        <div className={`${styles.placeholder} ${styles.tall}`}>Screenshots</div>
      </section>
    </article>
  );
}
