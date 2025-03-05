"use client";
import styles from "../CakePartsCard.module.scss";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import CreateOrUpdateCakePartForm from "../_components/CreateOrUpdateCakePartForm/CreateOrUpdateCakePartForm";
import ActionButtons from "../_components/ActionButtons/ActionButtons";
import { IFilling } from "@/@types/Filling";
import { deleteFilling, updateFilling } from "@/services/fillings";
import { formatPriceNumber } from "@/utils/formatPrice";

type Props = {
  filling: IFilling;
  updateFillingItem: (id: string, newFilling: IFilling) => void;
  deleteFillingItem: (id: string) => void;
};

function FillingCard({
  filling: { _id: id, name: currentName, price: currentPrice },
  updateFillingItem,
  deleteFillingItem
}: Props) {
  const [modalIsActived, setModalIsActived] = useState(false);
  const [requestIsPending, setRequestIsPending] = useState(false);

  const updateRequest = async ({
    name: newName,
    price: newPrice
  }: {
    name: string;
    price: number;
  }) => {
    if (newName === currentName && newPrice === currentPrice) {
      toast.info("Faça alguma alteração antes de salvar!");
      return;
    }

    try {
      const newFilling = await updateFilling(id, {
        name: newName === currentName ? undefined : newName,
        price: newPrice === currentPrice ? undefined : newPrice
      });

      toast.success("Recheio alterado com sucesso!");
      updateFillingItem(id, newFilling);
      setModalIsActived(false);
    } catch (error) {
      toast.error("Erro ao editar recheio");
    }
  };

  const deleteRequest = async (id: string) => {
    setRequestIsPending(true);

    try {
      await deleteFilling(id);

      deleteFillingItem(id);

      toast.success("Recheio apagado com sucesso!");
    } catch (error) {
      toast.error("Erro ao apagar esse recheio, tente novamente!");
    }
  };

  return (
    <>
      {modalIsActived && (
        <Modal onClose={() => setModalIsActived(false)}>
          <CreateOrUpdateCakePartForm
            havePrice
            onUpdateOrCreateCakePart={updateRequest}
            title={"Editar recheio"}
            defaultValues={{ name: currentName, price: currentPrice }}
          />
        </Modal>
      )}

      <div
        className={`${styles.card} ${requestIsPending ? styles.disabled : ""}`}
      >
        <div>
          <h5>{currentName}</h5>

          <h5 className={styles.price}>{formatPriceNumber(currentPrice)}</h5>
        </div>

        <ActionButtons
          openModal={() => setModalIsActived(true)}
          requestIsPending={requestIsPending}
          deleteRequest={() => deleteRequest(id)}
        />
      </div>
    </>
  );
}

export default FillingCard;
