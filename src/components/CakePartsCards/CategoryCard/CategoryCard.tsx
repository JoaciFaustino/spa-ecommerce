"use client";
import styles from "../CakePartsCard.module.scss";
import { ICategory } from "@/@types/Category";
import Modal from "@/components/Modal/Modal";
import { deleteCategory, updateCategory } from "@/services/categories";
import { useState } from "react";
import { toast } from "react-toastify";
import CreateOrUpdateCakePartForm from "../_components/CreateOrUpdateCakePartForm/CreateOrUpdateCakePartForm";
import ActionButtons from "../_components/ActionButtons/ActionButtons";

type Props = {
  category: ICategory;
  updateCategoryItem: (id: string, newCategory: ICategory) => void;
  deleteCategoryItem: (id: string) => void;
};

function CakeTypeCard({
  category: { _id: id, category: currentCategory },
  updateCategoryItem,
  deleteCategoryItem
}: Props) {
  const [modalIsActived, setModalIsActived] = useState(false);
  const [requestIsPending, setRequestIsPending] = useState(false);

  const updateRequest = async ({
    name: newCategoryValue
  }: {
    name: string;
    price: number;
  }) => {
    if (newCategoryValue === currentCategory) {
      toast.info("Faça alguma alteração antes de salvar!");
      return;
    }

    try {
      const newCategory = await updateCategory(id, {
        category: newCategoryValue
      });

      console.log(newCategory);

      toast.success("Tipo de massa alterado com sucesso!");
      updateCategoryItem(id, newCategory);
      setModalIsActived(false);
    } catch (error) {
      toast.error("Erro ao editar tipo de massa");
    }
  };

  const deleteRequest = async (id: string) => {
    setRequestIsPending(true);

    try {
      await deleteCategory(id);

      deleteCategoryItem(id);

      toast.success("Categoria apagado com sucesso!");
    } catch (error) {
      toast.error("Erro ao apagar esse categoria, tente novamente!");
    }

    setRequestIsPending(false);
  };

  return (
    <>
      {modalIsActived && (
        <Modal onClose={() => setModalIsActived(false)}>
          <CreateOrUpdateCakePartForm
            onUpdateOrCreateCake={updateRequest}
            title={"Editar categoria"}
            defaultValues={{ name: currentCategory }}
          />
        </Modal>
      )}

      <div className={styles.card}>
        <h5>{currentCategory}</h5>

        <ActionButtons
          openModal={() => setModalIsActived(true)}
          requestIsPending={requestIsPending}
          deleteRequest={() => deleteRequest(id)}
        />
      </div>
    </>
  );
}

export default CakeTypeCard;
