"use client";
import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./OrderForm.module.scss";
import { useOrderForm } from "./useOrderForm";

function OrderForm({ cartId }: { cartId: string }) {
  const {
    register,
    typeOfReceipt,
    errors,
    submitIsDisabled,
    registerWithMask,
    handleSubmit
  } = useOrderForm(cartId);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <h1>Finalizar Pedido</h1>

        <div className={styles.divRadios}>
          <InputRadio
            {...register("typeOfReceipt", { required: true })}
            value="delivery"
            id="delivery"
            label="Delivery"
          />

          <InputRadio
            {...register("typeOfReceipt", { required: true })}
            value="pick-up"
            id="pick-up"
            label="Retirar na loja"
          />
        </div>
      </div>

      <ol className={styles.formList}>
        <div className={styles.inputGroups}>
          <h3>
            <li>Detalhes de Contato</li>
          </h3>

          <Input
            {...register("contactDetails.name", { required: true })}
            label="Nome"
            id="nome"
            error={errors.contactDetails?.name?.message}
          />

          <Input
            {...registerWithMask(
              "contactDetails.phoneNumber",
              "(99) 99999-9999",
              { required: true }
            )}
            placeholder="(__) _____-____"
            label="Número de telefone"
            id="numero-de-telefone"
            error={errors.contactDetails?.phoneNumber?.message}
          />

          <Input
            {...register("contactDetails.email", { required: true })}
            type="email"
            label="Email"
            id="email"
            error={errors.contactDetails?.email?.message}
          />
        </div>

        {typeOfReceipt === "delivery" && (
          <div className={styles.inputGroups}>
            <h3>
              <li>Endereço de Entrega</li>
            </h3>

            <Input
              {...register("deliveryAddress.street", { required: true })}
              label="Rua"
              error={errors.deliveryAddress?.street?.message}
            />

            <Input
              {...register("deliveryAddress.number", { required: true })}
              label="Número"
              error={errors.deliveryAddress?.number?.message}
            />

            <Input
              {...register("deliveryAddress.neighborhood", {
                required: true
              })}
              placeholder="Bairro"
              label="Bairro"
              error={errors.deliveryAddress?.neighborhood?.message}
            />

            <Input
              {...register("deliveryAddress.adicionalInfo")}
              label="Complemento"
              error={errors.deliveryAddress?.adicionalInfo?.message}
            />
          </div>
        )}

        <div className={styles.inputGroups}>
          <h3>
            <li>Observações</li>
          </h3>

          <Input
            {...register("observations")}
            label="Observações"
            error={errors.observations?.message}
          />
        </div>

        <div className={styles.inputGroups}>
          <h3>
            <li>Pagamento</li>
          </h3>

          <p className={`text ${styles.note}`}>
            A funcionalidade de pagamento não será implementada neste projeto.
            <br />
            <br />
            <span className={styles.italic}>
              The payment funcionality will not be implemented in this project.
            </span>
          </p>
        </div>
      </ol>

      <button type="submit" disabled={submitIsDisabled}>
        Finalizar compra
      </button>
    </form>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, placeholder = label, type = "text", ...props }, ref) => (
    <div className={`${styles.divInput}`}>
      <label htmlFor={props.id}>{label}: </label>

      <input
        className={`${props.className} ${!!error ? styles.inputInvalid : ""}`}
        {...props}
        ref={ref}
        type={type}
        placeholder={placeholder}
      />

      {!!error && <p className={`text ${styles.messageError}`}>{error}</p>}
    </div>
  )
);

const InputRadio = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => (
    <div className={styles.divInputRadio}>
      <input {...props} type="radio" ref={ref} id={id} />

      <label className="text" htmlFor={id}>
        {label}
      </label>
    </div>
  )
);

export default OrderForm;
