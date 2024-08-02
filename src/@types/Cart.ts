import { Size } from "./Cake";

export interface PersonalizedCake {
  _id: string;
  cakeId: string;
  name: string;
  type: string;
  frosting?: string;
  fillings: string[];
  size: Size;
  totalPricing: number;
  quantity: number;
  imageUrl: string;
}

export interface Cart {
  _id?: string;
  cakes: PersonalizedCake[];
}
