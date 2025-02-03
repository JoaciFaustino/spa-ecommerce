import { SubmitHandler, useForm } from "react-hook-form";
import {
  CUSTOMIZABLE_PARTS_ENUM,
  PricePerSize,
  Size,
  SIZES_POSSIBLES_ENUM
} from "@/@types/Cake";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { SchemaCakeForm as Schema, schemaCakeForm } from "./utils/zodSchema";
import { SubmitData } from "@/@types/UpdateOrCreateCakeForm";

type DefaultValues = Schema & { id: string; imageUrl?: string };

export const useCreateOrUpdateCakeForm = (
  defaultValues?: DefaultValues,
  onUpdateOrCreateCake?: (
    fileImage: File | null,
    data: SubmitData
  ) => Promise<void> | void,
  cakeTypesOptions: string[] = []
) => {
  const typeForm = defaultValues?.id ? "edit" : "create";

  const defaultValuesHookForm: Schema = useMemo(
    () => ({
      name: defaultValues?.name || "",
      type: defaultValues?.type || cakeTypesOptions[0],
      categories: defaultValues?.categories || [],
      frosting: defaultValues?.frosting || null,
      fillings: defaultValues?.fillings || [],
      size: defaultValues?.size || "medio",
      sizesPossibles: defaultValues?.sizesPossibles || {
        pequeno: false,
        medio: false,
        grande: false,
        "extra-grande": false
      },
      pricePerSize: {
        pequeno: defaultValues?.pricePerSize?.pequeno || 0,
        medio: defaultValues?.pricePerSize?.medio || 0,
        grande: defaultValues?.pricePerSize?.grande || 0,
        "extra-grande": defaultValues?.pricePerSize?.["extra-grande"] || 0
      },
      customizableParts: defaultValues?.customizableParts || {
        type: false,
        size: false,
        filing: false,
        frosting: false
      }
    }),
    []
  );

  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    setValue,
    register,
    trigger,
    control
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schemaCakeForm),
    defaultValues: defaultValuesHookForm
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const typeSelected = watch("type");
  const fillingsSelecteds = watch("fillings");
  const sizeSelected = watch("size");
  const customizablePartsSelecteds = watch("customizableParts");
  const sizesPossiblesSelecteds = watch("sizesPossibles");
  const categoriesSelecteds = watch("categories");

  const sizesPossiblesArray: Size[] = SIZES_POSSIBLES_ENUM.filter(
    (size) => sizesPossiblesSelecteds[size]
  );

  const sizeIsCustomizable = customizablePartsSelecteds.size;

  const [storedSizesPossibles, setStoredSizesPossibles] = useState(
    defaultValuesHookForm.sizesPossibles
  );

  const [isMounted, setIsMounted] = useState(false);

  const submitIsDisabled = !isMounted || !isValid || isSubmitting;

  useEffect(() => {
    setIsMounted(true);

    storeOrSetSizesPossible();
  }, [customizablePartsSelecteds.size]);

  useEffect(() => {
    if (!sizeIsCustomizable) {
      leaveJustSizeSelectedInSizesPossible();
    }
  }, [sizeSelected]);

  useEffect(() => {
    trigger("size");
    trigger("fillings");
    trigger("pricePerSize.pequeno");
    trigger("pricePerSize.medio");
    trigger("pricePerSize.grande");
    trigger("pricePerSize.extra-grande");
  }, [sizesPossiblesSelecteds, customizablePartsSelecteds]);

  const storeOrSetSizesPossible = () => {
    if (!sizeIsCustomizable) {
      leaveJustSizeSelectedInSizesPossible();
      setStoredSizesPossibles(sizesPossiblesSelecteds);

      return;
    }

    setValue("sizesPossibles", storedSizesPossibles);
  };

  const leaveJustSizeSelectedInSizesPossible = () => {
    const newSizesPossibles: typeof sizesPossiblesSelecteds = {
      pequeno: false,
      medio: false,
      grande: false,
      "extra-grande": false,
      [sizeSelected]: true
    };

    setValue("sizesPossibles", newSizesPossibles);
  };

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    const sizesPossibles = SIZES_POSSIBLES_ENUM.filter(
      (size) => data.sizesPossibles[size]
    );
    const customizableParts = CUSTOMIZABLE_PARTS_ENUM.filter(
      (customizablePart) => data.customizableParts[customizablePart]
    );

    const pricePerSizeWithoutUnusablePrices = sizesPossibles.reduce(
      (acm: PricePerSize, size) => {
        return { ...acm, [size]: data.pricePerSize[size] };
      },
      {}
    );

    const normalizedData: SubmitData = {
      ...data,
      sizesPossibles,
      customizableParts,
      pricePerSize: pricePerSizeWithoutUnusablePrices
    };

    if (onUpdateOrCreateCake) {
      await onUpdateOrCreateCake(imageFile, normalizedData);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
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
  };
};
