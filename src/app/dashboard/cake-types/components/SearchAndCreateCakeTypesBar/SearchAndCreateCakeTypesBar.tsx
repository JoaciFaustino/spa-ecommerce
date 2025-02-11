"use client";
import { useState } from "react";
import SearchAndCreateBar from "@/app/dashboard/_components/SearchAndCreateBar/SearchAndCreateBar";
import CreateOrUpdateCakePartForm from "@/components/CakePartsCards/_components/CreateOrUpdateCakePartForm/CreateOrUpdateCakePartForm";
import { createCakeType } from "@/services/cakeTypes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function SearchAndCreateCakeTypesBar() {
  const [modalIsActived, setModalIsActived] = useState(false);

  const router = useRouter();

  const createCakeTypeRequest = async ({
    name: type
  }: {
    name: string;
    price: number;
  }) => {
    try {
      const cakeType = await createCakeType({ type });

      toast.success("Tipo de massa criado com sucesso!");
      setModalIsActived(false);

      router.refresh();
    } catch (error) {
      toast.error("Erro ao criar tipo de massa");
      return;
    }
  };

  return (
    <SearchAndCreateBar
      modalIsActived={modalIsActived}
      openAndCloseModal={(isOpen) => setModalIsActived(isOpen)}
      createFormComponent={
        <CreateOrUpdateCakePartForm
          title="Criar Tipo da massa"
          onUpdateOrCreateCakePart={createCakeTypeRequest}
        />
      }
    />
  );
}

export default SearchAndCreateCakeTypesBar;
