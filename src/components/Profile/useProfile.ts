import { useEffect, useRef, useState } from "react";

export const useProfile = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  const handleOpenAndCloseModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  const handleClickOutsideModal: EventListener = (event) => {
    if (
      modalIsOpen &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      setModalIsOpen(false);
    }
  };

  return {
    modalIsOpen,
    modalRef,
    handleOpenAndCloseModal
  };
};
