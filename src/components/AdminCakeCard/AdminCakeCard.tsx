"use client";
import Image from "next/image";
import styles from "./AdminCakeCard.module.scss";
import { ICake } from "@/@types/Cake";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useCakePartsTexts } from "./useCakePartsTexts";
import Modal from "../Modal/Modal";
import CreateOrUpdateCakeForm from "@/components/CreateOrUpdateCakeForm/CreateOrUpdateCakeForm";
import { useUpdateAndDeleteCake } from "./useUpdateAndDeleteCake";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

type Props = {
  cake: ICake;
  onUpdateCake?: (newCake: ICake) => void;
  onDeleteCake?: (id: string) => void;
};

function AdminCakeCard({ cake, onUpdateCake, onDeleteCake }: Props) {
  const {
    modalIsActived,
    updateCakeRequest,
    requestIsPending,
    deleteCakeRequest,
    closeModal,
    openModal
  } = useUpdateAndDeleteCake(cake, onUpdateCake, onDeleteCake);

  const [moreDetailsActived, setMoreDetailsActived] = useState(false);
  const {
    fillingsString,
    sizesPossiblesString,
    pricePerSizeString,
    customizablePartsString,
    totalPricingFormatted,
    sizesPossiblesNormalized,
    customizablePartsNormalized
  } = useCakePartsTexts(
    cake.fillings,
    cake.sizesPossibles,
    cake.pricePerSize,
    cake.customizableParts,
    cake.totalPricing
  );

  return (
    <>
      {modalIsActived && (
        <Modal onClose={closeModal}>
          <CreateOrUpdateCakeForm
            onUpdateOrCreateCake={updateCakeRequest}
            defaultValues={{
              id: cake._id,
              name: cake.name,
              type: cake.type,
              categories: cake.categories,
              size: cake.size,
              pricePerSize: cake.pricePerSize,
              imageUrl: cake.imageUrl,
              frosting: cake.frosting?.name || null,
              fillings: cake.fillings.map(({ name }) => name),
              sizesPossibles: sizesPossiblesNormalized,
              customizableParts: customizablePartsNormalized
            }}
          />
        </Modal>
      )}

      <div
        className={`${styles.card} ${requestIsPending ? styles.disabled : ""}`}
      >
        <Image
          src={cake.imageUrl}
          alt={cake.name + " image"}
          width={150}
          height={150}
          style={{
            borderRadius: "10px",
            objectFit: "cover",
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          }}
        />

        <div className={styles.textContent}>
          <h4>{cake.name}</h4>

          {cake.categories.length > 0 && (
            <div className={styles.divCategories}>
              {cake.categories.map((category) => (
                <p className={`text ${styles.category}`} key={category}>
                  {category}
                </p>
              ))}
            </div>
          )}

          <Text title="Tipo da massa padrão" value={cake.type} />
          <Text
            title="Cobertura padrão"
            value={cake.frosting?.name || "nenhuma"}
          />
          <Text title="Recheios padrão" value={fillingsString} />
          <Text title="Tamanho padrão" value={cake.size} />
          {moreDetailsActived && (
            <>
              <Text title="Tamanhos possivéis" value={sizesPossiblesString} />
              <Text
                title="Partes personalizavéis pelo cliente"
                value={customizablePartsString}
              />
              <Text title="Preço por tamanho" value={pricePerSizeString} />
              <Text title="Preço total padrão" value={totalPricingFormatted} />
            </>
          )}

          <p
            className={`${styles.moreDetails} text`}
            onClick={() => setMoreDetailsActived((prev) => !prev)}
          >
            <IoIosArrowDown
              className={moreDetailsActived ? styles.rotated : ""}
              style={{ color: "var(--color-text-paragraph)", fontSize: "1rem" }}
            />
            {moreDetailsActived ? "menos detalhes..." : "mais detalhes..."}
          </p>
        </div>

        <div className={styles.actionButtons}>
          <div className={styles.divIcons}>
            <BsPencilSquare
              onClick={openModal}
              style={{ color: "var(--secondary-color)", fontSize: "1.5rem" }}
            />

            {!requestIsPending && (
              <BsTrash
                onClick={deleteCakeRequest}
                style={{ color: "red", fontSize: "1.5rem" }}
              />
            )}

            {requestIsPending && (
              <SpinnerLoader
                color="var(--primary-color)"
                size={1.5}
                unitSize="rem"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

type TextProps = { title: string; value: string | number; isShow?: boolean };

const Text = ({ title, value, isShow = true }: TextProps) => {
  return isShow ? (
    <p className={`text ${styles.text}`}>
      {title}: <span>{value}</span>
    </p>
  ) : (
    <></>
  );
};

export default AdminCakeCard;
