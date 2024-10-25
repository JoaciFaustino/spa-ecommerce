"use client";
import { ICake } from "@/@types/Cake";
import CakeCard from "@/components/CakeCard/CakeCard";
import { getAllCakesCompleteUrl } from "@/services/requests";
import { formatPriceNumber } from "@/utils/formatPrice";
import { useEffect, useState, useTransition } from "react";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import styles from "./LoadNextCakes.module.scss";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

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
      const response = await getAllCakesCompleteUrl(nextUrlState);

      const { sucess } = response;

      if (
        (!sucess && response.status === 404) ||
        (sucess && response.cakes.length === 0)
      ) {
        setNextUrlState(undefined);
        return;
      }

      if (!sucess) {
        return;
      }

      const { cakes: newCakes, nextUrl: newNextUrl } = response;

      setCakes((prev) => [...prev, ...newCakes]);
      setNextUrlState(newNextUrl || undefined);
    });
  }

  return (
    <>
      {cakes.map((cake) => (
        <CakeCard
          key={cake._id}
          cakeId={cake._id}
          nameCake={cake.name}
          typeCake={cake.type}
          imageCake={cake.imageUrl}
          priceCake={formatPriceNumber(cake.totalPricing)}
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
