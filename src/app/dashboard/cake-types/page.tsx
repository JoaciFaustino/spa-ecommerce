import styles from "@/styles/pages/Dashboard.module.scss";
import SearchAndCreateCakeTypesBar from "./components/SearchAndCreateCakeTypesBar/SearchAndCreateCakeTypesBar";
import { Suspense } from "react";
import ScrollTop from "@/components/ScrollTop/ScrollTop";
import LoadInitialCakeTypes from "./components/LoadInitialCakeTypes/LoadInitialCakeTypes";
import CakePartsCardSkeleton from "@/components/CakePartsCards/loading";

type Props = {
  searchParams: { search?: string };
};

async function DashboardCakeTypes({ searchParams }: Props) {
  const key = JSON.stringify(searchParams);

  return (
    <section className={styles.parentPage}>
      <SearchAndCreateCakeTypesBar />

      <div className={styles.cakePartsList}>
        <Suspense key={key} fallback={<ListSkeleton />}>
          <LoadInitialCakeTypes searchParams={searchParams} />
        </Suspense>
      </div>

      <ScrollTop />
    </section>
  );
}

function ListSkeleton() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <CakePartsCardSkeleton key={index} />
      ))}
    </>
  );
}

export default DashboardCakeTypes;
