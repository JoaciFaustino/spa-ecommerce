import {
  CUSTOMIZABLE_PARTS_ENUM,
  CustomizablesParts,
  PricePerSize,
  Size,
  SIZES_POSSIBLES_ENUM
} from "@/@types/Cake";
import { IFilling } from "@/@types/Filling";
import { formatPriceNumber } from "@/utils/formatPrice";
import { getStringItensListed } from "@/utils/formatStrings";
import { translateCustomizableParts } from "@/utils/translateCustomizableParts";
import { useMemo } from "react";

const sizesOrder: Size[] = ["pequeno", "medio", "grande", "extra-grande"];

const getFillingsString = (fillings: IFilling[]): string =>
  fillings.length > 0
    ? getStringItensListed(fillings.map(({ name }) => name))
    : "nenhum";

const getSizesPossiblesString = (sizesPossibles: Size[]): string => {
  const sizesSorteds = sizesOrder.filter((size) =>
    sizesPossibles.includes(size)
  );

  return getStringItensListed(sizesSorteds);
};

const getPricePerSizesString = (pricePerSize: PricePerSize) => {
  const currencies = sizesOrder
    .map((size) =>
      pricePerSize[size] ? formatPriceNumber(pricePerSize[size]) : undefined
    )
    .filter((size) => typeof size !== "undefined");

  return (
    getStringItensListed(currencies, "; ") +
    " (sem contar cobertura e recheios)"
  );
};

const getCustomizablePartsString = (
  customizableParts: CustomizablesParts[]
) => {
  const customizablePartsTranslateds = customizableParts.map(
    (part) => translateCustomizableParts[part]
  );

  return getStringItensListed(customizablePartsTranslateds);
};

export const useCakePartsTexts = (
  fillings: IFilling[],
  sizesPossibles: Size[],
  pricePerSize: PricePerSize,
  customizableParts: CustomizablesParts[],
  totalPricing: number
) => {
  const fillingsString = useMemo(() => getFillingsString(fillings), [fillings]);

  const sizesPossiblesString = useMemo(() => {
    return getSizesPossiblesString(sizesPossibles);
  }, [sizesPossibles]);

  const pricePerSizeString = useMemo(() => {
    return getPricePerSizesString(pricePerSize);
  }, [pricePerSize]);

  const customizablePartsString = useMemo(() => {
    return getCustomizablePartsString(customizableParts);
  }, [customizableParts]);

  const totalPricingFormatted = useMemo(() => {
    return formatPriceNumber(totalPricing);
  }, [totalPricing]);

  const sizesPossiblesNormalized = useMemo(() => {
    return SIZES_POSSIBLES_ENUM.reduce(
      (acm, size) => {
        return sizesPossibles.includes(size)
          ? { ...acm, [size]: true }
          : { ...acm, [size]: false };
      },
      { pequeno: false, medio: false, grande: false, "extra-grande": false }
    );
  }, [sizesPossibles]);

  const customizablePartsNormalized = useMemo(() => {
    return CUSTOMIZABLE_PARTS_ENUM.reduce(
      (acm, part) => {
        return customizableParts.includes(part)
          ? { ...acm, [part]: true }
          : { ...acm, [part]: false };
      },
      { type: false, size: false, filing: false, frosting: false }
    );
  }, [customizableParts]);

  return {
    fillingsString,
    sizesPossiblesString,
    pricePerSizeString,
    customizablePartsString,
    totalPricingFormatted,
    sizesPossiblesNormalized,
    customizablePartsNormalized
  };
};
