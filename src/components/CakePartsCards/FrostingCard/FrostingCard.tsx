"use client";
import styles from "../CakePartsCard.module.scss";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import CreateOrUpdateCakePartForm from "../_components/CreateOrUpdateCakePartForm/CreateOrUpdateCakePartForm";
import ActionButtons from "../_components/ActionButtons/ActionButtons";
import { IFrosting } from "@/@types/Frosting";
import { deleteFrosting, updateFrosting } from "@/services/frostings";
import { formatPriceNumber } from "@/utils/formatPrice";

type Props = {
  frosting: IFrosting;
  updateFrostingItem: (id: string, newFrosting: IFrosting) => void;
  deleteFrostingItem: (id: string) => void;
};

function FrostingCard({
  frosting: { _id: id, name: currentName, price: currentPrice },
  updateFrostingItem,
  deleteFrostingItem
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
      const newFrosting = await updateFrosting(id, {
        name: newName === currentName ? undefined : newName,
        price: newPrice === currentPrice ? undefined : newPrice
      });

      toast.success("Cobertura alterado com sucesso!");
      updateFrostingItem(id, newFrosting);
      setModalIsActived(false);
    } catch (error) {
      toast.error("Erro ao editar cobertura");
    }
  };

  const deleteRequest = async (id: string) => {
    setRequestIsPending(true);

    try {
      await deleteFrosting(id);

      deleteFrostingItem(id);

      toast.success("Cobertura apagado com sucesso!");
    } catch (error) {
      toast.error("Erro ao apagar esse cobertura, tente novamente!");
    }

    setRequestIsPending(false);
  };

  return (
    <>
      {modalIsActived && (
        <Modal onClose={() => setModalIsActived(false)}>
          <CreateOrUpdateCakePartForm
            havePrice
            onUpdateOrCreateCakePart={updateRequest}
            title={"Editar Cobertura"}
            defaultValues={{ name: currentName, price: currentPrice }}
          />
        </Modal>
      )}

      <div className={styles.card}>
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

export default FrostingCard;
