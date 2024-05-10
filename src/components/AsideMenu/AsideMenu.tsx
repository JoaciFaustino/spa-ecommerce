"use client";
import { usePathname } from "next/navigation";
import styles from "./AsideMenu.module.scss";
import { useContext, useRef, useState } from "react";
import { CgClose, CgShoppingCart } from "react-icons/cg";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { AuthContext } from "@/contexts/authProvider";
import { useAsideMenu } from "./useAsideMenu";

function AsideMenu({
  handleCloseAsideMenu
}: {
  handleCloseAsideMenu: () => void;
}) {
  const {
    backdropRef,
    asideMenuRef,
    closeAndInitAnimationClose,
    qntItemsCart
  } = useAsideMenu(handleCloseAsideMenu);
  const pathName = usePathname();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <div className={styles.backdrop} ref={backdropRef} />

      <div className={styles.asideMenu} ref={asideMenuRef}>
        <header>
          <button
            className={styles.btnClose}
            onClick={closeAndInitAnimationClose}
          >
            <CgClose style={{ color: "white", fontSize: "1.5rem" }} />
          </button>

          <div className={styles.divUser}>
            {isAuthenticated && (
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
                <BiUserCircle
                  style={{
                    color: "var(--color-text-paragraph)",
                    fontSize: "1.5rem"
                  }}
                />
              </>
            )}

            {!isAuthenticated && (
              <Link href="/signup">
                <button className={styles.btnSignup}>Cadastrar-se</button>
              </Link>
            )}
          </div>
        </header>

        <div className={styles.asideMenuContent}>
          <ul>
            <li
              className="textBig"
              style={pathName === "/" ? { color: "var(--primary-color)" } : {}}
            >
              Home
            </li>
            <li
              className="textBig"
              style={
                pathName === "/menu" ? { color: "var(--primary-color)" } : {}
              }
            >
              menu
            </li>
            <li
              className="textBig"
              style={
                pathName === "/personalizados"
                  ? { color: "var(--primary-color)" }
                  : {}
              }
            >
              Personalizados
            </li>
            <li
              className="textBig"
              style={
                pathName === "/contatos"
                  ? { color: "var(--primary-color)" }
                  : {}
              }
            >
              Contatos
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AsideMenu;
