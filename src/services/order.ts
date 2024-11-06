import {
  ContactDetails,
  DeliveryAddress,
  IOrder,
  TypeOfReceipt
} from "@/@types/Order";
import { getSession } from "@/lib/session";
import { api } from "./api";
import { getErrorRequest, PaginatedRequest } from "@/utils/requestUtils";

type PaginatedResponse = PaginatedRequest & { orders: IOrder[] };

export const createOrder = async (
  cartId: string,
  typeOfReceipt: TypeOfReceipt,
  contactDetails: ContactDetails,
  deliveryAddress?: DeliveryAddress,
  observations?: string
): Promise<IOrder> => {
  try {
    const session = await getSession();

    const { data } = await api.post<{ order: IOrder }>(
      "/orders/create",
      {
        cartId,
        typeOfReceipt,
        contactDetails,
        observations,
        deliveryAddress
      },
      { headers: { Authorization: session } }
    );

    return data.order;
  } catch (error) {
    throw getErrorRequest(error, "Failed to create order");
  }
};

export const getAllUserOrders = async (
  limit: number,
  page: number,
  userId: string
): Promise<PaginatedResponse> => {
  try {
    const session = await getSession();

    const { data } = await api.get<PaginatedResponse>(`/orders/${userId}`, {
      params: { limit, page },
      paramsSerializer: { indexes: false },
      headers: { Authorization: session }
    });

    return data;
  } catch (error) {
    throw getErrorRequest(error, "Failed to get orders");
  }
};

export const getAllUserOrdersFullUrl = async (
  url: string
): Promise<PaginatedResponse> => {
  try {
    const session = await getSession();

    const { data } = await api.get<PaginatedResponse>(url, {
      headers: { Authorization: session }
    });

    return data;
  } catch (error) {
    throw getErrorRequest(error, "Failed to get orders");
  }
};
