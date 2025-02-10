import styles from "../CakePartsCard.module.scss";
import ActionButtons from "../_components/ActionButtons/ActionButtons";
import Modal from "@/components/Modal/Modal";
import CreateOrUpdateCakePartForm from "../_components/CreateOrUpdateCakePartForm/CreateOrUpdateCakePartForm";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteCakeType, updateCakeType } from "@/services/cakeTypes";
import { ICakeType } from "@/@types/CakeType";

type Props = {
  cakeType: ICakeType;
  updateCakeTypeItem: (id: string, newCakeType: ICakeType) => void;
  deleteCakeTypeItem: (id: string) => void;
};

function CakeTypeCard({
  cakeType: { _id: id, type: currentCakeType },
  updateCakeTypeItem,
  deleteCakeTypeItem
}: Props) {
  const [modalIsActived, setModalIsActived] = useState(false);
  const [requestIsPending, setRequestIsPending] = useState(false);

  const updateRequest = async ({
    name: newType
  }: {
    name: string;
    price: number;
  }) => {
    if (newType === currentCakeType) {
      toast.info("Faça alguma alteração antes de salvar!");
      return;
    }

    try {
      const newCakeType = await updateCakeType(id, { type: newType });

      toast.success("Tipo de massa alterado com sucesso!");
      updateCakeTypeItem(id, newCakeType);
      setModalIsActived(false);
    } catch (error) {
      toast.error("Erro ao editar tipo de massa");
    }
  };

  const deleteRequest = async (id: string) => {
    setRequestIsPending(true);

    try {
      await deleteCakeType(id);

      deleteCakeTypeItem(id);

      toast.success("Bolo apagado com sucesso!");
    } catch (error) {
      toast.error("Erro ao apagar esse bolo, tente novamente!");
    }

    setRequestIsPending(false);
  };

  return (
    <>
      {modalIsActived && (
        <Modal onClose={() => setModalIsActived(false)}>
          <CreateOrUpdateCakePartForm
            onUpdateOrCreateCake={updateRequest}
            title={"Editar tipo de massa"}
            defaultValues={{ name: currentCakeType }}
          />
        </Modal>
      )}

      <div className={styles.card}>
        <h5>{currentCakeType}</h5>

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
