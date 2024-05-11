"use server";
import "server-only";
import { api } from "@/services/api";
import { auth } from "./auth";
import { getSession } from "@/lib/session";
import { User } from "@/@types/User";

export async function getUserLogged(): Promise<User | undefined> {
  try {
    const [{ userId }, session] = await Promise.all([auth(), getSession()]); //metodo para fazer as requisições ao mesmo tempo ao invés de esperar uma acontecer e depois a outra

    if (!session) return;

    const { data } = await api.get<{ user: User }>(`/user/findById/${userId}`, {
      headers: { Authorization: session }
    });

    return data.user;
  } catch (error) {
    return;
  }
}
