"use client";
import { useState } from "react";
import SearchAndCreateBar from "@/app/dashboard/_components/SearchAndCreateBar/SearchAndCreateBar";
import CreateOrUpdateCakePartForm from "@/components/CakePartsCards/_components/CreateOrUpdateCakePartForm/CreateOrUpdateCakePartForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createFrosting } from "@/services/frostings";

function SearchAndCreateFrostingBar() {
  const [modalIsActived, setModalIsActived] = useState(false);

  const router = useRouter();

  const createRequest = async ({
    name,
    price
  }: {
    name: string;
    price: number;
  }) => {
    try {
      await createFrosting({ name, price });

      toast.success("Cobertura criado com sucesso!");
      setModalIsActived(false);

      router.refresh();
    } catch (error) {
      toast.error("Erro ao criar cobertura");
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
          title="Criar cobertura"
          onUpdateOrCreateCakePart={createRequest}
        />
      }
    />
  );
}

export default SearchAndCreateFrostingBar;
