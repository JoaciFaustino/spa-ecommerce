import FormInput from "@/components/FormInput/FormInput";
import PriceInput from "@/components/PriceInput/PriceInput";
import styles from "./CreateOrUpdateCakePartForm.module.scss";
import { useCakePartsForm } from "./useCakePartsForm";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";

type Props = {
  title: string;
  havePrice?: boolean;
  onUpdateOrCreateCake: (data: {
    name: string;
    price: number;
  }) => Promise<void>;
  defaultValues?: { name: string; price?: number };
};

function CreateOrUpdateCakePartForm({
  title,
  defaultValues,
  onUpdateOrCreateCake,
  havePrice = false
}: Props) {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    register,
    control,
    submitIsDisabled
  } = useCakePartsForm(onUpdateOrCreateCake, defaultValues);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4>{title}</h4>

      <FormInput
        {...register("name", { required: true })}
        label="Nome"
        placeholder="Nome"
        error={errors.name?.message}
      />

      {havePrice && (
        <PriceInput<{ name: string; price: number }>
          control={control}
          label="Preço"
          name={"price"}
          defaultPrice={0}
          error={errors.price?.message}
        />
      )}

      <div>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={submitIsDisabled}
        >
          {!isSubmitting ? (
            <>{!defaultValues ? "Criar" : "Salvar"}</>
          ) : (
            <SpinnerLoader color="#fff" size={1} unitSize="rem" />
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateOrUpdateCakePartForm;
