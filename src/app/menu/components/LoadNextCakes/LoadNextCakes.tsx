"use client";
import { ICake } from "@/@types/Cake";
import CakeCard from "@/components/CakeCard/CakeCard";
import { getAllCakesCompleteUrl } from "@/services/cakes";
import { formatPriceNumber } from "@/utils/formatPrice";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import styles from "./LoadNextCakes.module.scss";
import { useNextItensPaginateds } from "@/hooks/useNextItensPaginateds";

type Props = {
  nextUrl: string | undefined;
};

function LoadNextCakes({ nextUrl }: Props) {
  const {
    itens: cakes,
    finalPageInspectorRef,
    isPending
  } = useNextItensPaginateds<ICake, "cakes">(
    nextUrl,
    "cakes",
    getAllCakesCompleteUrl
  );

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
