import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { UserContext } from "@/contexts/userProvider";

export const useHeader = () => {
  const [openAsideMenu, setOpenAsideMenu] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { getUserLogged } = useContext(UserContext);
  const [reqIsPending, setReqIsPending] = useState(true);

  useEffect(() => {
    if (window.scrollY !== 0) {
      headerRef?.current?.classList.add(styles.noTopScreen);
    }

    window.addEventListener("scroll", modifyHeaderWhenScroll);

    getUserLogged().then(() => {
      setReqIsPending(false);
    });

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
    openAsideMenu,
    reqIsPending
  };
};
