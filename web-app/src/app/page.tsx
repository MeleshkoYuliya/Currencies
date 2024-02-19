"use client";

import { Button } from "antd";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <Button onClick={() => router.push("/currencies")}>Currencies</Button>
    </main>
  );
}
