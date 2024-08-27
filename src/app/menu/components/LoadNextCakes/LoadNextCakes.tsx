"use client";
import { ICake } from "@/@types/Cake";
import CakeCard from "@/components/CakeCard/CakeCard";
import { getAllCakesCompleteUrl } from "@/services/requests";
import { formatPriceNumber } from "@/utils/formatPrice";
import { useEffect, useRef, useState, useTransition } from "react";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import styles from "./LoadNextCakes.module.scss";

type Props = {
  nextUrl: string | undefined;
};

function LoadNextCakes({ nextUrl }: Props) {
  const finalPageInspectorRef = useRef<HTMLSpanElement | null>(null);
  const [cakes, setCakes] = useState<ICake[]>([]);
  const [nextUrlState, setNextUrlState] = useState<string | undefined>(nextUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMoreCakes, setCanLoadMoreCakes] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([finalPageInspector]) => {
        if (finalPageInspector.isIntersecting) {
          setCanLoadMoreCakes(true);
        }
      },
      { rootMargin: "300px" }
    );

    if (finalPageInspectorRef.current) {
      observer.observe(finalPageInspectorRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setNextUrlState(nextUrl);
    setIsLoading(false);
  }, [nextUrl]);

  useEffect(() => {
    if (canLoadMoreCakes) {
      setCanLoadMoreCakes(false);

      getNewCakes().finally(() => {
        setIsLoading(false);
      });
    }
  }, [canLoadMoreCakes]);

  const getNewCakes = async () => {
    if (isLoading || !nextUrlState) {
      return;
    }

    setIsLoading(true);
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

    startTransition(() => {
      setCakes((prev) => [...prev, ...newCakes]);
    });
    setNextUrlState(newNextUrl || undefined);
  };

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

      {(isPending || isLoading) && (
        <div className={styles.divSpinnerLoader}>
          <SpinnerLoader color="var(--primary-color)" size={2} unitSize="rem" />
        </div>
      )}

      <span
        ref={finalPageInspectorRef}
        style={{ gridColumn: "span 12" }}
      ></span>
    </>
  );
}

export default LoadNextCakes;
