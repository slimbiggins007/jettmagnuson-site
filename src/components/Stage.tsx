import Image from "next/image";
import type { Shot } from "@/lib/site";
import styles from "./Stage.module.css";

export default function Stage({ shots }: { shots: Shot[] }) {
  return (
    <span className={styles.stage}>
      {shots.map((s) => (
        <span
          key={s.src}
          className={s.width > s.height ? styles.shotWide : styles.shotTall}
        >
          <Image src={s.src} width={s.width} height={s.height} alt={s.alt} />
          {s.label && <span className={styles.label}>{s.label}</span>}
        </span>
      ))}
    </span>
  );
}
