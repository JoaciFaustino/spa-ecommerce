"use client";
import { ICategory } from "@/@types/Category";
import styles from "./LoadNextCategories.module.scss";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import { useNextItensPaginateds } from "@/hooks/useNextItensPaginateds";
import { getAllCategoriesCompleteUrl } from "@/services/categories";
import CategoryCard from "@/components/CakePartsCards/CategoryCard/CategoryCard";

type Props = {
  firstCategories: ICategory[];
  nextUrl: string | undefined;
};

function LoadNextCategories({ firstCategories, nextUrl }: Props) {
  const {
    itens: categories,
    updateItem: updateOneCategoryListItem,
    deleteItem: deleteOneCategoryListItem,
    finalPageInspectorRef,
    isPending
  } = useNextItensPaginateds<ICategory, "categories">(
    nextUrl,
    "categories",
    getAllCategoriesCompleteUrl,
    firstCategories
  );

  const updateCategoryItem = (id: string, newCategory: ICategory) =>
    updateOneCategoryListItem("_id", id, newCategory);

  const deleteCategoryItem = (id: string) =>
    deleteOneCategoryListItem("_id", id);

  return (
    <>
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          updateCategoryItem={updateCategoryItem}
          deleteCategoryItem={deleteCategoryItem}
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

export default LoadNextCategories;
