import { Size } from "./Cake";

type MaxLayerOfFillings = {
  [size in Size]: number;
};

export const MAX_LAYER_OF_FILLINGS: MaxLayerOfFillings = {
  pequeno: 1,
  medio: 2,
  grande: 3,
  "extra-grande": 3
};

export interface IFilling {
  _id?: string;
  name: string;
  price: number;
}
