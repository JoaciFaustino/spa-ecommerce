"use server";
import "server-only";
import { cookies } from "next/headers";

const EXPIRES_AT = new Date(Date.now() + 24 * 60 * 60 * 1000);

export async function createSession(token: string) {
  cookies().delete("session");
  cookies().set("session", token, {
    httpOnly: true,
    secure: true,
    expires: EXPIRES_AT,
    sameSite: "lax",
    path: "/"
  });
}

export async function getSession() {
  return cookies().get("session")?.value;
}

export async function deleteSession() {
  cookies().delete("session");
}
