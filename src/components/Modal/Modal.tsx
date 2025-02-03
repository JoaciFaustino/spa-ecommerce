"use client";
import styles from "./Modal.module.scss";
import { useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";

const TIME_TO_END_CLOSE_ANIMATION = 500; // 0.5 seconds

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const closeAndInitAnimationClose = () => {
    modalRef?.current?.classList.add(styles.close);
    backdropRef?.current?.classList.add(styles.close);

    setTimeout(() => onClose(), TIME_TO_END_CLOSE_ANIMATION);
  };

  useEffect(() => {
    document.body.classList.add(styles.bodyNoScrolable);

    return () => document.body.classList.remove(styles.bodyNoScrolable);
  }, []);

  return (
    <>
      <div className={styles.backdrop} ref={backdropRef} />

      <div className={styles.modal} ref={modalRef}>
        <header>
          <CgClose
            onClick={closeAndInitAnimationClose}
            style={{ color: "var(--gray-3)", fontSize: "1.5rem" }}
          />
        </header>

        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}

export default Modal;
