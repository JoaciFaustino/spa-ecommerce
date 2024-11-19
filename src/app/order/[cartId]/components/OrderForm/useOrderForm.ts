import { useForm } from "react-hook-form";
import { TYPE_OF_RECEIPT_OPTIONS } from "@/@types/Order";
import { UserContext } from "@/contexts/userProvider";
import { phoneNumberValidator } from "@/utils/regexValidators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { useHookFormMask } from "use-mask-input";
import { createOrder } from "@/services/order";
import { toast } from "react-toastify";
import { CartContext } from "@/contexts/CartProvider";
import { useRouter } from "next/navigation";

const messagesError = {
  invalid_type_error: "Esse campo é invalido!",
  required_error: "Esse campo é obrigatório!"
};

const deliveryAdressSchema = z.object({
  street: z.string(messagesError).trim().min(1, messagesError.required_error),
  number: z.string(messagesError).trim().min(1, messagesError.required_error),
  neighborhood: z
    .string(messagesError)
    .trim()
    .min(1, messagesError.required_error),
  adicionalInfo: z.string(messagesError).trim().optional()
});

const schema = z.object({
  contactDetails: z.object({
    name: z.string(messagesError).trim().min(1, messagesError.required_error),
    phoneNumber: z
      .string(messagesError)
      .trim()
      .min(1, messagesError.required_error)
      .refine(
        (value) => phoneNumberValidator(value),
        "Esse número não é válido"
      ),
    email: z
      .string(messagesError)
      .trim()
      .min(1, messagesError.required_error)
      .email("Esse email não é válido!")
  }),
  deliveryAddress: deliveryAdressSchema.optional(),
  typeOfReceipt: z.enum(TYPE_OF_RECEIPT_OPTIONS, {
    ...messagesError,
    message: "Essa opção é invalida!"
  }),
  observations: z.string(messagesError).trim().optional()
});

type DeliveryAddress = z.infer<typeof deliveryAdressSchema>;
type Schema = z.infer<typeof schema>;

const defaultDeliveryAdress: DeliveryAddress = {
  street: "",
  number: "",
  neighborhood: "",
  adicionalInfo: ""
};

export const useOrderForm = (cartId: string, setOrderAsDone: () => void) => {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting, isValid }
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      contactDetails: {
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: ""
      },
      deliveryAddress: defaultDeliveryAdress,
      typeOfReceipt: "delivery",
      observations: ""
    }
  });
  const registerWithMask = useHookFormMask(register);
  const typeOfReceipt = watch("typeOfReceipt");
  const [isMounted, setIsMounted] = useState(false);
  const submitIsDisabled = !isMounted || !isValid || isSubmitting;
  const [prevDeliveryAddress, setPrevDeliveryAddress] =
    useState<DeliveryAddress>(defaultDeliveryAdress);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    if (watch("contactDetails.name") === "") {
      setValue("contactDetails.name", user?.name || "");
    }

    if (watch("contactDetails.email") === "") {
      setValue("contactDetails.email", user?.email || "");
    }
  }, [user?.name, user?.email]);

  useEffect(() => {
    if (!isMounted) return;

    if (typeOfReceipt === "pick-up") {
      setPrevDeliveryAddress(watch("deliveryAddress") || defaultDeliveryAdress);

      setValue("deliveryAddress", undefined);
    }

    if (typeOfReceipt === "delivery") {
      setValue("deliveryAddress", prevDeliveryAddress);
    }

    trigger("deliveryAddress");
  }, [typeOfReceipt]);

  const onSubmit = async ({
    contactDetails,
    typeOfReceipt,
    deliveryAddress,
    observations
  }: Schema) => {
    try {
      await createOrder(
        cartId || "",
        typeOfReceipt,
        contactDetails,
        deliveryAddress,
        observations
      );

      setOrderAsDone();

      toast.success("Pedido finalizado, agradecemos a sua compra!");
      router.push("/menu?sortBy=popularidade");
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao finalizar pedido! Tente novamente mais tarde."
      );
    }
  };

  return {
    register,
    typeOfReceipt,
    errors,
    submitIsDisabled,
    registerWithMask,
    handleSubmit: handleSubmit(onSubmit)
  };
};
