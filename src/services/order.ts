import {
  ContactDetails,
  DeliveryAddress,
  IOrder,
  OrderState,
  TypeOfReceipt
} from "@/@types/Order";
import { getSession } from "@/lib/session";
import { api } from "./api";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import {
  OrdersFiltersApiOption,
  OrdersSortByApiOption
} from "@/@types/OrdersFilters";
import axios from "axios";

const ISOStringToDate = (date: string | undefined | Date): Date | undefined =>
  date ? new Date(date) : undefined;

type PaginatedResponse = BasePaginatedResponse & { orders: IOrder[] };

export const getAllOrders = async (queryParams: {
  limit: number;
  page: number;
  sortBy: OrdersSortByApiOption;
  filters: OrdersFiltersApiOption[];
  search?: string;
}): Promise<PaginatedResponse> => {
  const session = await getSession();

  try {
    const { data } = await api.get<PaginatedResponse>(`/orders/`, {
      params: queryParams,
      paramsSerializer: { indexes: false },
      headers: { Authorization: session }
    });

    return data;
  } catch (error) {
    throw getErrorRequest(error, "Failed to get orders");
  }
};

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

export const getAllOrdersFullUrl = async (
  url: string
): Promise<PaginatedResponse> => {
  try {
    const session = await getSession();

    const { data } = await axios.get<PaginatedResponse>(url, {
      headers: { Authorization: session }
    });

    return data;
  } catch (error) {
    throw getErrorRequest(error, "Failed to get orders");
  }
};

export const updateOrder = async (
  id: string,
  state?: OrderState,
  dateAndTimeDelivery?: Date
): Promise<IOrder> => {
  try {
    const session = await getSession();

    const { data } = await api.patch<{ message: string; order: IOrder }>(
      `/orders/update/${id}`,
      { state, dateAndTimeDelivery: dateAndTimeDelivery?.toISOString() },
      { headers: { Authorization: session } }
    );

    return data.order;
  } catch (error) {
    throw getErrorRequest(error, "Failed to update order");
  }
};

export const deleteOrder = async (id: string): Promise<void> => {
  try {
    const session = await getSession();

    await api.delete(`/orders/delete/${id}`, {
      headers: { Authorization: session }
    });
  } catch (error) {
    throw getErrorRequest(error, "Failed to delete order");
  }
};
