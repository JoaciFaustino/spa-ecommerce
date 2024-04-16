"use client";
import styles from "./Header.module.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AsideMenu from "../AsideMenu/AsideMenu";
import { CgMenu, CgShoppingCart } from "react-icons/cg";
import { BiUserCircle } from "react-icons/bi";

function Header() {
  const pathName = usePathname();
  const [qntItemsCart, setQntItemsCart] = useState(999);
  const [userLogged, setUserLogged] = useState(true);
  const [openAsideMenu, setOpenAsideMenu] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const handleOpenAndCloseAsideMenu = () => setOpenAsideMenu(!openAsideMenu);

  const modifyHeaderWhenScroll = () => {
    if (window.scrollY === 0) {
      headerRef?.current?.classList.remove(styles.noTopScreen);
    } else {
      headerRef?.current?.classList.add(styles.noTopScreen);
    }
  };

  useEffect(() => {
    if (window.scrollY !== 0) {
      headerRef?.current?.classList.add(styles.noTopScreen);
    }

    window.addEventListener("scroll", modifyHeaderWhenScroll);
  }, []);

  return (
    <header className={styles.header} ref={headerRef}>
      {openAsideMenu && (
        <AsideMenu
          isOpen={openAsideMenu}
          handleCloseAsideMenu={handleOpenAndCloseAsideMenu}
        />
      )}

      <div className={styles.wrapper + " wrapper"}>
        <button
          className={styles.btnHamburguer}
          onClick={handleOpenAndCloseAsideMenu}>
          <CgMenu style={{ color: "white", fontSize: "1.5rem" }} />
        </button>

        <div className={styles.divLogo}>
          <Link href="/">
            <Image src="/images/logo.png" width={60} height={30} alt="logo" />
          </Link>
        </div>

        <nav>
          <ul>
            <li
              className="text"
              style={pathName === "/" ? { color: "var(--primary-color)" } : {}}>
              Home
            </li>
            <li
              className="text"
              style={
                pathName === "/menu" ? { color: "var(--primary-color)" } : {}
              }>
              Menu
            </li>
            <li
              className="text"
              style={
                pathName === "/personalizados"
                  ? { color: "var(--primary-color)" }
                  : {}
              }>
              Personalizados
            </li>
            <li
              className="text"
              style={
                pathName === "/contatos"
                  ? { color: "var(--primary-color)" }
                  : {}
              }>
              Contatos
            </li>
          </ul>
        </nav>
        <div className={styles.divUser}>
          {userLogged && (
            <>
              <div className={styles.divCart}>
                <CgShoppingCart
                  style={{
                    color: "var(--color-text-paragraph)",
                    fontSize: "1rem"
                  }}
                />
                <div className={styles.qntItemsCart}>
                  {qntItemsCart > 0 && <span>{qntItemsCart}</span>}
                </div>
              </div>
              <div className={styles.userIcon}>
                <BiUserCircle
                  style={{
                    color: "var(--color-text-paragraph)",
                    fontSize: "2rem"
                  }}
                />
              </div>
            </>
          )}

          {!userLogged && (
            <>
              <button className={styles.btnLogin}>Login</button>
              <button className={styles.btnSignup}>Cadastrar-se</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
