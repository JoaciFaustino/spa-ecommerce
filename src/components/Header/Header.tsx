"use client";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import AsideMenu from "../AsideMenu/AsideMenu";
import { CgMenu } from "react-icons/cg";
import { useHeader } from "./useHeader";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authProvider";
import CartAndAvatarUser from "../UserInfo/UserInfo";
import { usePathname } from "next/navigation";

function Header() {
  const pathName = usePathname();
  const { isAuthenticated } = useContext(AuthContext);
  const { handleOpenAndCloseAsideMenu, headerRef, openAsideMenu } = useHeader();
  const pageIsAuth: boolean = pathName === "/login" || pathName === "/signup";

  return (
    <>
      {!pageIsAuth && (
        <header className={styles.header} ref={headerRef}>
          {openAsideMenu && (
            <AsideMenu handleCloseAsideMenu={handleOpenAndCloseAsideMenu} />
          )}

          <div className={styles.wrapper + " wrapper"}>
            <button
              className={styles.btnHamburguer}
              onClick={handleOpenAndCloseAsideMenu}
            >
              <CgMenu style={{ color: "white", fontSize: "1.5rem" }} />
            </button>

            <div className={styles.divLogo}>
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  width={60}
                  height={30}
                  alt="logo"
                />
              </Link>
            </div>

            <nav>
              <ul>
                <li
                  className="text"
                  style={
                    pathName === "/" ? { color: "var(--primary-color)" } : {}
                  }
                >
                  Home
                </li>
                <li
                  className="text"
                  style={
                    pathName === "/menu"
                      ? { color: "var(--primary-color)" }
                      : {}
                  }
                >
                  Menu
                </li>
                <li
                  className="text"
                  style={
                    pathName === "/personalizados"
                      ? { color: "var(--primary-color)" }
                      : {}
                  }
                >
                  Personalizados
                </li>
                <li
                  className="text"
                  style={
                    pathName === "/contatos"
                      ? { color: "var(--primary-color)" }
                      : {}
                  }
                >
                  Contatos
                </li>
              </ul>
            </nav>
            <div className={styles.divUser}>
              {isAuthenticated && <CartAndAvatarUser />}

              {!isAuthenticated && (
                <>
                  <Link href="/login">
                    <button className={styles.btnLogin}>Login</button>
                  </Link>
                  <Link href="/signup">
                    <button className={styles.btnSignup}>Cadastrar-se</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
