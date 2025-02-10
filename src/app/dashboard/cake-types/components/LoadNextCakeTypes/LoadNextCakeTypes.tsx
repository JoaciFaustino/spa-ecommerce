"use client";
import styles from "./LoadNextCakeTypes.module.scss";
import { getAllCakeTypesCompleteUrl } from "@/services/cakeTypes";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import { useNextItensPaginateds } from "@/hooks/useNextItensPaginateds";
import { ICakeType } from "@/@types/CakeType";
import CakeTypeCard from "@/components/CakePartsCards/CakeTypeCard/CakeTypeCard";

type Props = {
  firstCakeTypes: ICakeType[];
  nextUrl: string | undefined;
};

function LoadNextCakeTypes({ firstCakeTypes, nextUrl }: Props) {
  const {
    itens: cakeTypes,
    updateItem: updateOneCakeTypeListItem,
    deleteItem: deleteOneCakeTypeListItem,
    finalPageInspectorRef,
    isPending
  } = useNextItensPaginateds<ICakeType, "cakeTypes">(
    nextUrl,
    "cakeTypes",
    getAllCakeTypesCompleteUrl,
    firstCakeTypes
  );

  const updateCakeTypeItem = (id: string, newCakeType: ICakeType) =>
    updateOneCakeTypeListItem("_id", id, newCakeType);

  const deleteCakeTypeItem = (id: string) =>
    deleteOneCakeTypeListItem("_id", id);

  return (
    <>
      {cakeTypes.map((cakeType) => (
        <CakeTypeCard
          key={cakeType._id}
          cakeType={cakeType}
          updateCakeTypeItem={updateCakeTypeItem}
          deleteCakeTypeItem={deleteCakeTypeItem}
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

export default LoadNextCakeTypes;
