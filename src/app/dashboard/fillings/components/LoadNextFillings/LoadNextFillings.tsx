"use client";
import { IFilling } from "@/@types/Filling";
import styles from "./LoadNextFillings.module.scss";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import { useNextItensPaginateds } from "@/hooks/useNextItensPaginateds";
import { getAllFillingsCompleteUrl } from "@/services/fillings";
import FillingCard from "@/components/CakePartsCards/FillingCard/FillingCard";

type Props = {
  firstFillings: IFilling[];
  nextUrl: string | undefined;
};

function LoadNextFillings({ firstFillings, nextUrl }: Props) {
  const {
    itens: fillings,
    updateItem: updateOneFillingListItem,
    deleteItem: deleteOneFillingListItem,
    finalPageInspectorRef,
    isPending
  } = useNextItensPaginateds<IFilling, "fillings">(
    nextUrl,
    "fillings",
    getAllFillingsCompleteUrl,
    firstFillings
  );

  const updateFillingItem = (id: string, newFilling: IFilling) =>
    updateOneFillingListItem("_id", id, newFilling);

  const deleteFillingItem = (id: string) => deleteOneFillingListItem("_id", id);

  return (
    <>
      {fillings.map((filling) => (
        <FillingCard
          key={filling._id}
          filling={filling}
          updateFillingItem={updateFillingItem}
          deleteFillingItem={deleteFillingItem}
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

export default LoadNextFillings;
