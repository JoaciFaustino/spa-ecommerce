import { Size, SIZES_POSSIBLES_ENUM } from "@/@types/Cake";
import { IFilling } from "@/@types/Filling";
import { IFrosting } from "@/@types/Frosting";
import { addItemToCart } from "@/services/requests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const messagesError = {
  invalid_type_error: "Esse campo é invalido!",
  required_error: "Esse campo é obrigatório!"
};

const maxQuantity = 20;
const minQuantity = 1;

const schema = z.object({
  type: z.string(messagesError).trim().optional(),
  frosting: z
    .string(messagesError)
    .trim()
    .transform((value) => (value !== "none" ? value : undefined))
    .optional(),
  size: z.enum(SIZES_POSSIBLES_ENUM, {
    ...messagesError,
    message: "Esse campo é invalido!"
  }),
  fillings: z
    .array(z.string(messagesError).trim(), {
      message: "Os recheios são inválidos!"
    })
    .optional()
    .default([]),
  quantity: z
    .number(messagesError)
    .min(minQuantity, { message: "A quantidade precisa ser maior que 1!" })
    .max(maxQuantity, { message: "A quantidade não pode ser maior que 99!" })
    .optional()
    .default(1)
});

type Schema = z.infer<typeof schema>;

export const useCakeForm = (
  cakeId: string,
  defaultType: string,
  defaultFrosting: IFrosting | undefined,
  defaultSize: Size,
  defaultFillings: IFilling[] = []
) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    setValue
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      type: defaultType,
      frosting: defaultFrosting?.name || "",
      size: defaultSize,
      fillings: defaultFillings.map((filling) => filling.name),
      quantity: 1
    }
  });

  const cartId = "669c193ae61c26aae0a8adcc";

  const typeSelected = watch("type");
  const frostingSelected = watch("frosting");
  const fillingsSelecteds = watch("fillings");
  const sizeSelected = watch("size");
  const quantity = watch("quantity") || 0;

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyNumberRegex = /^\d*$/;

    const numberValue = parseInt(e.target.value) || 0;

    if (numberValue < 0) {
      setValue("quantity", 0);
      return;
    }
    if (numberValue > maxQuantity) {
      setValue("quantity", maxQuantity);
      return;
    }
    if (!onlyNumberRegex.test(e.target.value)) {
      return;
    }

    setValue("quantity", numberValue);
  };

  const onSubmit: SubmitHandler<Schema> = async ({
    type,
    fillings,
    quantity,
    size,
    frosting
  }: Schema) => {
    try {
      await addItemToCart(
        cartId,
        cakeId,
        quantity,
        type,
        frosting === "" ? undefined : frosting,
        fillings,
        size
      );

      setIsSubmitted(true);

      toast.success("Item adicionado ao carrinho com sucesso!");

      router.push("/menu");
    } catch (error) {
      toast.error("Falha ao adicionar item ao carrinho!");
    }
  };

  return {
    typeSelected,
    frostingSelected,
    fillingsSelecteds,
    sizeSelected,
    quantity,
    isSubmitting,
    isSubmitted,
    isValid,
    register,
    errors,
    setValue,
    handleChangeQuantity,
    handleSubmit: handleSubmit(onSubmit)
  };
};
