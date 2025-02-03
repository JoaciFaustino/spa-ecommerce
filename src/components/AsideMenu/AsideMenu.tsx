"use client";
import styles from "./AsideMenu.module.scss";
import { CgClose } from "react-icons/cg";
import { useAsideMenu } from "./useAsideMenu";
import Navbar from "../Navbar/Navbar";

type Props = {
  handleCloseAsideMenu: () => void;
  userInfoComponent: React.ReactNode;
};

function AsideMenu({ handleCloseAsideMenu, userInfoComponent }: Props) {
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
            <CgClose style={{ color: "#fff", fontSize: "1.5rem" }} />
          </button>

          {userInfoComponent}
        </header>

        <Navbar className={styles.navbar} />
      </div>
    </>
  );
}

export default AsideMenu;
