import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Stage from "@/components/Stage";
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
        <p className={styles.body}>{project.overview}</p>
      </section>

      {project.sections.map((s) => {
        const List = s.ordered ? "ol" : "ul";
        return (
          <section key={s.label} className={styles.section}>
            <h2 className={styles.label}>{s.label}</h2>
            {s.text && <p className={styles.body}>{s.text}</p>}
            {s.items && (
              <List className={styles.items}>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            )}
            {s.code && (
              <pre className={styles.code}>
                <code>{s.code}</code>
              </pre>
            )}
            {s.link && (
              <p className={styles.body}>
                {s.link.before} <a href={s.link.href}>{s.link.label}</a>.
              </p>
            )}
          </section>
        );
      })}

      <section className={styles.section}>
        <h2 className={styles.label}>{project.shotsLabel}</h2>
        <Stage shots={project.shots} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>Stack</h2>
        <p className={styles.body}>{project.stack}</p>
      </section>

      {project.links && (
        <section className={styles.section}>
          <h2 className={styles.label}>Links</h2>
          <ul className={styles.linkList}>
            {project.links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
