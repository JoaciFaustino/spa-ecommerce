"use client";
import SearchInput from "@/components/SearchInput/SearchInput";
import styles from "./SearchAndCreateBar.module.scss";
import { BsPlusCircle } from "react-icons/bs";
import { useSearchAndCreateBar } from "./useSearchAndCreateBar";
import Modal from "@/components/Modal/Modal";
import CreateOrUpdateCakeForm from "@/components/CreateOrUpdateCakeForm/CreateOrUpdateCakeForm";

function SearchAndCreateBar() {
  const { createNewCake, modalIsActived, openModal, closeModal } =
    useSearchAndCreateBar();

  return (
    <>
      {modalIsActived && (
        <Modal onClose={closeModal}>
          <CreateOrUpdateCakeForm onUpdateOrCreateCake={createNewCake} />
        </Modal>
      )}

      <div className={styles.searchAndCreateBar}>
        <button type="button" onClick={openModal}>
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
