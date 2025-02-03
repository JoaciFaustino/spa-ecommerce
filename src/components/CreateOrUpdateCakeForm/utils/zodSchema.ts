import {
  CustomizablesParts,
  PricePerSize,
  Size,
  SIZES_POSSIBLES_ENUM
} from "@/@types/Cake";
import { MAX_LAYER_OF_FILLINGS } from "@/@types/Filling";
import { z } from "zod";

const invalid = "Esse campo é invalido!";
const required = "Esse campo é obrigatório!";
const price = "Esse preço é muito barato para um bolo!";
const messagesError = { invalid_type_error: invalid, required_error: required };
const minPrice = 5;

type AlternativeSchemaType = {
  fillings: string[];
  sizesPossibles: Record<Size, boolean>;
  customizableParts: Record<CustomizablesParts, boolean>;
  pricePerSize: PricePerSize;
} & { [key in string]: any };

const getSizesExceedingFillingLimit = ({
  sizesPossibles,
  fillings,
  customizableParts
}: AlternativeSchemaType): Size[] => {
  if (customizableParts.filing && customizableParts.size) {
    return [];
  }

  const sizesPossiblesArray: Size[] = SIZES_POSSIBLES_ENUM.filter(
    (size) => sizesPossibles[size]
  );

  return sizesPossiblesArray.filter(
    (size) => fillings.length > MAX_LAYER_OF_FILLINGS[size]
  );
};

const sizesWithPriceInvalid = ({
  sizesPossibles,
  pricePerSize
}: AlternativeSchemaType): Size[] => {
  const sizesPossiblesArray: Size[] = SIZES_POSSIBLES_ENUM.filter(
    (size) => sizesPossibles[size]
  );

  const sizesWithPriceInvalid = sizesPossiblesArray.filter(
    (size) => pricePerSize[size] === undefined || pricePerSize[size] < minPrice
  );

  return sizesWithPriceInvalid;
};

export const schemaCakeForm = z
  .object({
    name: z.string(messagesError).min(1, required).trim(),
    type: z.string(messagesError).min(1, required).trim(),
    categories: z.array(z.string(messagesError).min(1, required).trim(), {
      message: invalid
    }),
    frosting: z
      .string(messagesError)
      .min(1, required)
      .trim()
      .nullable()
      .optional(),
    fillings: z.array(z.string(messagesError).min(1, required).trim(), {
      message: invalid
    }),
    size: z.enum(SIZES_POSSIBLES_ENUM, { message: invalid }),
    sizesPossibles: z.object({
      pequeno: z.boolean().optional().default(false),
      medio: z.boolean().optional().default(false),
      grande: z.boolean().optional().default(false),
      "extra-grande": z.boolean().optional().default(false)
    }),
    pricePerSize: z.object({
      pequeno: z.number(messagesError).min(0, price).optional(),
      medio: z.number(messagesError).min(0, price).optional(),
      grande: z.number(messagesError).min(0, price).optional(),
      "extra-grande": z.number(messagesError).min(0, price).optional()
    }),
    customizableParts: z.object({
      type: z.boolean().optional().default(false),
      size: z.boolean().optional().default(false),
      filing: z.boolean().optional().default(false),
      frosting: z.boolean().optional().default(false)
    })
  })
  .refine(
    (values) => sizesWithPriceInvalid(values).length === 0,
    (values) => ({
      message: "Esse preço é muito barato para um bolo!",
      path: [`pricePerSize.${sizesWithPriceInvalid(values)[0]}`]
    })
  )
  .refine(({ size, sizesPossibles }) => sizesPossibles[size], {
    message:
      "Esse tamanho não é possível, modifique os tamanhos possivéis para usá-lo!",
    path: ["size"]
  })
  .refine(
    ({ sizesPossibles }) => {
      const allSizesIsFalse = Object.values(sizesPossibles).every(
        (size) => size === false
      );

      return !allSizesIsFalse;
    },
    {
      message: "Escolha pelo menos um tamanho!",
      path: ["sizesPossibles.pequeno"]
    }
  )
  .refine(
    (values) => getSizesExceedingFillingLimit(values).length === 0,
    ({ size, ...values }) => {
      const sizesExceedingFillingLimit = getSizesExceedingFillingLimit(values);
      const maxLayers =
        MAX_LAYER_OF_FILLINGS[sizesExceedingFillingLimit[0] || size];

      return {
        message:
          `O tamanho "${sizesExceedingFillingLimit[0]}" ` +
          `pode ter no máximo ${maxLayers} camadas de recheio como padrão ` +
          `quando os recheios não são personalizáveis pelo cliente!`,
        path: ["fillings"]
      };
    }
  );

export type SchemaCakeForm = z.infer<typeof schemaCakeForm>;
