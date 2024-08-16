import { MutableRefObject, useEffect, useState } from "react";

export const useModal = (modalRef: MutableRefObject<HTMLElement | null>) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  const toggleModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClickOutsideModal: EventListener = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalIsOpen(false);
    }
  };

  return {
    toggleModal,
    modalIsOpen,
    openModal,
    closeModal
  };
};
