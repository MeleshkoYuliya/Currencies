"use client";

import { Button } from "antd";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <div className={styles.title}>Click on the button to start</div>
      <Button onClick={() => router.push("/currencies")}>Currencies</Button>
    </main>
  );
}
