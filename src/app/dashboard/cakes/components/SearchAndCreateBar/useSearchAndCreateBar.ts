import { SubmitData } from "@/@types/UpdateOrCreateCakeForm";
import { toast } from "react-toastify";
import { createCake } from "@/services/cakes";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useSearchAndCreateBar = () => {
  const [modalIsActived, setModalIsActived] = useState(false);
  const router = useRouter();

  const createNewCake = async (fileImage: File | null, data: SubmitData) => {
    if (!fileImage) {
      toast.error("A imagem do bolo é obrigatória!");
      return;
    }

    try {
      const cake = await createCake(fileImage, {
        ...data,
        frosting: data.frosting === null ? undefined : data.frosting
      });

      toast.success("Bolo criado com sucesso!");
      setModalIsActived(false);

      router.refresh();
    } catch (error) {
      console.log(error); //remover isso e também do update quando terminar todos os testes

      toast.error("Erro ao criar bolo");
      return;
    }
  };

  return {
    createNewCake,
    modalIsActived,
    openModal: () => setModalIsActived(true),
    closeModal: () => setModalIsActived(false)
  };
};
