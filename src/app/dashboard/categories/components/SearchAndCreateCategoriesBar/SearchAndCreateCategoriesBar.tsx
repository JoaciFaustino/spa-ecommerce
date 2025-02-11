"use client";
import { useState } from "react";
import SearchAndCreateBar from "@/app/dashboard/_components/SearchAndCreateBar/SearchAndCreateBar";
import CreateOrUpdateCakePartForm from "@/components/CakePartsCards/_components/CreateOrUpdateCakePartForm/CreateOrUpdateCakePartForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createCategory } from "@/services/categories";

function SearchAndCreateCategoriesBar() {
  const [modalIsActived, setModalIsActived] = useState(false);
  const router = useRouter();

  const createCategoryRequest = async ({
    name: category
  }: {
    name: string;
    price: number;
  }) => {
    try {
      const cakeType = await createCategory({ category });

      toast.success("Bolo criado com sucesso!");
      setModalIsActived(false);

      router.refresh();
    } catch (error) {
      toast.error("Erro ao criar bolo");
      return;
    }
  };

  return (
    <SearchAndCreateBar
      modalIsActived={modalIsActived}
      openAndCloseModal={(isOpen) => setModalIsActived(isOpen)}
      createFormComponent={
        <CreateOrUpdateCakePartForm
          title="Criar categoria"
          onUpdateOrCreateCake={createCategoryRequest}
        />
      }
    />
  );
}

export default SearchAndCreateCategoriesBar;
