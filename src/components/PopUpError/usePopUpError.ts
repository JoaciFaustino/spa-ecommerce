import { useRef } from "react";
import styles from "./PopUpError.module.scss";

export const usePopUpError = () => {
  const popUpRef = useRef<HTMLDivElement | null>(null);

  const handleClosePopUp = () => {
    popUpRef?.current?.classList.add(styles.popUpClosed);
  };

  return { handleClosePopUp, popUpRef };
};
