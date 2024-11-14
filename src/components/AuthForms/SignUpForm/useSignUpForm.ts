import { AuthResponse } from "@/@types/Auth";
import { parseAsString, useQueryState } from "nuqs";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SignUpAction } from "@/actions/auth";

const messagesError = {
  invalid_type_error: "Esse campo é invalido!",
  required_error: "Esse campo é obrigatório!"
};

const schema = z
  .object({
    name: z.string(messagesError).trim().min(1, messagesError.required_error),
    username: z
      .string(messagesError)
      .trim()
      .min(1, messagesError.required_error),
    email: z
      .string(messagesError)
      .trim()
      .min(1, messagesError.required_error)
      .email(messagesError.invalid_type_error),
    password: z
      .string(messagesError)
      .min(8, "A senha precisa ter pelo menos 8 caracteres")
      .trim(),
    confirmPassword: z
      .string(messagesError)
      .min(1, messagesError.required_error)
      .trim()
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem"
  });

type Schema = z.infer<typeof schema>;

export const useSignUpForm = (signUpAction: SignUpAction) => {
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
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  const [isLogged, setIsLogged] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const submitIsDisabled = !isMounted || !isValid || isSubmitting || isLogged;
  const router = useRouter();

  useEffect(() => setIsMounted(true), []);

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    const { error, user } = await signUpAction(
      data.name,
      data.username,
      data.email,
      data.password,
      data.confirmPassword
    );

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
