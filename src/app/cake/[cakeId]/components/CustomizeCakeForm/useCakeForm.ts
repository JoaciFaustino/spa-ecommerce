import { ICake, Size, SIZES_POSSIBLES_ENUM } from "@/@types/Cake";
import { PersonalizedCake } from "@/@types/Cart";
import { IFilling } from "@/@types/Filling";
import { IFrosting } from "@/@types/Frosting";
import { CartContext } from "@/contexts/CartProvider";
import { addItemToCart } from "@/services/requests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCalculatePricing } from "./useCalculatePricing";

const messagesError = {
  invalid_type_error: "Esse campo é invalido!",
  required_error: "Esse campo é obrigatório!"
};

const maxQuantity = 20;
const minQuantity = 1;

const schema = z.object({
  type: z.string(messagesError).trim(),
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

const getFillingsSelectedsObjs = (
  fillingsSelectedsStrings: string[],
  fillingsOptions: IFilling[]
): IFilling[] => {
  const fillingsObjs: IFilling[] = fillingsSelectedsStrings.reduce(
    (fillingsObjs: IFilling[], fillingSelected: string) => {
      const [fillingObj] = fillingsOptions.filter(
        ({ name }) => name === fillingSelected
      );

      return fillingObj ? [...fillingsObjs, fillingObj] : [...fillingsObjs];
    },
    []
  );

  return fillingsObjs;
};

const getFrostingSelectedObj = (
  frostingSelected: string | undefined,
  frostingOptions: IFrosting[]
): IFrosting | undefined => {
  const [frostingsObj] = frostingOptions.filter(
    ({ name }) => name === frostingSelected
  );

  return frostingsObj;
};

export const useCakeForm = (
  {
    _id: cakeId,
    type: defaultType,
    frosting: defaultFrosting,
    fillings: defaultFillings,
    size: defaultSize,
    pricePerSize
  }: ICake,
  fillingsOptions: IFilling[],
  frostingOptions: IFrosting[]
) => {
  const router = useRouter();
  const { cartId, addItemToCart: addItemToCartContext } =
    useContext(CartContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isValid },
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

  const typeSelected = watch("type");
  const frostingSelected = watch("frosting");
  const fillingsSelecteds = watch("fillings");
  const sizeSelected = watch("size");
  const quantity = watch("quantity") || 0;

  const { totalPriceString, totalPriceNumber } = useCalculatePricing(
    pricePerSize[sizeSelected] || 0,
    getFillingsSelectedsObjs(fillingsSelecteds, fillingsOptions),
    getFrostingSelectedObj(frostingSelected, frostingOptions),
    quantity
  );

  const submitIsDisabled =
    totalPriceNumber <= 0 ||
    Number.isNaN(totalPriceNumber) ||
    !isValid ||
    isSubmitting ||
    isSubmitted;

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
      if (!cartId || submitIsDisabled) {
        toast.error("Falha ao adicionar item ao carrinho!");
        return;
      }

      const itemCart: PersonalizedCake = await addItemToCart(
        cartId,
        cakeId,
        quantity,
        type,
        frosting === "" ? undefined : frosting,
        fillings,
        size
      );

      addItemToCartContext(itemCart);

      toast.success("Item adicionado ao carrinho com sucesso!");

      router.push("/menu?sortBy=popularidade");
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
    register,
    errors,
    setValue,
    handleChangeQuantity,
    totalPriceString,
    totalPriceNumber,
    submitIsDisabled,
    handleSubmit: handleSubmit(onSubmit)
  };
};
