import { ICake, ICakeUpdateBody, SIZES_POSSIBLES_ENUM } from "@/@types/Cake";
import { SubmitData } from "@/@types/UpdateOrCreateCakeForm";
import { deleteCake, updateCake } from "@/services/cakes";
import { areStringArraysEqual } from "@/utils/arrayUtils";
import { useState } from "react";
import { toast } from "react-toastify";

const removeIfNoUpdated = <T extends string>(
  value: T[] = [],
  oldValue: T[] = []
) => (areStringArraysEqual(value, oldValue) ? undefined : value);

const getJustUpdatedFields = (
  cake: SubmitData,
  newCake: SubmitData
): ICakeUpdateBody => {
  const somePriceIsDiff = SIZES_POSSIBLES_ENUM.some(
    (size) => newCake.pricePerSize[size] !== cake.pricePerSize[size]
  );

  return {
    name: newCake.name !== cake.name ? newCake.name : undefined,
    type: newCake.type !== cake.type ? newCake.type : undefined,
    frosting: newCake.frosting !== cake.frosting ? newCake.frosting : undefined,
    fillings: removeIfNoUpdated(newCake.fillings, cake.fillings),
    categories: removeIfNoUpdated(newCake.categories, cake.categories),
    size: newCake.size === cake.size ? undefined : newCake.size,
    sizesPossibles: removeIfNoUpdated(
      newCake.sizesPossibles,
      cake.sizesPossibles
    ),
    customizableParts: removeIfNoUpdated(
      newCake.customizableParts,
      cake.customizableParts
    ),
    pricePerSize: somePriceIsDiff ? newCake.pricePerSize : undefined
  };
};

export const useUpdateAndDeleteCake = (
  cake: ICake,
  onUpdateCake: ((newCake: ICake) => void) | undefined,
  onDeleteCake: ((id: string) => void) | undefined
) => {
  const [modalIsActived, setModalIsActived] = useState(false);
  const [requestIsPending, setRequestIsPending] = useState(false);

  const updateCakeRequest = async (
    fileImage: File | null,
    data: SubmitData
  ) => {
    const currentCake = {
      ...cake,
      frosting: cake.frosting?.name || null,
      fillings: cake.fillings.map(({ name }) => name)
    };

    const partsToUpdate = getJustUpdatedFields(currentCake, data);

    if (Object.values(partsToUpdate).every((value) => value === undefined)) {
      toast.info("Faça alguma alteração antes de salvar!");

      return;
    }

    try {
      const newCake = await updateCake(
        currentCake._id,
        fileImage,
        partsToUpdate
      );

      toast.success("Bolo alterado com sucesso!");

      if (onUpdateCake) {
        onUpdateCake(newCake);
      }

      setModalIsActived(false);
    } catch (error) {
      toast.error("Erro ao editar bolo");
    }
  };

  const deleteCakeRequest = async () => {
    setRequestIsPending(true);

    try {
      await deleteCake(cake._id);

      if (onDeleteCake) {
        onDeleteCake(cake._id);
      }

      toast.success("Bolo apagado com sucesso!");
    } catch (error) {
      toast.error("Erro ao apagar esse bolo, tente novamente!");
    }

    setRequestIsPending(false);
  };

  return {
    updateCakeRequest,
    modalIsActived,
    requestIsPending,
    deleteCakeRequest,
    openModal: () => setModalIsActived(true),
    closeModal: () => setModalIsActived(false)
  };
};
