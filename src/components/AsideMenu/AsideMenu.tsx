"use client";
import { usePathname } from "next/navigation";
import styles from "./AsideMenu.module.scss";
import { useRef, useState } from "react";
import { CgClose, CgShoppingCart } from "react-icons/cg";
import { BiUserCircle } from "react-icons/bi";

function AsideMenu({
  isOpen,
  handleCloseAsideMenu
}: {
  isOpen: boolean;
  handleCloseAsideMenu: () => void;
}) {
  const pathName = usePathname();
  const [qntItemsCart, setQntItemsCart] = useState(1);
  const [userLogged, setUserLogged] = useState(false);
  const asideMenuRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const closeAndInitAnimationClose = () => {
    const secondsToEndCloseAnimation = 500;

    asideMenuRef?.current?.classList.add(styles.close);
    backdropRef?.current?.classList.add(styles.fadeOutBackdrop);

    setTimeout(() => {
      handleCloseAsideMenu();
    }, secondsToEndCloseAnimation);
  };

  return (
    <>
      <div className={styles.backdrop} ref={backdropRef} />

      <div className={styles.asideMenu} ref={asideMenuRef}>
        <header>
          <button
            className={styles.btnClose}
            onClick={closeAndInitAnimationClose}>
            <CgClose style={{ color: "white", fontSize: "1.5rem" }} />
          </button>

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
                <BiUserCircle
                  style={{
                    color: "var(--color-text-paragraph)",
                    fontSize: "1.5rem"
                  }}
                />
              </>
            )}

            {!userLogged && (
              <>
                <button className={styles.btnSignup}>Cadastrar-se</button>
              </>
            )}
          </div>
        </header>

        <div className={styles.asideMenuContent}>
          <ul>
            <li
              className="textBig"
              style={pathName === "/" ? { color: "var(--primary-color)" } : {}}>
              Home
            </li>
            <li
              className="textBig"
              style={
                pathName === "/menu" ? { color: "var(--primary-color)" } : {}
              }>
              menu
            </li>
            <li
              className="textBig"
              style={
                pathName === "/personalizados"
                  ? { color: "var(--primary-color)" }
                  : {}
              }>
              Personalizados
            </li>
            <li
              className="textBig"
              style={
                pathName === "/contatos"
                  ? { color: "var(--primary-color)" }
                  : {}
              }>
              Contatos
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AsideMenu;
