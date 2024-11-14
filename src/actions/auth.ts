"use server";
import "server-only";
import { AuthResponse } from "@/@types/Auth";
import { api } from "@/services/api";
import { createSession, deleteSession, getSession } from "@/lib/session";
import { User } from "@/@types/User";
import axios from "axios";

export type LoginAction = typeof login;
export type SignUpAction = typeof signUp;

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const { data } = await api.post<{ user: User; token: string }>(
      "/auth/login",
      { email: email.trim(), password: password.trim() }
    );

    if (!data.token || !data.user) {
      return { error: "Ocorreu um erro, por favor tente novamente" };
    }

    createSession(data.token);

    return { user: data.user, token: data.token };
  } catch (error: any) {
    const defaultError = {
      error: "Ocorreu um erro, por favor tente novamente"
    };

    if (!axios.isAxiosError(error)) {
      return defaultError;
    }

    const status = error.response?.status;

    switch (status) {
      case 401:
        return { error: "Email ou senha incorretos" };

      case 400:
        return { error: "Por favor, preencha todos os campos" };

      case 500:
        return {
          error:
            "Ocorreu um erro no servidor, por favor tente novamente mais tarde"
        };

      default:
        return defaultError;
    }
  }
}

export async function signUp(
  name: string,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<AuthResponse> {
  try {
    const { data } = await api.post<{ user: User; token: string }>(
      "/auth/signup",
      {
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim()
      }
    );

    if (!data.token || !data.user) {
      return { error: "Ocorreu um erro, por favor tente novamente" };
    }

    createSession(data.token);

    return {
      user: data.user,
      token: data.token
    };
  } catch (error: any) {
    const defaultError = {
      error: "Ocorreu um erro, por favor tente novamente"
    };

    if (!axios.isAxiosError(error)) {
      return defaultError;
    }

    const status = error.response?.status;
    const data = error.response?.data;

    switch (status) {
      case 400:
        return { error: "Por favor, preencha todos os campos corretamente" };

      case 409:
        if (data?.message.includes(" name")) {
          return { error: "Esse nome já existe! tente outro por favor" };
        }
        if (data?.message.includes(" username")) {
          return {
            error: "Esse nome de usuário já existe! tente outro por favor"
          };
        }

        return { error: "Esse email já existe! tente outro por favor" };

      case 500:
        return {
          error:
            "Ocorreu um erro no servidor, por favor tente novamente mais tarde"
        };

      default:
        return defaultError;
    }
  }
}

export async function auth(): Promise<{ userId?: string; role?: string }> {
  try {
    const session = await getSession();

    if (!session) return {};

    const response = await fetch(`${api.getUri()}/auth/`, {
      method: "GET",
      headers: { Authorization: session },
      cache: "no-store"
    });

    if (!response.ok) {
      return {};
    }

    const data = await response.json();

    const { userId, role } = data;

    if (!userId || !role) return {};

    return { userId, role };
  } catch (error) {
    return {};
  }
}

export async function logout() {
  await deleteSession();
}
