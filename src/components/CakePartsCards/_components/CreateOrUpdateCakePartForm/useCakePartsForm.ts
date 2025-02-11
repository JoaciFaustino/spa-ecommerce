import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const required_error = "Esse campo é obrigatório!";
const invalid_type_error = "Esse campo é invalido!";
const errors = { invalid_type_error, required_error };

const schema = z.object({
  name: z.string(errors).min(1, required_error).trim(),
  price: z.number(errors).min(0.5, "Esse preço é muito barato!")
});

type Schema = z.infer<typeof schema>;

export const useCakePartsForm = (
  onCreateOrUpdate?: (data: Schema) => Promise<void>,
  defaultValues?: { name: string; price?: number },
  havePrice: boolean = false
) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name || "",
      price: havePrice ? (defaultValues?.price || 0) : 999 //prettier-ignore
    }
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const submitIsDisabled = !isMounted || isSubmitting || !isValid;

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    if (onCreateOrUpdate) {
      await onCreateOrUpdate({ ...data, price: havePrice ? data.price : 0 });
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    submitIsDisabled,
    errors,
    control,
    isSubmitting
  };
};
