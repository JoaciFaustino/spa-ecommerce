"use client";
import { BsGithub, BsInstagram, BsWhatsapp } from "react-icons/bs";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  const pageIsAuth: boolean = pathname === "/login" || pathname === "/signup";

  return (
    <>
      {!pageIsAuth && (
        <footer className={styles.footer}>
          <div className={styles.wrapper}>
            <div className={styles.socialMedias}>
              <Link href="https://github.com/JoaciFaustino" target="_blank">
                <div className={styles.divIcon}>
                  <BsGithub
                    className={styles.icon}
                    style={{ color: "#ffffff", fontSize: "1.5rem" }}
                  />
                </div>
              </Link>
              <Link href="https://github.com/JoaciFaustino" target="_blank">
                <div className={styles.divIcon}>
                  <BsInstagram
                    className={styles.icon}
                    style={{ color: "#ffffff", fontSize: "1.5rem" }}
                  />
                </div>
              </Link>
              <Link href="https://wa.me/5584999854819" target="_blank">
                <div className={styles.divIcon}>
                  <BsWhatsapp
                    className={styles.icon}
                    style={{ color: "#ffffff", fontSize: "1.5rem" }}
                  />
                </div>
              </Link>
            </div>
            <p className="text">
              Este é um projeto fictício criado apenas para fins de demonstração
              e portfólio. Não são realizadas transações reais. <br />
              <br />
              This is a fictitious project created for demonstration and
              portfolio purposes only. No real transactions are conducted.
            </p>
            <p className="text">
              &copy; 2024 Joaci Faustino. All rights reverved.
            </p>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
