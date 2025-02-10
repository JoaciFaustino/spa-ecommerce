"use client";
import SearchInput from "@/components/SearchInput/SearchInput";
import styles from "./SearchAndCreateBar.module.scss";
import { BsPlusCircle } from "react-icons/bs";
import Modal from "@/components/Modal/Modal";
import { useEffect, useState } from "react";

type Props = {
  createFormComponent: JSX.Element;
  modalIsActived: boolean;
  openAndCloseModal: (isOpen: boolean) => void;
};

function SearchAndCreateBar({
  createFormComponent,
  openAndCloseModal,
  modalIsActived
}: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <>
      {modalIsActived && (
        <Modal onClose={() => openAndCloseModal(false)}>
          {createFormComponent}
        </Modal>
      )}

      <div className={styles.searchAndCreateBar}>
        <button
          type="button"
          onClick={() => openAndCloseModal(true)}
          disabled={!isMounted}
        >
          Criar um novo
          <BsPlusCircle style={{ fontSize: "0.875rem", color: "#fff" }} />
        </button>

        <div>
          <SearchInput placeholder="Pesquisar por nome" />
        </div>
      </div>
    </>
  );
}

export default SearchAndCreateBar;
