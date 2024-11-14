import { AuthResponse } from "@/@types/Auth";
import { LoginAction } from "@/actions/auth";
import { UserContext } from "@/contexts/userProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const messagesError = {
  invalid_type_error: "Esse campo é invalido!",
  required_error: "Esse campo é obrigatório!"
};

const schema = z.object({
  email: z
    .string(messagesError)
    .trim()
    .min(1, messagesError.required_error)
    .email(messagesError.invalid_type_error),
  password: z
    .string(messagesError)
    .min(8, "A senha precisa ter pelo menos 8 caracteres")
    .trim()
});

type Schema = z.infer<typeof schema>;

export const useLoginForm = (loginAction: LoginAction) => {
  const [redirect] = useQueryState(
    "redirect",
    parseAsString.withOptions({ clearOnDefault: true })
  );

  const { changeUserLogged } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid }
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" }
  });
  const [isLogged, setIsLogged] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const submitIsDisabled = !isMounted || !isValid || isSubmitting || isLogged;
  const router = useRouter();

  useEffect(() => setIsMounted(true), []);

  const onSubmit: SubmitHandler<Schema> = async ({ email, password }) => {
    const { error, user } = await loginAction(email, password);

    if (error || !user) {
      reset();

      toast.error(error || "Ocorreu um erro, por favor tente novamente!");
      return;
    }

    changeUserLogged(user);
    setIsLogged(true);

    router.push(decodeURIComponent(redirect || "/"));
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    submitIsDisabled,
    errors,
    isSubmitting,
    isLogged
  };
};
