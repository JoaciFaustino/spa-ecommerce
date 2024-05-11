"use client";
import { usePathname } from "next/navigation";
import styles from "./AsideMenu.module.scss";
import { useContext } from "react";
import { CgClose, CgShoppingCart } from "react-icons/cg";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { useAsideMenu } from "./useAsideMenu";
import { UserContext } from "@/contexts/userProvider";
import UserInfo from "../UserInfo/UserInfo";

type Props = {
  reqIsPending: boolean;
  isAuthenticated: boolean;
  handleCloseAsideMenu: () => void;
};

function AsideMenu({
  reqIsPending,
  isAuthenticated,
  handleCloseAsideMenu
}: Props) {
  const {
    backdropRef,
    asideMenuRef,
    closeAndInitAnimationClose,
    qntItemsCart
  } = useAsideMenu(handleCloseAsideMenu);
  const pathName = usePathname();

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
            {reqIsPending && (
              <>
                <span className={`${styles.iconSkeleton} loading`}></span>
                <span className={`${styles.iconSkeleton} loading`}></span>
              </>
            )}

            {!reqIsPending && isAuthenticated && <UserInfo />}

            {!reqIsPending && !isAuthenticated && (
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
