"use client";
import styles from "./Alert.module.scss";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Alert() {
  return (
    <ToastContainer
      position="top-center"
      toastClassName={styles.toast}
      bodyClassName={styles.toastBody}
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
