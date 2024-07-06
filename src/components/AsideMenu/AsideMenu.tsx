"use client";
import styles from "./AsideMenu.module.scss";
import { useContext } from "react";
import { CgClose } from "react-icons/cg";
import Link from "next/link";
import { useAsideMenu } from "./useAsideMenu";
import { UserContext } from "@/contexts/userProvider";
import Profile from "../Profile/Profile";
import Cart from "../Cart/Cart";
import Navbar from "../Navbar/Navbar";
import UserInfo from "../UserInfo/UserInfo";

type Props = {
  handleCloseAsideMenu: () => void;
};

const STYLE_ROUTE_ACTIVED = { color: "var(--primary-color)" };

function AsideMenu({ handleCloseAsideMenu }: Props) {
  const { backdropRef, asideMenuRef, closeAndInitAnimationClose } =
    useAsideMenu(handleCloseAsideMenu);

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

          <UserInfo />
        </header>

        <Navbar className={styles.navbar} />
      </div>
    </>
  );
}

export default AsideMenu;
