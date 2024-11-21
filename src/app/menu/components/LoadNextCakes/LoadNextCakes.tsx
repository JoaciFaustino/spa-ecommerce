"use client";
import { ICake } from "@/@types/Cake";
import CakeCard from "@/components/CakeCard/CakeCard";
import { getAllCakesCompleteUrl } from "@/services/cakes";
import { formatPriceNumber } from "@/utils/formatPrice";
import { useEffect, useState, useTransition } from "react";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import styles from "./LoadNextCakes.module.scss";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { CustomError } from "@/utils/customError";

type Props = {
  nextUrl: string | undefined;
};

function LoadNextCakes({ nextUrl }: Props) {
  const [cakes, setCakes] = useState<ICake[]>([]);
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
        const { cakes, nextUrl } = await getAllCakesCompleteUrl(nextUrlState);

        if (cakes.length === 0) {
          setNextUrlState(undefined);
          return;
        }

        setCakes((prev) => [...prev, ...cakes]);
        setNextUrlState(nextUrl || undefined);
      } catch (error) {
        if (error instanceof CustomError && error.status === 404) {
          setNextUrlState(undefined);

          return;
        }
      }
    });
  }

  return (
    <>
      {cakes.map((cake) => (
        <CakeCard
          key={cake._id}
          id={cake._id}
          name={cake.name}
          imageUrl={cake.imageUrl}
          price={formatPriceNumber(cake.totalPricing)}
          categories={cake.categories}
          customizableParts={cake.customizableParts}
        />
      ))}

      <span className={styles.divSpinnerLoader} ref={finalPageInspectorRef}>
        {isPending && (
          <SpinnerLoader color="var(--primary-color)" size={2} unitSize="rem" />
        )}
      </span>
    </>
  );
}

export default LoadNextCakes;
