"use client";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "./PopUpError.module.scss";
import { RiErrorWarningLine } from "react-icons/ri";
import { usePopUpError } from "./usePopUpError";

type Props = {
  message: string;
};

function PopUpError({ message }: Props) {
  const { handleClosePopUp, popUpRef } = usePopUpError();

  return (
    <div className={styles.popUp} ref={popUpRef}>
      <IoIosCloseCircle
        className={styles.iconClosePopUp}
        style={{
          color: "var(--color-warning-1)",
          fontSize: "1.5rem"
        }}
        onClick={handleClosePopUp}
      />
      <div className={styles.divIcon}>
        <RiErrorWarningLine
          style={{
            color: "#fff",
            fontSize: "2.4rem"
          }}
        />
      </div>
      <div className={styles.divMessage}>
        <p>{message}</p>
        <span className={styles.timeBar}></span>
      </div>
    </div>
  );
}

export default PopUpError;
