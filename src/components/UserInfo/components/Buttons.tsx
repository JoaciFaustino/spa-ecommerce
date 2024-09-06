"use client";
import { usePathname } from "next/navigation";
import styles from "../UserInfo.module.scss";
import Link from "next/link";

function Buttons() {
  const pathname = usePathname();

  return (
    <>
      <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
        <button className={styles.btnLogin}>Login</button>
      </Link>
      <Link href={`/signup?redirect=${encodeURIComponent(pathname)}`}>
        <button className={styles.btnSignup}>Cadastrar-se</button>
      </Link>
    </>
  );
}

export default Buttons;
