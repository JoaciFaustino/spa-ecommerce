"use client";
import styles from "./LoadNextFrostings.module.scss";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import { useNextItensPaginateds } from "@/hooks/useNextItensPaginateds";
import { IFrosting } from "@/@types/Frosting";
import { getAllFrostingsCompleteUrl } from "@/services/frostings";
import FrostingCard from "@/components/CakePartsCards/FrostingCard/FrostingCard";

type Props = {
  firstFrostings: IFrosting[];
  nextUrl: string | undefined;
};

function LoadNextFrostings({ firstFrostings, nextUrl }: Props) {
  const {
    itens: frostings,
    updateItem: updateOneFrostingListItem,
    deleteItem: deleteOneFrostingListItem,
    finalPageInspectorRef,
    isPending
  } = useNextItensPaginateds<IFrosting, "frostings">(
    nextUrl,
    "frostings",
    getAllFrostingsCompleteUrl,
    firstFrostings
  );

  const updateFrostingItem = (id: string, newFrosting: IFrosting) =>
    updateOneFrostingListItem("_id", id, newFrosting);

  const deleteFrostingItem = (id: string) =>
    deleteOneFrostingListItem("_id", id);

  return (
    <>
      {frostings.map((frosting) => (
        <FrostingCard
          key={frosting._id}
          frosting={frosting}
          updateFrostingItem={updateFrostingItem}
          deleteFrostingItem={deleteFrostingItem}
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

export default LoadNextFrostings;
