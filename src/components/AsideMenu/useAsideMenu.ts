import { useRef, useState } from "react";
import styles from "./AsideMenu.module.scss";

const TIME_TO_END_CLOSE_ANIMATION = 500; // 0.5 seconds

export const useAsideMenu = (handleCloseAsideMenu: () => void) => {
  const [qntItemsCart, setQntItemsCart] = useState(1);
  const asideMenuRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const closeAndInitAnimationClose = () => {
    asideMenuRef?.current?.classList.add(styles.close);
    backdropRef?.current?.classList.add(styles.fadeOutBackdrop);

    setTimeout(() => {
      handleCloseAsideMenu();
    }, TIME_TO_END_CLOSE_ANIMATION);
  };

  return {
    backdropRef,
    asideMenuRef,
    closeAndInitAnimationClose,
    qntItemsCart
  };
};
