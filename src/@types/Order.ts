import { PersonalizedCake } from "./Cart";

export const TYPE_OF_RECEIPT_OPTIONS = ["delivery", "pick-up"] as const;

export type TypeOfReceipt = (typeof TYPE_OF_RECEIPT_OPTIONS)[number];

export const ORDER_STATE_OPTIONS = ["pending", "preparing", "done"] as const;

export type OrderState = (typeof ORDER_STATE_OPTIONS)[number];

export const ORDER_STATE_TRANSLATE = [
  "pendente",
  "preparando",
  "pronto"
] as const;

export type OrderStateTranlate = (typeof ORDER_STATE_TRANSLATE)[number];

export const orderStateTranlate: Record<OrderState, OrderStateTranlate> = {
  pending: "pendente",
  preparing: "preparando",
  done: "pronto"
};

export const orderStateRetranslate: Record<OrderStateTranlate, OrderState> = {
  pendente: "pending",
  preparando: "preparing",
  pronto: "done"
};

export interface DeliveryAddress {
  street: string;
  number: string;
  neighborhood: string;
  adicionalInfo?: string;
}

export interface ContactDetails {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface IOrder {
  _id: string;
  userId: string;

  cakes: PersonalizedCake[];
  typeOfReceipt: TypeOfReceipt;
  contactDetails: ContactDetails;
  observations?: string;
  deliveryAddress?: DeliveryAddress;

  dateAndTimeDelivery?: Date;
  totalPricing: number;
  state: OrderState;

  createdAt?: Date;
  updatedAt?: Date;
}
