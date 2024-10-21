"use client";
import styles from "@/styles/pages/Error.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiSmileySad } from "react-icons/pi";

export default function PageError() {
  const router = useRouter();

  return (
    <section className={styles.mainSection}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={`${styles.divImage}`}>
          <PiSmileySad style={{ fontSize: "12vw" }} />
          <h1>500</h1>
        </div>

        <div className={`${styles.divContent}`}>
          <h1>Aconteceu um erro inesperado!</h1>

          <div className={styles.divBtnNotFound}>
            <button className={styles.btnBack} onClick={() => router.back()}>
              <FaArrowLeftLong style={{ color: "#fff", fontSize: "1rem" }} />
              Voltar
            </button>
            <Link href="/">
              <button
                className={styles.btnHome}
                onClick={() => router.push("/")}
              >
                <FaHome
                  style={{
                    color: "var(--color-text-paragraph)",
                    fontSize: "1rem"
                  }}
                />
                Voltar para a Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
