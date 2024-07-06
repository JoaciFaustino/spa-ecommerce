import axios from "axios";

const host: string =
  process.env.API_HOST +
  (process.env.API_PORT ? `:${process.env.API_PORT}` : "");

export const api = axios.create({
  baseURL: `${process.env.API_PROTOCOL}://${host}/api`
});
