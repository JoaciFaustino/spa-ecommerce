import ScrollTop from "@/components/ScrollTop/ScrollTop";
import styles from "@/styles/pages/Dashboard.module.scss";
import { Suspense } from "react";
import SearchAndCreateCategoriesBar from "./components/SearchAndCreateCategoriesBar/SearchAndCreateCategoriesBar";
import CakePartsCardSkeleton from "@/components/CakePartsCards/loading";
import LoadInitialCategories from "./components/LoadInitialCategories/LoadInitialCategories";

type Props = {
  searchParams: { search?: string };
};

async function DashboardCategories({ searchParams }: Props) {
  const key = JSON.stringify(searchParams);

  return (
    <section className={styles.parentPage}>
      <SearchAndCreateCategoriesBar />

      <div className={styles.cakePartsList}>
        <Suspense key={key} fallback={<ListSkeleton />}>
          <LoadInitialCategories searchParams={searchParams} />
        </Suspense>
      </div>

      <ScrollTop />
    </section>
  );
}

const ListSkeleton = () => (
  <>
    {Array.from({ length: 12 }).map((_, index) => (
      <CakePartsCardSkeleton key={index} />
    ))}
  </>
);

export default DashboardCategories;
