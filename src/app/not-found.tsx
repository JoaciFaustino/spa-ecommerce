"use client";
import styles from "@/styles/pages/Error.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiSmileySad } from "react-icons/pi";

function NotFoundPage() {
  const router = useRouter();

  return (
    <section className={styles.mainSection}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={`${styles.divImage} ${styles.divImageNotFound}`}>
          <PiSmileySad style={{ fontSize: "12vw" }} />
          <h1>404</h1>
        </div>

        <div className={`${styles.divContent} ${styles.notFound}`}>
          <h1>Página não encontrada!</h1>

          <div className={styles.divBtnNotFound}>
            <button className={styles.btnBack} onClick={() => router.back()}>
              <FaArrowLeftLong style={{ color: "#fff", fontSize: "1rem" }} />
              Voltar
            </button>
            <Link href="/">
              <button className={styles.btnHome}>
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

export default NotFoundPage;
