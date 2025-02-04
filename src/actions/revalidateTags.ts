"use server";
import { CachedRequestsRevalidateTags } from "@/@types/CachedRequestsRevalidateTags";
import { revalidateTag as revalidateTagNext } from "next/cache";

export const revalidateTag = async (tag: CachedRequestsRevalidateTags) => {
  return revalidateTagNext(tag);
};
