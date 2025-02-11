"use client";
import { useState } from "react";
import SearchAndCreateBar from "@/app/dashboard/_components/SearchAndCreateBar/SearchAndCreateBar";
import CreateOrUpdateCakePartForm from "@/components/CakePartsCards/_components/CreateOrUpdateCakePartForm/CreateOrUpdateCakePartForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createFilling } from "@/services/fillings";

function SearchAndCreateFillingBar() {
  const [modalIsActived, setModalIsActived] = useState(false);

  const router = useRouter();

  const createFillingRequest = async ({
    name,
    price
  }: {
    name: string;
    price: number;
  }) => {
    try {
      await createFilling({ name, price });

      toast.success("Recheio criado com sucesso!");
      setModalIsActived(false);

      router.refresh();
    } catch (error) {
      toast.error("Erro ao criar recheio");
      return;
    }
  };

  return (
    <SearchAndCreateBar
      modalIsActived={modalIsActived}
      openAndCloseModal={(isOpen) => setModalIsActived(isOpen)}
      createFormComponent={
        <CreateOrUpdateCakePartForm
          havePrice
          title="Criar recheio"
          onUpdateOrCreateCakePart={createFillingRequest}
        />
      }
    />
  );
}

export default SearchAndCreateFillingBar;
