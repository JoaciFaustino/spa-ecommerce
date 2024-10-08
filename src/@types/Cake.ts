import { IFilling } from "./Filling";
import { IFrosting } from "./Frosting";

export const CUSTOMIZABLE_PARTS_ENUM = [
  //tem que ajeitar isso para o nome certo, tem q ajeitar todos os documents no banco de dados
  "filing",
  "frosting",
  "size",
  "type"
] as const;

export type CustomizablesParts = (typeof CUSTOMIZABLE_PARTS_ENUM)[number];

export const SIZES_POSSIBLES_ENUM = [
  "pequeno",
  "medio",
  "grande",
  "extra-grande"
] as const;

export type Size = (typeof SIZES_POSSIBLES_ENUM)[number];

export type PricePerSize = {
  [key in Size]?: number;
};

export interface ICake {
  _id: string;

  name: string;
  type: string;
  categories: string[];
  frosting?: IFrosting;
  fillings: IFilling[];
  size: Size;
  sizesPossibles: Size[];
  pricePerSize: PricePerSize;
  totalPricing: number;
  customizableParts: CustomizablesParts[];
  imageUrl: string;
  boughts: number;
  createdAt?: Date;
  updatedAt?: Date;
}
