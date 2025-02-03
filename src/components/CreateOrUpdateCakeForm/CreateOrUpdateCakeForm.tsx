"use client";
import styles from "./CreateOrUpdateCakeForm.module.scss";
import { CUSTOMIZABLE_PARTS_ENUM, SIZES_POSSIBLES_ENUM } from "@/@types/Cake";
import FillingsInputs from "@/components/FillingsInputs/FillingsInputs";
import SelectInfiniteScoll from "@/components/Selects/SelectInfiniteScroll/SelectInfiniteScroll";
import PriceInput from "./components/PriceInput/PriceInput";
import { useCreateOrUpdateCakeForm } from "./useCreateOrUpdateCakeForm";
import { SchemaCakeForm as Schema } from "./utils/zodSchema";
import SelectManyTagsInfiniteScroll from "@/components/Selects/SelectManyTagsInfiniteScroll/SelectManyTagsInfiniteScroll";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import ImageDropzone from "./components/ImageDropzone/ImageDropzone";
import { useCakePartsSharedOptions } from "./useCakePartsSharedOptions";
import { translateCustomizableParts } from "@/utils/translateCustomizableParts";
import { SubmitData } from "@/@types/UpdateOrCreateCakeForm";

type Props = {
  defaultValues?: Schema & { id: string; imageUrl?: string };
  onUpdateOrCreateCake?: (
    fileImage: File | null,
    data: SubmitData
  ) => Promise<void> | void;
};

function CreateOrUpdateCakeForm({
  defaultValues,
  onUpdateOrCreateCake
}: Props) {
  const {
    cakeTypesOptions,
    fillingsOptions,
    frostingsOptions,
    categoriesOptions,
    cakeTypesPage,
    categoriesPage,
    fillingsPage,
    frostingsPage,
    getMoreCakeTypesOptions,
    getMoreFrostingOptions,
    getMoreFillingOptions,
    getMoreCategoriesOptions
  } = useCakePartsSharedOptions();

  const {
    handleSubmit,
    imageFile,
    setImageFile,
    errors,
    register,
    control,
    trigger,
    typeSelected,
    fillingsSelecteds,
    sizeSelected,
    customizablePartsSelecteds,
    categoriesSelecteds,
    setValue,
    sizesPossiblesArray,
    isSubmitting,
    submitIsDisabled,
    typeForm
  } = useCreateOrUpdateCakeForm(
    defaultValues,
    onUpdateOrCreateCake,
    cakeTypesOptions
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h4>{typeForm === "edit" ? "Editar bolo" : "Criar bolo"}</h4>

      <div className={`${styles.divInput}`}>
        <label htmlFor="nome">Nome: </label>

        <input
          {...register("name", { required: true })}
          className={`${styles.input} ${
            !!errors.name?.message ? styles.inputInvalid : ""
          }`}
          type="text"
        />

        <MessageError>{errors.name?.message}</MessageError>
      </div>

      <div className={`${styles.divInput}`}>
        <label>Tipo da massa padrão: </label>
        <SelectInfiniteScoll
          initialOptions={cakeTypesOptions}
          defaultValue={defaultValues?.type || cakeTypesOptions[0]}
          onChangeOption={(newValue) => {
            setValue("type", newValue || typeSelected);
          }}
          limit={12}
          initialPage={cakeTypesPage}
          isRequired
          onLoadMoreOptions={getMoreCakeTypesOptions}
        />

        <MessageError>{errors.type?.message}</MessageError>
      </div>

      <div className={`${styles.divInput}`}>
        <label>Cobertura padrão:</label>
        <SelectInfiniteScoll
          initialOptions={frostingsOptions}
          defaultValue={
            defaultValues?.frosting !== null
              ? defaultValues?.frosting
              : undefined
          }
          isRequired={false}
          nullOptionLabel="Sem cobertura"
          onChangeOption={(newValue) => {
            setValue("frosting", newValue || null);
          }}
          limit={12}
          initialPage={frostingsPage}
          onLoadMoreOptions={getMoreFrostingOptions}
        />

        <MessageError>{errors.frosting?.message}</MessageError>
      </div>

      <FillingsInputs
        label="Recheios padrão:"
        fillingsSelecteds={fillingsSelecteds}
        sizeSelected={sizeSelected}
        setFillings={(newFillings) => {
          setValue("fillings", newFillings);
          trigger();
        }}
        selectInitialValue={defaultValues?.fillings[0] || fillingsOptions[0]}
        errorMessage={errors.fillings?.message}
        fillingsOptions={fillingsOptions}
        initialPage={fillingsPage}
        onLoadMoreOptions={getMoreFillingOptions}
        isCustomizable
      />

      <div className={`${styles.divInput}`}>
        <label>Categorias: </label>
        <SelectManyTagsInfiniteScroll
          initialOptions={categoriesOptions}
          initialPage={categoriesPage}
          limit={12}
          onLoadMoreOptions={getMoreCategoriesOptions}
          newSelectedsOptions={categoriesSelecteds}
          noOneOptionSelectedsMessage="Nenhuma categoria selecionada ainda."
          onChangedOptionsSelecteds={(newCategories) => {
            setValue("categories", newCategories);
          }}
        />
        <MessageError>{errors.categories?.message}</MessageError>
      </div>

      <div>
        <label>Partes personalizáveis pelo cliente: </label>
        <div className={styles.divRadioCheckbox}>
          {CUSTOMIZABLE_PARTS_ENUM.map((part) => (
            <div className={styles.divInput} key={part}>
              <input
                {...register(`customizableParts.${part}`, {
                  required: true,
                  deps: ["sizesPossibles", "size", "fillings"]
                })}
                type="checkbox"
                id={`customizableParts.${part}`}
              />

              <label htmlFor={`customizableParts.${part}`}>
                {translateCustomizableParts[part]}
              </label>
            </div>
          ))}
        </div>

        <MessageError>{errors.customizableParts?.message}</MessageError>
      </div>
      <div>
        <label>Tamanho padrão: </label>
        <div className={styles.divRadioCheckbox}>
          {SIZES_POSSIBLES_ENUM.map((size) => (
            <div className={styles.divInput} key={size}>
              <input
                {...register("size", { required: true, deps: ["fillings"] })}
                type="radio"
                value={size}
                id={size}
              />
              <label htmlFor={size}>{size}</label>
            </div>
          ))}
        </div>

        <MessageError>{errors.size?.message}</MessageError>
      </div>

      <div>
        <label
          className={!customizablePartsSelecteds.size ? styles.disabled : ""}
        >
          Tamanho possíveis:
        </label>
        <div className={styles.divRadioCheckbox}>
          {SIZES_POSSIBLES_ENUM.map((size) => (
            <div className={styles.divInput} key={size}>
              <input
                {...register(`sizesPossibles.${size}`, {
                  required: true,
                  deps: ["size", `pricePerSize.${size}`, "fillings"]
                })}
                type="checkbox"
                id={`sizesPossibles.${size}`}
                disabled={!customizablePartsSelecteds.size}
              />

              <label
                className={
                  !customizablePartsSelecteds.size ? styles.disabled : ""
                }
                htmlFor={`sizesPossibles.${size}`}
              >
                {size}
              </label>
            </div>
          ))}
        </div>

        <MessageError>
          {errors.sizesPossibles?.pequeno?.message ||
            errors.sizesPossibles?.medio?.message ||
            errors.sizesPossibles?.grande?.message ||
            errors.sizesPossibles?.["extra-grande"]?.message ||
            errors.sizesPossibles?.message}
        </MessageError>
      </div>

      <div className={styles.divPricesPerSize}>
        <label>Preço por tamanho (sem contar cobertura e recheio): </label>

        <div className={styles.divInputPrices}>
          {sizesPossiblesArray.map((size) => (
            <PriceInput
              key={size}
              size={size}
              control={control}
              error={errors.pricePerSize?.[size]?.message}
            />
          ))}
        </div>

        <MessageError>
          {errors.pricePerSize?.pequeno?.message ||
            errors.pricePerSize?.medio?.message ||
            errors.pricePerSize?.grande?.message ||
            errors.pricePerSize?.["extra-grande"]?.message ||
            errors.pricePerSize?.message}
        </MessageError>
      </div>

      <ImageDropzone
        file={imageFile}
        setFile={setImageFile}
        imageUrl={defaultValues?.imageUrl}
      />

      <div>
        <button type="submit" disabled={submitIsDisabled}>
          {!isSubmitting ? (
            <>{!!defaultValues ? "Salvar" : "Criar Bolo"}</>
          ) : (
            <SpinnerLoader color="#fff" size={1} unitSize="rem" />
          )}
        </button>
      </div>
    </form>
  );
}

const MessageError = ({ children }: { children: React.ReactNode }) => (
  <p className={`text ${styles.messageError}`}>{children}</p>
);

export default CreateOrUpdateCakeForm;
