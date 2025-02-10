import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const required_error = "Esse campo é obrigatório!";
const invalid_type_error = "Esse campo é invalido!";
const errors = { invalid_type_error, required_error };

const schema = z.object({
  name: z.string(errors).min(1, required_error).trim(),
  price: z.number(errors).min(0, "Esse preço é muito barato!")
});

type Schema = z.infer<typeof schema>;

export const useCakePartsForm = (
  onCreateOrUpdate?: (data: Schema) => Promise<void>,
  defaultValues?: { name: string; price?: number }
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
      price: defaultValues?.price || 0
    }
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const submitIsDisabled = !isMounted || isSubmitting || !isValid;

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    if (onCreateOrUpdate) {
      await onCreateOrUpdate(data);
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
