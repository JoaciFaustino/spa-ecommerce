"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./FormUpdateOrder.module.scss";
import {
  ORDER_STATE_TRANSLATE,
  OrderState,
  orderStateRetranslate,
  OrderStateTranlate,
  orderStateTranlate,
  TypeOfReceipt
} from "@/@types/Order";
import DateTimeInput from "../DateTimeInput/DateTimeInput";
import Select from "@/components/Selects/Select/Select";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import { toast } from "react-toastify";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { normalizeDate } from "@/utils/dateUtils";

const getMinDate = () => {
  const date = new Date();
  date.setSeconds(0, 0);
  const minutes = date.getMinutes();

  if (minutes > 30) {
    date.setHours(date.getHours() + 1, 0, 0, 0);
  }

  if (minutes > 0 && minutes <= 30) {
    date.setMinutes(30, 0, 0);
  }

  return date;
};

const getMaxDate = (today: Date) => {
  const oneYearFromToday = new Date(today);
  oneYearFromToday.setFullYear(today.getFullYear() + 1);

  return oneYearFromToday;
};

const orderStates = [...ORDER_STATE_TRANSLATE];

const messagesError = {
  invalid_type_error: "Esse campo é invalido!",
  required_error: "Esse campo é obrigatório!"
};

const schema = z.object({
  state: z.enum(ORDER_STATE_TRANSLATE, messagesError),
  dateDelivery: z
    .string(messagesError)
    .datetime({ message: messagesError.invalid_type_error })
    .optional()
    .refine((dateString) => {
      const deliveryDate = new Date(dateString || "invalid value");

      return !dateString || deliveryDate < new Date();
    }, "Essa data já passou!")
    .refine((dateString) => {
      const deliveryDate = new Date(dateString || "invalid value");

      return !dateString || deliveryDate > getMaxDate(new Date());
    }, "essa data está muito distante!")
});

type Schema = z.infer<typeof schema>;

type PropsFormUpdateOrder = {
  defaultValues: {
    dateDelivery: Date | undefined;
    state: OrderState;
  };
  typeOfReceipt: TypeOfReceipt;
  onUpdate: (data: {
    newDateDelivery: Date | undefined;
    newState: OrderState;
  }) => Promise<void> | void;
};

function FormUpdateOrder({
  defaultValues,
  typeOfReceipt,
  onUpdate
}: PropsFormUpdateOrder) {
  const [isMounted, setIsMounted] = useState(false);
  const [minDate] = useState(() => getMinDate());
  const [maxDate] = useState(() => getMaxDate(minDate));

  const {
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
      isValid,
      defaultValues: defaultValuesForm
    },
    watch
  } = useForm<Schema>({
    defaultValues: {
      state: orderStateTranlate[defaultValues.state],
      dateDelivery: defaultValues.dateDelivery?.toISOString()
    }
  });

  const dateSelected: Date | undefined =
    normalizeDate(watch("dateDelivery")) || undefined;

  useEffect(() => setIsMounted(true), []);

  const onSubmit: SubmitHandler<Schema> = async ({ state, dateDelivery }) => {
    if (
      state === defaultValuesForm?.state &&
      dateDelivery === defaultValuesForm?.dateDelivery
    ) {
      toast.info("Faça alguma alteração antes de salvar!");

      return;
    }

    const newDateDelivery =
      typeOfReceipt === "delivery"
        ? normalizeDate(dateDelivery) || undefined
        : undefined;

    await onUpdate({
      newDateDelivery: newDateDelivery,
      newState: orderStateRetranslate[state]
    });
  };

  const submitIsDisabled = !isMounted || !isValid || isSubmitting;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Estado</label>

        <Select
          options={orderStates}
          defaultValue={orderStateTranlate[defaultValues.state]}
          isRequired
          onChangeOption={(newState) => {
            if (orderStates.includes(newState as OrderStateTranlate)) {
              setValue("state", newState as OrderStateTranlate);
            }
          }}
        />

        {!!errors.state?.message && (
          <p className={`text ${styles.messageError}`}>
            {errors.state?.message}
          </p>
        )}
      </div>

      {typeOfReceipt === "delivery" && (
        <div>
          <label htmlFor="date-time-input">Data de entrega</label>

          <DateTimeInput
            dateSelected={dateSelected || null}
            minDate={minDate}
            maxDate={maxDate}
            onChangeDate={(newDate) => {
              setValue("dateDelivery", newDate?.toISOString());
            }}
          />

          {errors.dateDelivery && (
            <p className={`text ${styles.messageError}`}>
              {errors.dateDelivery?.message}
            </p>
          )}
        </div>
      )}

      <button type="submit" disabled={submitIsDisabled}>
        {!isSubmitting ? (
          <>Salvar</>
        ) : (
          <SpinnerLoader color="#fff" size={1} unitSize="rem" />
        )}
      </button>
    </form>
  );
}

export default FormUpdateOrder;
