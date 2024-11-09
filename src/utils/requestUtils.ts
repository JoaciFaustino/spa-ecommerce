import axios from "axios";
import { CustomError } from "./customError";

export type BasePaginatedResponse = {
  maxPages: number;
  prevUrl: null | string;
  nextUrl: null | string;
};

export const getErrorRequest = (error: any, defaultMessage: string) => {
  if (!axios.isAxiosError(error)) {
    return new CustomError(defaultMessage, 500);
  }

  const message = error.response?.data?.message || defaultMessage;
  const status = error.response?.status || 500;

  return new CustomError(message, status);
};
