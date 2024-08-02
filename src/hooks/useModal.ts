import { MutableRefObject, useEffect, useState } from "react";

export const useModal = (modalRef: MutableRefObject<HTMLElement | null>) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalIsOpen(false);
    }
  };

  return {
    handleOpenAndCloseModal,
    modalIsOpen
  };
};
