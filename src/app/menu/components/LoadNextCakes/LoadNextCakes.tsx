"use client";
import { ICake } from "@/@types/Cake";
import CakeCard from "@/components/CakeCard/CakeCard";
import { getAllCakesCompleteUrl } from "@/services/requests";
import { formatPriceNumber } from "@/utils/formatPrice";
import { useEffect, useRef, useState, useTransition } from "react";
import CakeCardSkeleton from "@/components/CakeCard/loading";

type Props = {
  nextUrl: string | undefined;
};

function LoadNextCakes({ nextUrl }: Props) {
  const finalPageInspectorRef = useRef<HTMLSpanElement | null>(null);
  const [cakes, setCakes] = useState<ICake[]>([]);
  const [nextUrlState, setNextUrlState] = useState<string | undefined>(nextUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMoreCakes, setCanLoadMoreCakes] = useState(false);
  const [_, startTransition] = useTransition();

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
          nameCake={cake.name}
          typeCake={cake.type}
          imageCake={cake.imageUrl}
          priceCake={formatPriceNumber(cake.totalPricing)}
        />
      ))}

      {isLoading &&
        Array.from({ length: 12 }).map((_, index) => (
          <CakeCardSkeleton key={index} />
        ))}

      <span
        ref={finalPageInspectorRef}
        style={{ gridColumn: "span 12" }}
      ></span>
    </>
  );
}

export default LoadNextCakes;
