"use client";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "./Alert.module.scss";
import { RiErrorWarningFill } from "react-icons/ri";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Alert() {
  return (
    <ToastContainer
      position="top-center"
      toastClassName={styles.toast}
      progressClassName={styles.progressBar}
      bodyClassName={styles.toastBody}
      closeButton={
        <IoIosCloseCircle
          style={{ color: "var(--color-warning-1)", fontSize: "1.5rem" }}
        />
      }
      icon={
        <RiErrorWarningFill
          style={{ color: "var(--color-warning-1)", fontSize: "2rem" }}
        />
      }
      autoClose={5000}
      limit={5}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      stacked
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
}

export default Alert;
