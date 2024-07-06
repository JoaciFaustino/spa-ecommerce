import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";

export const useHeader = () => {
  const [openAsideMenu, setOpenAsideMenu] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.scrollY !== 0) {
      headerRef?.current?.classList.add(styles.noTopScreen);
    }

    window.addEventListener("scroll", modifyHeaderWhenScroll);

    return () => window.removeEventListener("scroll", modifyHeaderWhenScroll);
  }, []);

  const handleOpenAndCloseAsideMenu = () => setOpenAsideMenu(!openAsideMenu);

  const modifyHeaderWhenScroll = () => {
    if (window.scrollY === 0) {
      headerRef?.current?.classList.remove(styles.noTopScreen);
    } else {
      headerRef?.current?.classList.add(styles.noTopScreen);
    }
  };

  return {
    handleOpenAndCloseAsideMenu,
    headerRef,
    openAsideMenu
  };
};
