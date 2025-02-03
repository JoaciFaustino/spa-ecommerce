import { CustomizablesParts } from "@/@types/Cake";
import { capitalize } from "@/utils/formatStrings";

const formatMessageCustomizableParts = (
  isCustomizableCakeType: boolean,
  isCustomizableFillings: boolean,
  isCustomizableFrosting: boolean,
  isCustomizableSize: boolean
): string | undefined => {
  const partsStrings = [
    !isCustomizableCakeType ? "o tipo da massa" : null,
    !isCustomizableFillings ? "os recheios" : null,
    !isCustomizableFrosting ? "a cobertura" : null,
    !isCustomizableSize ? "o tamanho" : null
  ].filter((partsString) => typeof partsString === "string");

  if (partsStrings.length === 0) {
    return;
  }

  if (partsStrings.length === 1) {
    return partsStrings[0] + " desse bolo não é personalizável";
  }

  return capitalize(
    partsStrings.slice(0, -1).join(", ") +
      " e " +
      partsStrings.slice(-1) +
      " desse bolo não são personalizáveis"
  );
};

export const useCustomizableParts = (
  customizableParts: CustomizablesParts[],
  typeOptions: string[],
  fillingsOptions: string[],
  frostingOptions: string[],
  sizesPossibles: string[]
) => {
  const isCustomizableCakeType: boolean =
    typeOptions.length > 0 && customizableParts.includes("type");
  const isCustomizableFillings: boolean =
    fillingsOptions.length > 0 && customizableParts.includes("filing");
  const isCustomizableFrosting: boolean =
    frostingOptions.length > 0 && customizableParts.includes("frosting");
  const isCustomizableSize: boolean =
    sizesPossibles.length > 0 && customizableParts.includes("size");

  const messageNoCustomizableParts = formatMessageCustomizableParts(
    isCustomizableCakeType,
    isCustomizableFillings,
    isCustomizableFrosting,
    isCustomizableSize
  );

  return {
    isCustomizableCakeType,
    isCustomizableFillings,
    isCustomizableFrosting,
    isCustomizableSize,
    messageNoCustomizableParts
  };
};
