"use server";
import { CachedRequestsRevalidateTag } from "@/@types/CachedRequestsRevalidateTags";
import { revalidateTag as revalidateTagNext } from "next/cache";

export const revalidateTag = async (tag: CachedRequestsRevalidateTag) => {
  return revalidateTagNext(tag);
};
