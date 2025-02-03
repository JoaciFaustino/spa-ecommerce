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
  getNewItens: (url: string) => Promise<getNewItensResponse<T, K>>,
  firstItens: T[] = []
) => {
  const [itens, setItens] = useState<T[]>(firstItens);
  const [nextUrlState, setNextUrlState] = useState<string | undefined>(nextUrl);

  const [isPending, startTransition] = useTransition();

  const loadMoreDisabled = isPending || !nextUrlState;
  const { finalPageInspectorRef } = useInfiniteScroll(
    getNewCakes,
    "500px",
    loadMoreDisabled
  );

  useEffect(() => setNextUrlState(nextUrl), [nextUrl]);

  const changeItens = (newItens: T[]) => {
    startTransition(() => {
      setItens([...newItens]);
    });
  };

  const addItem = (newItem: T) => {
    startTransition(() => {
      setItens((prev) => [...prev, newItem]);
    });
  };

  const updateItem = <KeyId extends keyof T>(
    keyId: KeyId,
    id: string,
    updatedItem: T
  ) => {
    startTransition(() => {
      setItens((prev) =>
        prev.map((item) => (item[keyId] === id ? updatedItem : item))
      );
    });
  };

  const deleteItem = (keyId: keyof T, id: string) => {
    startTransition(() => {
      setItens((prev) => prev.filter((item) => item[keyId] !== id));
    });
  };

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

  return {
    finalPageInspectorRef,
    itens,
    isPending,
    changeItens,
    deleteItem,
    updateItem,
    addItem
  };
};
