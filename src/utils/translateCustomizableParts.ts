import { CustomizablesParts } from "@/@types/Cake";

export const CUSTOMIZABLE_PARTS_PT_BR = [
  "tipo da massa",
  "tamanho",
  "recheios",
  "cobertura"
] as const;

export type CustomizablePartsPtBr = (typeof CUSTOMIZABLE_PARTS_PT_BR)[number];

export const translateCustomizableParts: Record<
  CustomizablesParts,
  CustomizablePartsPtBr
> = {
  filing: "recheios",
  type: "tipo da massa",
  frosting: "cobertura",
  size: "tamanho"
};
