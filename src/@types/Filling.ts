import { Size } from "./Cake";

export const MAX_LAYER_OF_FILLINGS: Record<Size, number> = {
  pequeno: 1,
  medio: 2,
  grande: 3,
  "extra-grande": 3
};

export interface IFilling {
  _id: string;
  name: string;
  price: number;
}
