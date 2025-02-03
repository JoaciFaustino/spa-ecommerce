"use client";
import { ICake } from "@/@types/Cake";
import { getAllCakesCompleteUrl } from "@/services/cakes";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import styles from "./LoadNextCakes.module.scss";
import { useNextItensPaginateds } from "@/hooks/useNextItensPaginateds";
import AdminCakeCard from "@/components/AdminCakeCard/AdminCakeCard";

type Props = {
  firstCakes: ICake[];
  nextUrl: string | undefined;
};

function LoadNextCakes({ firstCakes, nextUrl }: Props) {
  const {
    itens: cakes,
    updateItem: updateCake,
    deleteItem: deleteCake,
    finalPageInspectorRef,
    isPending
  } = useNextItensPaginateds<ICake, "cakes">(
    nextUrl,
    "cakes",
    getAllCakesCompleteUrl,
    firstCakes
  );

  // useEffect(() => changeCakes(firstCakes), []);

  const onUpdateCake = (id: string, newCake: ICake) =>
    updateCake("_id", id, newCake);

  const onDelete = (id: string) => deleteCake("_id", id);

  return (
    <>
      {cakes.map((cake) => (
        <AdminCakeCard
          key={cake._id}
          onUpdateCake={(newCake) => onUpdateCake(cake._id, newCake)}
          onDeleteCake={() => onDelete(cake._id)}
          cake={cake}
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
