"use client";
import { useEffect, useState, useTransition } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { CustomError } from "@/utils/customError";
import { BasePaginatedResponse } from "@/utils/requestUtils";

type getNewItensResponse<T, K extends string> = BasePaginatedResponse &
  Record<K, T[]>;

export const useNextItensPaginateds = <T, K extends string>(
  nextUrl: string | undefined,
  key: K,
  getNewItens: (url: string) => Promise<getNewItensResponse<T, K>>
) => {
  const [itens, setItens] = useState<T[]>([]);
  const [nextUrlState, setNextUrlState] = useState<string | undefined>(nextUrl);

  const [isPending, startTransition] = useTransition();

  const loadMoreDisabled = isPending || !nextUrlState;
  const { finalPageInspectorRef } = useInfiniteScroll(
    getNewCakes,
    "500px",
    loadMoreDisabled
  );

  useEffect(() => setNextUrlState(nextUrl), [nextUrl]);

  function getNewCakes() {
    if (isPending || !nextUrlState) {
      return;
    }

    startTransition(async () => {
      try {
        const data = await getNewItens(nextUrlState);

        const newItens: T[] = data[key];

        if (newItens.length === 0) {
          setNextUrlState(undefined);
          return;
        }

        setItens((prev) => [...prev, ...newItens]);
        setNextUrlState(data.nextUrl || undefined);
      } catch (error) {
        if (error instanceof CustomError && error.status === 404) {
          setNextUrlState(undefined);

          return;
        }
      }
    });
  }

  return { finalPageInspectorRef, itens, isPending };
};
